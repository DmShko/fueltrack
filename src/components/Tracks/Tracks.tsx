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
import { changeAddTrack } from '../../fuelTrackStore/addTrackSlice.ts'
import { changeDelTrack } from '../../fuelTrackStore/deleteTrackSlice.ts'

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
  const deleteTrackMessage = useAppSelector(state => state.delTrack.message);
  const userNameSelector = useAppSelector(state => state.signIn.name);
  const isLoadingSelector = useAppSelector(state => state.signIn.isLoading);
  const deletedSelector = useAppSelector(state => state.delTrack.isDeleted);
  const addSelector = useAppSelector(state => state.addTrack.isAdd);
  const tracksSelector = useAppSelector(state => state.getTrack.fuelDays);
  const selectedDaySelector = useAppSelector(state => state.getTrack.selectedDay);
  const languageSelector = useAppSelector(state => state.ser.language);
  const lightModeSelector = useAppSelector(state => state.ser.lightMode);

  // open/close modal window
  const [modalToggle, setModalToggle] = useState(false);

  const shortMonthsEN = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  useEffect(() => {

    const cleanupTracks  = async () => {
                                //^tarckId: string
 
      // cleanupTracks
    if(tracksSelector.length != 0 && tokenSelector !== '') {

      const currentDateIndex = shortMonthsEN.indexOf(`${activeMonth?.toString().split(' ')[1]}`);

        for(const d in tracksSelector) {
         
          if(currentDateIndex - 2 >= 0) {
    
            if((shortMonthsEN.indexOf(tracksSelector[d].date.split(' ')[1]) <= currentDateIndex - 2) || (shortMonthsEN.indexOf(tracksSelector[d].date.split(' ')[1]) > currentDateIndex)) {
                //cleanupTracks(tracksSelector[d]._id);
                
                await dispatch(deleteTrackAPI({token: tokenSelector, id: tracksSelector[d]._id}));
                
                dispatch(tracks({mode: 'clearSelectedTrack', data: {id: tracksSelector[d]._id, value: false}}));
            }
              
          }
          else {

            const prevMonthIdx = currentDateIndex === 0 ? 11 : currentDateIndex - 1;

           
              if (shortMonthsEN.indexOf(tracksSelector[d].date.split(' ')[1]) !== currentDateIndex && shortMonthsEN.indexOf(tracksSelector[d].date.split(' ')[1]) !== prevMonthIdx) {
                await dispatch(deleteTrackAPI({ token: tokenSelector, id: tracksSelector[d]._id }));
                dispatch(tracks({ mode: 'clearSelectedTrack', data: { id: tracksSelector[d]._id, value: false } }));
              }

          };

        };
        

      };
        //dispatch(deleteTrackAPI({token: tokenSelector, id: tarckId}));

    };
    
    cleanupTracks();

  },[tokenSelector,]);

  // add trak info
  useEffect(() => {

    if(addTrackMessage !== '') setModalToggle(true);
    setButtonClickName('resault');

  },[addSelector,]);

  // delete trak info
  useEffect(() => {

    if(deleteTrackMessage !== '') setModalToggle(true);
    setButtonClickName('resault');

  },[deletedSelector,]);

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
    
    if (addTrackMessage !== '') 
      dispatch(changeAddTrack({operation: 'clearMessage', data: ''}));

    if (deleteTrackMessage !== '') 
      dispatch(changeDelTrack({operation: 'clearMessage', data: ''}));
   
  };

  const clearIs = () => {
    
    if (addSelector) 
      dispatch(changeAddTrack({operation: 'clearIsAdd', data: ''}));

    if (deletedSelector) 
      dispatch(changeDelTrack({operation: 'clearIsDel', data: ''}));
   
  };

  const modalSelect = () => {

     switch(buttonClickName) {
          case 'delete':
            return <ErrorModal openClose={openModal} action={deleteTrack} props={languageSelector === 'En' ? {messages: 'Are you sure you want to delete?', buttonName: buttonClickName,} : {messages: 'Ви впевнені, що хочете видалити?', buttonName: buttonClickName,}} />
          case 'change':
            return <ModalMain openClose={openModal} buttonName={buttonClickName} elementName={selectedDaySelector} value={value} selectedId={selectedDaySelector._id}/>
          case 'new':
            return !selectedDaySelector.selected ? <ModalMain openClose={openModal} buttonName={buttonClickName} elementName={selectedDaySelector} value={value} selectedId={selectedDaySelector._id}/> :
            <InfoModal clearMessages ={ () =>  clearMessages()}  openClose={openModal} clearIs ={ () =>  clearIs()} props={languageSelector === 'En' ? {messages: 'You cannot create an entry because something is already selected!',} : {messages: 'Ви не можете створити запис, оскільки щось уже вибрано!',}} />;
          case 'resault':
            return addSelector ? <InfoModal clearMessages ={ () =>  clearMessages()}  openClose={openModal} clearIs ={ () =>  clearIs()} props={{messages: addTrackMessage,}} /> :
            <InfoModal clearMessages ={ () =>  clearMessages()}  openClose={openModal} clearIs ={ () =>  clearIs()}   props={{messages: deleteTrackMessage,}} />; 
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

    !isLoadingSelector ? <div className={tr.container} style={lightModeSelector === 'dark' ?  {backgroundColor: 'lightgray', boxShadow: '1px 1px 4px 1px black'} : {backgroundColor: 'white'}}>
  
      {modalToggle && <TrackModal openClose={openModal}>
        
        { 
          modalSelect()
        }
        </TrackModal>
      }

      <div className={tr.toggleStatictic} style={lightModeSelector === 'dark' ? {borderBottom: 'solid 2px gray'} : {borderBottom: 'solid 2px #aab1f8'}}>
        <button onClick={changeStatisticMenu}>{toggleMenu === true ? <Users width={'30px'} height={'30px'}/> : <User width={'30px'} height={'30px'}/>}</button>
        <div className={tr.currentUser}>
          <p style={lightModeSelector === 'dark' ? {color: 'gray'} : {color: '#aab1f8'}}>{`${userNameSelector}`}</p>
          <CurrentUserLogo width={'45px'} height={'45px'} stroke={lightModeSelector === 'dark' ? 'gray' : '#aab1f8'}/>
        </div>
      </div>  

      {toggleMenu && <div className={tr.currentStatistic}>

        <div className={tr.calendarContainer} style={lightModeSelector === 'dark' ? {backgroundColor: 'lightgray'} : {backgroundColor: 'white'}}>
          <Calendar className={tr.calendar} maxDate={new Date} showNeighboringMonth={false} onChange={onChange} onActiveStartDateChange={handleMonthChange} value={value}/>
          <div className={tr.completeContainer} style={lightModeSelector === 'dark' ? {border: 'solid 2px #aab1f8'} : {border: 'solid 2px #aab1f8'}}>
            <div className={tr.complete} style={lightModeSelector === 'dark' ? selectedDaySelector.selected ? 
            {height: '30px', width: '100%', borderRadius: '8px', background: `linear-gradient(to right, #aab1f8 ${Number(selectedDaySelector.burn) * 100 / Number(selectedDaySelector.liters)}%, lightgray ${Number(selectedDaySelector.burn) * 100 / Number(selectedDaySelector.liters)}%)`
            }: {height: '30px', width: '100%', borderRadius: '8px', background: 'lightgray'}: selectedDaySelector.selected ? 
            {height: '30px', width: '100%', borderRadius: '8px', background: `linear-gradient(to right, #aab1f8 ${Number(selectedDaySelector.burn) * 100 / Number(selectedDaySelector.liters)}%, white ${Number(selectedDaySelector.burn) * 100 / Number(selectedDaySelector.liters)}%)`
            }: {height: '30px', width: '100%', borderRadius: '8px', background: 'white'}}>
                  <div className={tr.completeTitle}>
                    {selectedDaySelector.selected && `${Math.round(Number(selectedDaySelector.burn) * 100 / Number(selectedDaySelector.liters))}%`} 
                  </div>
            </div> 
          </div>  
        </div>
       
        <div className={tr.monthStatistic} style={lightModeSelector === 'dark' ? {border: 'solid 3px #e7e7f0'} : {border: 'solid 3px #e7e7f0'}}>

          <div className={tr.dashboard}>

            <button className={tr.newButt} name= 'new' onClick={openModal} style={lightModeSelector === 'dark' ? selectedDaySelector.selected === false ? {backgroundColor: '#aab1f8',} : {backgroundColor: '#e7e7f0'} :
              selectedDaySelector.selected === false ? {backgroundColor: '#aab1f8',} : {backgroundColor: 'lightgray'}}>{languageSelector === 'En' ? 'New': 'Новий'}</button>
            <button name='change' onClick={openModal} disabled={selectedDaySelector.selected ? false : true} style={lightModeSelector === 'dark' ? selectedDaySelector.selected !== false ? {backgroundColor: '#aab1f8'} : {backgroundColor: '#e7e7f0'} : 
              selectedDaySelector.selected !== false ? {backgroundColor: '#aab1f8'} : {backgroundColor: 'lightgray'}}>{languageSelector === 'En' ? 'Change': 'Змінити'}</button>
            <button name='delete' onClick={deleteElement} disabled={selectedDaySelector.selected ? false : true} style={lightModeSelector === 'dark' ? selectedDaySelector.selected !== false ? {backgroundColor: '#aab1f8'} : {backgroundColor: '#e7e7f0'} : 
              selectedDaySelector.selected !== false ? {backgroundColor: '#aab1f8'} : {backgroundColor: 'lightgray'}}>{languageSelector === 'En' ? 'Delete': 'Видалити'}</button>
            
          </div>

          <p className={tr.monthLable}>{tracksSelector.length !== 0 && tracksSelector !== undefined ? tracksSelector.filter(element => element.date.split(' ')[1] === activeMonth?.toString().split(' ')[1])[0]?.date.split(' ')[1] : ''}</p>
        
          <ul className={tr.list}>
            
            { tracksSelector.length != 0 ?

              sortDate(tracksSelector).map(element => {
                
                return <li className={tr.item} id={element._id}  key={nanoid()} onClick={searchDay}
                style={searchSelected(element._id) ? {backgroundColor: '#aab1f8'} : {backgroundColor: 'lightgray'}}>{element.date.split(' ')[2]}</li>

            }): languageSelector === 'En' ? 'no tracks': 'Немає доріжок'}
          </ul>
        
            <div className={tr.parameter}><GasStation width='50px'/><p className={tr.value}>{selectedDaySelector.selected? selectedDaySelector?.liters : ''}</p><p>{languageSelector === 'En' ? "L": 'Літри'}</p></div>
            <div className={tr.parameter}><Distance width='50px'/><p className={tr.value}>{selectedDaySelector.selected? selectedDaySelector?.km : ''}</p><p>{languageSelector === 'En' ? "KM": 'КМ'}</p></div>
            <div className={tr.parameter}><Mark width='50px'/><p className={tr.value}>{selectedDaySelector.selected? selectedDaySelector?.marck : ''}</p><p>{languageSelector === 'En' ? "Type": 'Марка'}</p></div>
            <div className={tr.parameter}><Burn width='50px'/><p className={tr.value}>{selectedDaySelector.selected? selectedDaySelector?.burn : ''}</p><p>{languageSelector === 'En' ? "L": 'Літри'}</p></div>
            <div className={tr.parameter}><Rest width='50px'/><p className={tr.rest}>{selectedDaySelector.selected? selectedDaySelector?.liters !== undefined && selectedDaySelector?.burn !== undefined ?
              (Number(selectedDaySelector?.liters) - Number(selectedDaySelector?.burn)).toString() : '' : ''}</p><p>{languageSelector === 'En' ? "L": 'Літри'}</p></div>
            <div className={tr.parameter}><Wallet width='50px'/><p className={tr.value}>{selectedDaySelector.selected? selectedDaySelector?.price : ''}</p><p>{languageSelector === 'En' ? "$": 'гр'}</p></div>
            <div className={tr.parameter}><Card width='50px'/><p className={tr.value}>{selectedDaySelector.selected? selectedDaySelector?.pay : ''}</p><p></p></div> 
          
        </div>
      </div>}  

      {!toggleMenu && <Collaborator/>}

    </div> : <Loader className={tr.loader} width={'85px'} height={'85px'}/>
  )
};

export default Tracks;