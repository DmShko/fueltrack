import { FC, useState, useEffect } from 'react';

import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

import tr from './Tracks.module.scss';

// own dispatch hook
import { useAppSelector } from "../../app.hooks"; 

import TrackModal from "../TrackModal/TrackModal";
import Collaborator from '../Collaborators/Collaborators.tsx';

// API
import getTrackAPI from '../../API/getTrackAPI';
import deleteTrackAPI from '../../API/deleteTrackAPI';

import ModalMain from '../ModalMain/ModalMain.tsx';

// images
import Rest from '../SvgComponents/Rest/Rest';
import Wallet from '../SvgComponents/Wallet/Wallet';
import GasStation from '../SvgComponents/GasStation/GasStation';
import Card from '../SvgComponents/Card/Card';
import Distance from '../SvgComponents/Distance/Distance';
import Mark from '../SvgComponents/Mark/Mark';
import Burn from '../SvgComponents/Burn/Burn';
import User from '../SvgComponents/User/User';
import Users from '../SvgComponents/Users/Users.tsx';
import CurrentUserLogo from '../SvgComponents/CurrentUserLogo/CurrentUserLogo.tsx';

import { useAppDispatch } from "../../app.hooks"; 

import { tracks } from '../../fuelTrackStore/getTrackSlice.ts'

import { nanoid } from 'nanoid';

