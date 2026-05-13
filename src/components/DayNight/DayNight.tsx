import { FC, useState, useEffect } from 'react'

// own dispatch hook
import { useAppDispatch } from "../../app.hooks";

import { useSpring, animated, config, easings } from '@react-spring/web';

import { changeLightMode } from '../../fuelTrackStore/trackSlice';

//images
import Moon from '../SvgComponents/DayNight/Night';
import Sun from '../SvgComponents/DayNight/Day';

import dn from './DayNight.module.scss';

// types
import { LightModeType } from '../../types/types';

const DayNight: FC = () => {

  const dispatch = useAppDispatch();

  const [ lightMode, setLightMode ] = useState<LightModeType>(LightModeType.light);

  const [isMoved, setIsMoved] = useState(false);

  const minWidth = 30;   // Початковий та фінальний діаметр кола
  const maxWidth = 60;  // Максимальне розтягування в процесі руху
  const travelDistance = 60; // На яку відстань вправо перелітає кнопка

  useEffect(() => {
    dispatch(changeLightMode({ data: lightMode }));
  }, [lightMode]);

  const [styles, api] = useSpring(() => ({
    from: { 
      width: `${minWidth}px`, 
      transform: 'translateX(0px)',
      borderRadius: '30px',
    }
  }));

  const handleToggle = () => {
    const nextState = !isMoved;
    setIsMoved(nextState);

    lightMode === 'light' ? setLightMode(LightModeType.dark): setLightMode(LightModeType.light);

    api.start({
      to: async (next) => {
        if (nextState) {
         
          await next({ 
            width: `${maxWidth}px`, 
            transform: 'translateX(0px)',
            config: { duration: 150, easing: easings.easeOutQuad }
          });
         
          await next({ 
            width: `${minWidth}px`, 
            transform: `translateX(${travelDistance}px)`,
            config: config.wobbly 
          });
        } else {
         
          await next({ 
            width: `${maxWidth}px`, 
            transform: `translateX(${travelDistance - (maxWidth - minWidth)}px)`,
            config: { duration: 150, easing: easings.easeOutQuad }
          });
         
          await next({ 
            width: `${minWidth}px`, 
            transform: 'translateX(0px)',
            config: config.wobbly 
          });
        }
      }
    });
  };
  
  return (
    <div className={dn.container} >

         <animated.button
            style={{
              height: `${minWidth}px`, // Фіксована висота кола
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              padding: 0,
              willChange: 'transform, width',
              background: 'radial-gradient(circle at 33% 33%, #ffffff 0%, #f0f0f0 45%, #d6d6d6 80%, #b8b8b8 100%)',
              ...styles
            }}
            onClick={handleToggle} // Викликаємо захищену функцію
          >
            {isMoved ? <Sun width='20px' height='20px'/> : <Moon width='20px' height='20px'/>}
        </animated.button>
        
    </div>
  )
}

export default DayNight;