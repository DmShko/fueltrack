import { createPortal } from "react-dom";
import { FC, useEffect, PropsWithChildren } from "react";

const modalRoot = document.querySelector('#root-modal') as HTMLElement;

// own dispatch hook
import { useAppSelector } from "../../app.hooks";

import trm from './TrackModal.module.scss'

import { TrackModalProps } from '../../types/types';

const TrackModal: FC<PropsWithChildren<TrackModalProps>> = ({ children, openClose }) => {

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
    <div className={trm.backdrop} onClick={clickBackdrob} style={{top: `${window.scrollY}px`}}>

        <div className={trm.container} style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)', border: '2px solid lightgray'} : {backgroundColor: 'white'}}>
            { children }
        </div>
        
    </div>, modalRoot
  )
};

export default TrackModal;