import { createPortal } from "react-dom";
import { FC, useEffect, PropsWithChildren } from "react";

const modalRoot = document.querySelector('#burger-root-modal') as HTMLElement;

// own dispatch hook
import { useAppSelector } from "../../../app.hooks";

import bm from './BurgerModal.module.scss';

import { TrackModalProps } from '../../../types/types';

const BurgerModal: FC<PropsWithChildren<TrackModalProps>> = ({ children, openClose }) => {

  const lightModeSelector = useAppSelector(state => state.ser.lightMode);

  useEffect(() => {

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'scroll'
    };
 
  }, []);

  // close modal window by click on backdrob
  const clickBackdrob = (evt: React.MouseEvent<HTMLDivElement>) => {

    if (evt.target === evt.currentTarget){
    
      //close modal window
      openClose();
    } 
  };

return createPortal(
    <div className={bm.backdrop} onClick={clickBackdrob} style={{top: `${window.scrollY}px`}}>

        <div className={bm.container} style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)', border: '2px solid lightgray'} : {backgroundColor: 'white'}}>
            { children }
        </div>
        
    </div>, modalRoot
  )
};

export default BurgerModal;