import { FC, useState, useEffect } from 'react';

import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

import tr from './Tracks.module.scss';

// own dispatch hook
import { useAppSelector } from "../../app.hooks"; 

import TrackModal from "../TrackModal/TrackModal";

// API
import getTrackByIdAPI from '../../API/getTrackByIdAPI';
import getTrackAPI from '../../API/getTrackAPI';
import deleteTrackAPI from '../../API/deleteTrackAPI';

import ModalMain from '../ModalMain/ModalMain.tsx';

// types import
import { Track } from '../../types/types.ts';

// images
import Rest from '../SvgComponents/Rest/Rest';
import Wallet from '../SvgComponents/Wallet/Wallet';
import GasStation from '../SvgComponents/GasStation/GasStation';
import Card from '../SvgComponents/Card/Card';
import Distance from '../SvgComponents/Distance/Distance';
import Mark from '../SvgComponents/Mark/Mark';
import Burn from '../SvgComponents/Burn/Burn';

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
  const [toggleSelected, setToggleSelected] = useState(false);
  
  const [selectedElement, setSelectedElement ]= useState<Track>();
  const [buttonClickName, setButtonClickName ]= useState('');

  const tokenSelector = useAppSelector(state => state.signIn.token);
  const deletedSelector = useAppSelector(state => state.delTrack.isDeleted);
  const addSelector = useAppSelector(state => state.addTrack.isAdd);

  // open/close modal window
  const [modalToggle, setModalToggle] = useState(false);

  const tracksSelector = useAppSelector(state => state.getTrack.fuelDays);

  useEffect(() => {
    if(tokenSelector !== '') {
      dispatch(getTrackAPI({token: tokenSelector}));
    } 

  },[tokenSelector, deletedSelector, addSelector]);

  useEffect(() => {

    if(selectedElement !== undefined)
      dispatch(getTrackByIdAPI({id: selectedElement?._id, token: tokenSelector}));
      setToggleSelected(state => !state);

  },[selectedElement]);

  useEffect(() => {

    if(selectedElement !== undefined)
     
      dispatch(tracks({mode: 'selectedTrack', data: {id: selectedElement?._id, value: toggleSelected}}))

  },[toggleSelected]);

  const changeStatisticMenu = (evt: React.MouseEvent<HTMLElement>) => {
    if (evt.target as HTMLButtonElement === evt.currentTarget as HTMLButtonElement) setToggleMenu(state => !state)
  }

  const openModal = (evt: React.MouseEvent<HTMLButtonElement>) => {
    // toggle modal window
    setModalToggle(state => !state);

    if(evt !== undefined) setButtonClickName(evt.currentTarget.name);
    
  }

  const searchDay = (evt: React.MouseEvent<HTMLLIElement>) => {
    
    setSelectedElement(tracksSelector.find(element => 
      element._id === evt.currentTarget.id
    ));

  };

  const deleteElement = () => {
    if (selectedElement !== undefined) {
      dispatch(deleteTrackAPI({id: selectedElement?._id, token: tokenSelector}));
    }
  };
 
  return (

    <div className={tr.container}>
  
      {modalToggle && <TrackModal openClose={openModal}>
        
          <ModalMain buttonName={buttonClickName} elementName={selectedElement} value={value}/>

        </TrackModal>
      }

      <div className={tr.toggleStatictic}>
        <button onClick={changeStatisticMenu}>{toggleMenu === true ? 'Others' : 'My'}</button>
      </div>

      <div className={tr.currentStatistic}>
        <Calendar className={tr.calendar} maxDate={new Date} showNeighboringMonth={false} onChange={onChange} value={value}/>
        
        <div className={tr.monthStatistic}>

          <div className={tr.dashboard}>
            <button name='new' onClick={openModal} style={{backgroundColor: 'lightgreen'}}>New</button>
            <button name='change' onClick={openModal} style={{backgroundColor: '#ffea2d'}}>Change</button>
            <button onClick={deleteElement} disabled={selectedElement !== undefined? false : true} style={selectedElement !== undefined ? {backgroundColor: 'lightcoral'} : {backgroundColor: 'lightgray'}}>Delete</button>
          </div>
        
          <ul className={tr.list}>
            { tracksSelector.length != 0 ?

              tracksSelector.map(element => {
              
                return <li className={tr.item} id={element._id}  key={nanoid()} onClick={searchDay}
                style={element._id === selectedElement?._id ? {backgroundColor: '#aab1f8'} : {backgroundColor: 'lightgray'}}>{element.date.split(' ').splice(1, 2).join(' ')}</li>

            }): 'no tracks'}
          </ul>

          <div className={tr.parameter}><GasStation width='50px'/><p className={tr.value}>{selectedElement?.liters}</p><p>L</p></div>
          <div className={tr.parameter}><Distance width='50px'/><p className={tr.value}>{selectedElement?.km}</p><p>KM</p></div>
          <div className={tr.parameter}><Mark width='50px'/><p className={tr.value}>{selectedElement?.marck}</p><p>Type</p></div>
          <div className={tr.parameter}><Burn width='50px'/><p className={tr.value}>{selectedElement?.burn}</p><p>L</p></div>
          <div className={tr.parameter}><Rest width='50px'/><p className={tr.rest}>{selectedElement?.liters !== undefined && selectedElement?.burn !== undefined ?
            (Number(selectedElement?.liters) - Number(selectedElement?.burn)).toString() : ''}</p><p>L</p></div>
          <div className={tr.parameter}><Wallet width='50px'/><p className={tr.value}>{selectedElement?.price}</p><p>$</p></div>
          <div className={tr.parameter}><Card width='50px'/><p className={tr.value}>{selectedElement?.pay}</p><p>$</p></div>

        </div>
      </div>  

    </div>
  )
};

export default Tracks;