// calendar types
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Tracks: FC = () => {

  const dispatch = useAppDispatch();

  const [value, onChange] = useState<Value>(new Date());
  const [toggleMenu, setToggleMenu] = useState(true);
  
  const [buttonClickName, setButtonClickName ]= useState('');

  const tokenSelector = useAppSelector(state => state.signIn.token);
  const userNameSelector = useAppSelector(state => state.signIn.name);
  const deletedSelector = useAppSelector(state => state.delTrack.isDeleted);
  const addSelector = useAppSelector(state => state.addTrack.isAdd);
  const tracksSelector = useAppSelector(state => state.getTrack.fuelDays);
  const selectedDaySelector = useAppSelector(state => state.getTrack.selectedDay);

  // open/close modal window
  const [modalToggle, setModalToggle] = useState(false);

  useEffect(() => {

    if(tokenSelector !== '') {
      dispatch(getTrackAPI({token: tokenSelector}));
    } 

  },[tokenSelector, deletedSelector, addSelector, modalToggle]);

  const changeStatisticMenu = (evt: React.MouseEvent<HTMLElement>) => {
    if (evt.target as HTMLButtonElement === evt.currentTarget as HTMLButtonElement) setToggleMenu(state => !state)
  }

  const openModal = (evt: React.MouseEvent<HTMLButtonElement>) => {
    // toggle modal window
    setModalToggle(state => !state);

    if(evt !== undefined) setButtonClickName(evt.currentTarget.name);
    
  }

  const searchDay = (evt: React.MouseEvent<HTMLLIElement>) => {

    
    !selectedDaySelector.selected ? dispatch(tracks({mode: 'selectedTrack', data: {id: evt.currentTarget.id, value: true}})) :
    dispatch(tracks({mode: 'selectedTrack', data: {id: evt.currentTarget.id, value: false}}));

  };

  const searchSelected= (id: string) => {

    if(selectedDaySelector._id === id)
    
      return selectedDaySelector.selected

  };

  const deleteElement = () => {
   
    if(selectedDaySelector.selected !== false)
      dispatch(deleteTrackAPI({id: selectedDaySelector?._id, token: tokenSelector}));
      dispatch(tracks({mode: 'selectedTrack', data: {id: selectedDaySelector?._id, value: false}}))
    
  };
 
  return (

    <div className={tr.container}>
  
      {modalToggle && <TrackModal openClose={openModal}>
        
          <ModalMain buttonName={buttonClickName} elementName={selectedDaySelector} value={value} selectedId={selectedDaySelector._id}/>

        </TrackModal>
      }

      <div className={tr.toggleStatictic}>
        <button onClick={changeStatisticMenu}>{toggleMenu === true ? <Users width={'30px'} height={'30px'}/> : <User width={'30px'} height={'30px'}/>}</button>
        <div className={tr.currentUser}>
          <p>{`${userNameSelector}`}</p>
          <CurrentUserLogo width={'45px'} height={'45px'}/>
        </div>
      </div>  

      {toggleMenu && <div className={tr.currentStatistic}>

        <div className={tr.calendarContainer}>
          <Calendar className={tr.calendar} maxDate={new Date} showNeighboringMonth={false} onChange={onChange} value={value}/>
          <div className={tr.completeContainer}>
            <div className={tr.complete} style={selectedDaySelector.selected ? {height: '30px', width: '100%', borderRadius: '8px', background: `linear-gradient(to right, #aab1f8 ${Number(selectedDaySelector.burn) * 100 / Number(selectedDaySelector.liters)}%, white ${Number(selectedDaySelector.burn) * 100 / Number(selectedDaySelector.liters)}%)`
            }: {height: '30px', width: '100%', borderRadius: '8px', background: 'white'}}>
                  <div className={tr.completeTitle}>
                    {selectedDaySelector.selected && `${Math.round(Number(selectedDaySelector.burn) * 100 / Number(selectedDaySelector.liters))}%`} 
                  </div>
            </div> 
          </div>  
        </div>
       
        <div className={tr.monthStatistic}>

          <div className={tr.dashboard}>

            <div className={tr.buttCover}>
              <button className={tr.newButt} name='new' onClick={openModal} disabled={!selectedDaySelector.selected ? false : true} style={selectedDaySelector.selected === false ? {backgroundColor: '#aab1f8'} : {backgroundColor: 'lightgray'}}>New</button>
              <div className={tr.buttGlass}></div>
            </div>
            <button name='change' onClick={openModal} disabled={selectedDaySelector.selected ? false : true} style={selectedDaySelector.selected !== false ? {backgroundColor: '#aab1f8'} : {backgroundColor: 'lightgray'}}>Change</button>
            <button onClick={deleteElement} disabled={selectedDaySelector.selected ? false : true} style={selectedDaySelector.selected !== false ? {backgroundColor: '#aab1f8'} : {backgroundColor: 'lightgray'}}>Delete</button>
          </div>
        
          <ul className={tr.list}>
            { tracksSelector.length != 0 ?

              tracksSelector.map(element => {
              
                return <li className={tr.item} id={element._id}  key={nanoid()} onClick={searchDay}
                style={searchSelected(element._id) ? {backgroundColor: '#aab1f8'} : {backgroundColor: 'lightgray'}}>{element.date.split(' ').splice(1, 2).join(' ')}</li>

            }): 'no tracks'}
          </ul>
        
            <div className={tr.parameter}><GasStation width='50px'/><p className={tr.value}>{selectedDaySelector.selected? selectedDaySelector?.liters : ''}</p><p>L</p></div>
            <div className={tr.parameter}><Distance width='50px'/><p className={tr.value}>{selectedDaySelector.selected? selectedDaySelector?.km : ''}</p><p>KM</p></div>
            <div className={tr.parameter}><Mark width='50px'/><p className={tr.value}>{selectedDaySelector.selected? selectedDaySelector?.marck : ''}</p><p>Type</p></div>
            <div className={tr.parameter}><Burn width='50px'/><p className={tr.value}>{selectedDaySelector.selected? selectedDaySelector?.burn : ''}</p><p>L</p></div>
            <div className={tr.parameter}><Rest width='50px'/><p className={tr.rest}>{selectedDaySelector.selected? selectedDaySelector?.liters !== undefined && selectedDaySelector?.burn !== undefined ?
              (Number(selectedDaySelector?.liters) - Number(selectedDaySelector?.burn)).toString() : '' : ''}</p><p>L</p></div>
            <div className={tr.parameter}><Wallet width='50px'/><p className={tr.value}>{selectedDaySelector.selected? selectedDaySelector?.price : ''}</p><p>$</p></div>
            <div className={tr.parameter}><Card width='50px'/><p className={tr.value}>{selectedDaySelector.selected? selectedDaySelector?.pay : ''}</p><p></p></div> 
          
        </div>
      </div>}  

      {!toggleMenu && <Collaborator/>}

    </div>
  )
};

export default Tracks;