import { FC, PropsWithChildren, } from "react";

// types import
import { InfoModalPropsTypes } from '../../types/types.ts';

// slices


//styles
import info from './InfoModal.module.scss';

const InfoModal: FC<PropsWithChildren<InfoModalPropsTypes>> = ({openClose, props}) => {

const buttonClick = () => {
    openClose();
};

return (

    <div className={info.container}>
        
        <p>{`${props.messages}`}</p>

        <button name="ok" onClick={buttonClick}>Ok</button>

    </div>

)};

export default InfoModal;