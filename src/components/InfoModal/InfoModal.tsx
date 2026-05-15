import { FC, PropsWithChildren, } from "react";

// types import
import { InfoModalPropsTypes } from '../../types/types.ts';

// own dispatch hook
import { useAppSelector } from "../../app.hooks"; 

// slices


//styles
import info from './InfoModal.module.scss';

const InfoModal: FC<PropsWithChildren<InfoModalPropsTypes>> = ({openClose, clearIs, clearMessages, props}) => {

const lightModeSelector = useAppSelector(state => state.ser.lightMode);

const buttonClick = () => {
    clearMessages();
    openClose();
    clearIs();
};

return (

    <div className={info.container} style={lightModeSelector === 'dark' ?  {backgroundColor: 'lightgray'} : {backgroundColor: 'white'}}>
        
        <p>{`${props.messages}`}</p>

        <button name="ok" onClick={buttonClick}>Ok</button>

    </div>

)};

export default InfoModal;