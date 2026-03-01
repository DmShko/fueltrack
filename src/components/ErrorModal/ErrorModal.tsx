import { FC, PropsWithChildren, } from "react";

// own dispatch hook
import { useAppSelector } from "../../app.hooks";
import { useAppDispatch } from "../../app.hooks";  

// API
import deleteTrackAPI from '../../API/deleteTrackAPI';

// types import
import { ErrorModalPropsTypes } from '../../types/types.ts';

// slices
import { tracks } from '../../fuelTrackStore/getTrackSlice.ts';

//styles
import err from './ErrorModal.module.scss';

const ErrorModal: FC<PropsWithChildren<ErrorModalPropsTypes>> = ({props}) => {

const dispatch = useAppDispatch();
const tokenSelector = useAppSelector(state => state.signIn.token);

const selectedDaySelector = useAppSelector(state => state.getTrack.selectedDay);

const buttonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {

    

    switch(evt.currentTarget.name) {

        case 'yes':
  
        if(selectedDaySelector.selected !== false) {

            dispatch(deleteTrackAPI({id: selectedDaySelector?._id, token: tokenSelector}));
            dispatch(tracks({mode: 'selectedTrack', data: {id: selectedDaySelector?._id, value: false}}));
        }

            break;

        case 'no':

            break;

        default:
            break;

    };

};

return (

    <div className={err.container}>
        <p>{`${props.messages}`}</p>

        <button name="yes" onClick={buttonClick}>Yes</button>
        <button name="no" onClick={buttonClick}>No</button>

    </div>

)};

export default ErrorModal;