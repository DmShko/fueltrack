import { FC, useState, useEffect } from 'react';

import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

import tr from './Tracks.module.scss';

// own dispatch hook
import { useAppSelector } from "../../app.hooks"; 

import TrackModal from "../TrackModal/TrackModal";
import InfoModal from "../InfoModal/InfoModal";
import ErrorModal from "../ErrorModal/ErrorModal";
import Collaborator from '../Collaborators/Collaborators.tsx';
import Loader from '../SvgComponents/Loader/Loader';

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
import { changeTrack } from '../../fuelTrackStore/addTrackSlice.ts'

import { nanoid } from 'nanoid';

// types
import { Track } from '../../types/types.ts'
import { OnArgs } from 'react-calendar';

// calendar types
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Tracks: FC = () => {

  const dispatch = useAppDispatch();

  const [value, onChange] = useState<Value>(new Date());
  const [activeMonth, setActiveMonth] = useState<Value>(new Date());
  const [toggleMenu, setToggleMenu] = useState(true);
  
  const [buttonClickName, setButtonClickName ]= useState('');

  const tokenSelector = useAppSelector(state => state.signIn.token);
  const addTrackMessage = useAppSelector(state => state.addTrack.message);
  const userNameSelector = useAppSelector(state => state.signIn.name);
  const isLoadingSelector = useAppSelector(state => state.signIn.isLoading);
  const deletedSelector = useAppSelector(state => state.delTrack.isDeleted);
  const addSelector = useAppSelector(state => state.addTrack.isAdd);
  const tracksSelector = useAppSelector(state => state.getTrack.fuelDays);
  const selectedDaySelector = useAppSelector(state => state.getTrack.selectedDay);

  // open/close modal window
  const [modalToggle, setModalToggle] = useState(false);

  const shortMonthsEN = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  useEffect(() => {

    const cleanupTracks = (tarckId: string) => {

      dispatch(deleteTrackAPI({token: tokenSelector, id: tarckId}));

    };
    
     // cleanupTracks
    if(tracksSelector.length != 0 && tokenSelector !== '') {

      const currentDateIndex = shortMonthsEN.indexOf(`${new Date()?.toString().split(' ')[1]}`);

      for(const d in tracksSelector) {

        if(currentDateIndex - 2 >= 0) {

          if(tracksSelector[d].date.split(' ')[1] === shortMonthsEN[shortMonthsEN.indexOf(`${new Date()?.toString().split(' ')[1]}`) - 2]) {
              cleanupTracks(tracksSelector[d]._id);
              dispatch(tracks({mode: 'clearSelectedTrack', data: {id: tracksSelector[d]._id, value: false}}));
          }
            
        }else {

          if(tracksSelector[d].date.split(' ')[1] === shortMonthsEN[shortMonthsEN.length - 1]) {
            
              cleanupTracks(tracksSelector[d]._id);
              dispatch(tracks({mode: 'clearSelectedTrack', data: {id: tracksSelector[d]._id, value: false}}));
          }

        };

      };
      

    };

  },[tokenSelector,]);

  useEffect(() => {

    if(addTrackMessage !== '') setModalToggle(true);
    setButtonClickName('new')

  },[addTrackMessage,]);

  useEffect(() => {

    if(tokenSelector !== '') {
      dispatch(getTrackAPI({token: tokenSelector}));
    };


  },[tokenSelector, deletedSelector, addSelector, modalToggle,]);

  const changeStatisticMenu = () => {
    setToggleMenu(state => !state)
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

  const deleteElement = (evt: React.MouseEvent<HTMLButtonElement>) => {

     // toggle modal window
    setModalToggle(state => !state);

    if(evt !== undefined) setButtonClickName(evt.currentTarget.name);
    
  };

  const deleteTrack = () => {
      
            dispatch(tracks({mode: 'selectedTrack', data: {id: selectedDaySelector?._id, value: false}}));
            dispatch(deleteTrackAPI({id: selectedDaySelector?._id, token: tokenSelector}));

  };

  const clearMessages = () => {
    
    dispatch(changeTrack({operation: 'clearMessage', data: ''}));
   
  };

  const modalSelect = () => {

     switch(buttonClickName) {
          case 'delete':
            return <ErrorModal openClose={openModal} action={deleteTrack} props={{messages: 'Are you sure you want to delete?', buttonName: buttonClickName,}} />
          case 'change':
            return <ModalMain openClose={openModal} buttonName={buttonClickName} elementName={selectedDaySelector} value={value} selectedId={selectedDaySelector._id}/>
          case 'new':
            return !selectedDaySelector.selected ? <ModalMain openClose={openModal} buttonName={buttonClickName} elementName={selectedDaySelector} value={value} selectedId={selectedDaySelector._id}/> :
            <InfoModal clearMessages ={ () =>  clearMessages()} openClose={openModal} props={{messages: 'You cannot create an entry because something is already selected!',}} />;
          default:
            return null;
        }
  };

  const sortDate = (inData: Track []) => {

      const sortData = [...inData].filter(element => element.date.split(' ')[1] === activeMonth?.toString().split(' ')[1]).sort((a, b) => {
     
        const dateA = a.date.split(' ')[2] 
        const dateB = b.date.split(' ')[2];
        
        return dateA.localeCompare(dateB);
      });

      return sortData;
  };

  const handleMonthChange = ({ activeStartDate, view }: OnArgs) => {
   
    if (view === 'month' && activeStartDate) {
      setActiveMonth(activeStartDate);
    }
  };
 
  return (

    !isLoadingSelector ? <div className={tr.container}>
  
      {modalToggle && <TrackModal openClose={openModal}>
        
        { 
          modalSelect()
        }
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
          <Calendar className={tr.calendar} maxDate={new Date} showNeighboringMonth={false} onChange={onChange} onActiveStartDateChange={handleMonthChange} value={value}/>
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

            <button className={tr.newButt} name='new' onClick={openModal} style={selectedDaySelector.selected === false ? {backgroundColor: '#aab1f8',} : {backgroundColor: 'lightgray'}}>New</button>
            <button name='change' onClick={openModal} disabled={selectedDaySelector.selected ? false : true} style={selectedDaySelector.selected !== false ? {backgroundColor: '#aab1f8'} : {backgroundColor: 'lightgray'}}>Change</button>
            <button name='delete' onClick={deleteElement} disabled={selectedDaySelector.selected ? false : true} style={selectedDaySelector.selected !== false ? {backgroundColor: '#aab1f8'} : {backgroundColor: 'lightgray'}}>Delete</button>
            
          </div>

          <p className={tr.monthLable}>{tracksSelector.length !== 0 && tracksSelector !== undefined ? tracksSelector.filter(element => element.date.split(' ')[1] === activeMonth?.toString().split(' ')[1])[0]?.date.split(' ')[1] : ''}</p>
        
          <ul className={tr.list}>
            
            { tracksSelector.length != 0 ?

              sortDate(tracksSelector).map(element => {
                
                return <li className={tr.item} id={element._id}  key={nanoid()} onClick={searchDay}
                style={searchSelected(element._id) ? {backgroundColor: '#aab1f8'} : {backgroundColor: 'lightgray'}}>{element.date.split(' ')[2]}</li>

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

    </div> : <Loader className={tr.loader} width={'85px'} height={'85px'}/>
  )
};

export default Tracks;