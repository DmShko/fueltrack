import { useState, useEffect } from 'react';

import { useSpring, animated, config, easings } from '@react-spring/web';

// own dispatch hook
import { useAppDispatch } from "../../app.hooks";

import lt from './LangToggle.module.scss';

import { changeLangMode } from '../../fuelTrackStore/trackSlice';

import { LangType } from '../../types/types';

const LangToggle = () => {

  const dispatch = useAppDispatch();

  const [langToggle, setLangToggle] = useState<LangType>(LangType.en);

  const [isMoved, setIsMoved] = useState(false);

  const minWidth = 30;   // Початковий та фінальний діаметр кола
  const maxWidth = 60;  // Максимальне розтягування в процесі руху
  const travelDistance = 60; // На яку відстань вправо перелітає кнопка

  useEffect(() => {
    dispatch(changeLangMode({ data: langToggle}));
  },[langToggle]);


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
      
      if(langToggle === LangType.en) {

        setLangToggle(LangType.ua);

      } else {
          setLangToggle(LangType.en);
      };
      
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
    <div className={lt.comtainer}>
       
        <animated.button
            style={{
              height: `${minWidth}px`, // Фіксована висота кола
              border: 'none',
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
              color: '#aab1f8',
              ...styles
            }}
            onClick={handleToggle} // Викликаємо захищену функцію
          >
            {isMoved ? 'Ua' : 'En'}
        </animated.button>
        
    </div>
  )
};

export default LangToggle