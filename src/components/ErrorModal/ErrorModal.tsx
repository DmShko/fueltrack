import { FC, PropsWithChildren, } from "react";

// own dispatch hook
import { useAppSelector } from "../../app.hooks";

// types import
import { ErrorModalPropsTypes } from '../../types/types.ts';

//styles
import err from './ErrorModal.module.scss';

const ErrorModal: FC<PropsWithChildren<ErrorModalPropsTypes>> = ({openClose, action, props}) => {

const selectedDaySelector = useAppSelector(state => state.getTrack.selectedDay);
const collabsSelector = useAppSelector(state => state.getCollabsById.collabsById);

const buttonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {

    switch(evt.currentTarget.name) {

        case 'yes':
  
        if(selectedDaySelector.selected !== false || collabsSelector.find(element => element.isCatch === true)) {

            action();
            openClose();
          
        }

            break;

        case 'no':
            openClose();
            break;

        default:
            break;

    };

};

return (

    <div className={err.container}>
        
        <p>{`${props.messages}`}</p>

        <div className={err.buttonContainer}>

            <button name="yes" onClick={buttonClick}>Yes</button>
            <button name="no" onClick={buttonClick}>No</button>

        </div>

    </div>

)};

export default ErrorModal;