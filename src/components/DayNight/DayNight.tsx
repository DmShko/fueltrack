import { FC, useState, useEffect } from 'react'

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../app.hooks";

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

  const lightModeSelector = useAppSelector(state => state.ser.lightMode);

  const [ lightMode, setLightMode ] = useState<LightModeType>(lightModeSelector);

  const [isMoved, setIsMoved] = useState(false);

  const minWidth = 25;   // Початковий та фінальний діаметр кола
  const maxWidth = 50;  // Максимальне розтягування в процесі руху
  const travelDistance = 50; // На яку відстань вправо перелітає кнопка

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
    <div className={dn.container} style={lightModeSelector === 'dark' ? {backgroundColor: 'lightgray'}: {backgroundColor: '#e7e7f0'}}>

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
              boxShadow: '1px 1px 4px 1px rgb(61, 61, 61)',
              background: 'radial-gradient(circle at 33% 33%, #ffffff 0%, #f0f0f0 45%, #8a90da 80%, #b8b8b8 100%)',
              ...styles
            }}
            onClick={handleToggle} // Викликаємо захищену функцію
          >
            {lightModeSelector ===  LightModeType.dark ? <Sun width='18px' height='18px'/> : <Moon width='18px' height='18px'/>}
        </animated.button>
        
    </div>
  )
}

export default DayNight;