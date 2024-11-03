import { createPortal } from "react-dom";
import { FC, useEffect, PropsWithChildren } from "react";

const modalRoot = document.querySelector('#root-modal') as HTMLElement;

// own dispatch hook
// import { useAppSelector } from "../../app.hooks";

import tm from './TracksModal.module.scss'

import { TracksModalProps } from '../../types/types';

const TracksModal: FC<PropsWithChildren<TracksModalProps>> = ({ children, openClose }) => {

  //   const lightModeSelector = useAppSelector(state => state.tm.lightMode);

  useEffect(() => {

    document.body.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = 'scroll'
    };
   // eslint-disable-next-line
  }, []);

  // close modal window by click on backdrob
  const clickBackdrob = (evt: React.MouseEvent<HTMLDivElement>) => {

    if (evt.target === evt.currentTarget){
    
      //close modal window
      openClose();
    } 
  };

return createPortal(
    <div className={tm.backdrop} onClick={clickBackdrob} style={{top: `${window.scrollY}px`}}>

        <div className={tm.container}>
            { children }
        </div>
        
    </div>, modalRoot
  )
};

export default TracksModal;