import { FC, useState, useEffect, useRef} from 'react';

import {useLocation } from "react-router-dom";

import { useTransition, animated } from '@react-spring/web';

// own dispatch hook
// import { useAppSelector } from "../../app.hooks";

import { parameterStar } from '../../types/springAnimaTypes';

import Star from './Star/Star';

//styles
import pec from './PageContainer.module.scss';

const PageContainer: FC<any> = ({ children }) => {
      
  const [parameters, setParameters] = useState<parameterStar[]>([]);
  
  const logoRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  useEffect(() => {

        const aroundStaraElement =logoRef.current?.children[0] as HTMLElement;

        // reset 
        function handleWindowResize() {
          setParameters([]);
        }

        window.addEventListener('resize', handleWindowResize);

        // generate random parameter of bubble
        const random = () => {

          if (logoRef.current !== null) {

            const pointX = randomGenerator(window.innerWidth -50, 20);
            const pointY = randomGenerator(window.innerHeight - 150, 150);

            // all points drawing around logIn/Up form only
            const checkPoint = Math.pow((pointX - (logoRef.current.offsetWidth / 2 - 10)), 2) + 
            Math.pow((pointY - (logoRef.current.offsetHeight / 2 + 90)), 2)

            if(aroundStaraElement && location.pathname === '/signIn' || location.pathname === '/signUp') {
              
              // radius of '.formWrapper'
              if(checkPoint >  Math.pow((aroundStaraElement.children[0] as HTMLElement).offsetWidth / 2, 2)) {

                // 'size' for mobile and tab and desk
                return {
                  size: randomGenerator(20, 5),
                  x: pointX,
                  y: pointY,
                };

              }
            }
          }
      };
      
      // random generation interval
      const timer = setInterval(() => {

      const newItem = random();

      // 'random' can be undefined, because it's need to verify
      if(newItem !== undefined) {

          parameters.length >= 20 
                  ? setParameters(parameters.filter(element => element.size !== randomGenerator(20, 3)))
                  : setParameters([...parameters, newItem]);
        };
      
      }, randomGenerator(30, 5));

      return () => {
        clearInterval(timer);
        window.removeEventListener('resize', handleWindowResize);
      };
    
  }, [parameters]);

  const randomGenerator = (max: number, min: number) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  const transitions = useTransition(parameters, {
    from: { opacity: '0',},
    enter: { opacity: '1',},
    leave: { opacity: '0',},
   
    config: {
      duration: randomGenerator(4000, 2000),
      friction: randomGenerator(300, 5) * 10,
    },
  });


  return (
   
    <section className={pec.container} ref={logoRef}>

      {children}

      {(location.pathname === '/signIn' || location.pathname === '/signUp') && transitions((style, item) => (
                  <animated.div style={style} className={pec.anima}>
                      <Star
                            styleProps={{
                            position: 'absolute',
                            width: `${item.size}px`,
                            height: `${item.size}px`,
                            left: `${item.x}px`,
                            top: `${item.y}px`,
                            borderRadius: '50px',
                            backgroundColor: 'white',
                          }}
                      />
                  </animated.div>
                ))}

    </section>
    
  )
}

export default PageContainer;