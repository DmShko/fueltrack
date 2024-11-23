import { FC, useState, useEffect } from 'react';

import Calendar from 'react-calendar';

import { useFormik } from "formik"; 

import * as Yup from 'yup';

import 'react-calendar/dist/Calendar.css';

import tr from './Tracks.module.scss';

// own dispatch hook
import { useAppSelector } from "../../app.hooks"; 

import TrackModal from "../TrackModal/TrackModal";

// API
import addTrackAPI from '../../API/addTrackAPI';
import getTrackAPI from '../../API/getTrackAPI';
import deleteTrackAPI from '../../API/deleteTrackAPI';

// types import
import { PayType, Track } from '../../types/types.ts';

// images
import Rest from '../SvgComponents/Rest/Rest';
import Wallet from '../SvgComponents/Wallet/Wallet';
import GasStation from '../SvgComponents/GasStation/GasStation';
import Card from '../SvgComponents/Card/Card';
import Distance from '../SvgComponents/Distance/Distance';
import Mark from '../SvgComponents/Mark/Mark';
import Burn from '../SvgComponents/Burn/Burn';

import { useAppDispatch } from "../../app.hooks"; 

import { nanoid } from 'nanoid';

// calendar types
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Tracks: FC = () => {

  const dispatch = useAppDispatch();

  const [value, onChange] = useState<Value>(new Date());
  const [toggleMenu, setToggleMenu] = useState(true);
  const [paySelect, setPaySelect ]= useState('company');
  const [selectedElement, setSelectedElement ]= useState<Track>();
  const [buttonClickName, setButtonClickName ]= useState('');

  const languageSelector = useAppSelector(state => state.ser.language);
  const tokenSelector = useAppSelector(state => state.signIn.token);
  const deletedSelector = useAppSelector(state => state.delTrack.isDeleted);
  const addSelector = useAppSelector(state => state.addTrack.isAdd);

  // open/close modal window
  const [modalToggle, setModalToggle] = useState(false);

  const tracksSelector = useAppSelector(state => state.getTrack.fuelDays)

  useEffect(() => {
    if(tokenSelector !== '') dispatch(getTrackAPI({token: tokenSelector}));
  },[tokenSelector, deletedSelector, addSelector]);

  const changeStatisticMenu = (evt: React.MouseEvent<HTMLElement>) => {
    if (evt.target as HTMLButtonElement === evt.currentTarget as HTMLButtonElement) setToggleMenu(state => !state)
  }

  const openModal = (evt: React.MouseEvent<HTMLButtonElement>) => {
    // toggle modal window
    setModalToggle(state => !state);

    if(evt !== undefined) setButtonClickName(evt.currentTarget.name);
    
  }

  const pay = (evt: React.MouseEvent<HTMLInputElement>) => {
      evt.currentTarget.checked === true ?
        setPaySelect(PayType.own) : setPaySelect(PayType.company);
  }

  const errorMessagesTrans = (data: string) => { 

    let message = '';

    switch(data) {

      case 'liters':
        languageSelector === 'En' ? message = 'Invalid email' : message = 'Невірний формат літри';
      break;

      case 'litersReq':
        languageSelector === 'En' ? message = 'Email field is required': message = "Літри обов'язкові";
      break;

      case 'marck':
        languageSelector === 'En' ? message = 'Must be numbers': message = "Мають бути цифри";
      break;

      case 'marckReq':
        languageSelector === 'En' ? message = 'Password field is required': message = "Марка обов'язкова";
      break;

      case 'price':
        languageSelector === 'En' ? message = 'Must be numbers': message = "Мають бути цифри";
      break;

      case 'priceReq':
        languageSelector === 'En' ? message = 'Price field is required': message = "Ціна обов'язкова";
      break;

      case 'km':
        languageSelector === 'En' ? message = 'Must be numbers': message = "Мають бути цифри";
      break;

      case 'kmReq':
        languageSelector === 'En' ? message = 'Km field is required': message = "Відстань обов'язковs";
      break;

      case 'burn':
        languageSelector === 'En' ? message = 'Must be numbers': message = "Мають бути цифри";
      break;

      case 'burnReq':
        languageSelector === 'En' ? message = 'Burn field is required': message = "Використано обов'язковs";
      break;

      default:
        break;
    }

    return message;
    
  };

  const formik = useFormik({

    //yup stored own validate functions (for email, password...etc)
    validationSchema: Yup.object({
      liters: Yup.string()
        .matches(
          /\w{0}[0-9]/,
          { message: errorMessagesTrans('liters')}
        )
        .required(errorMessagesTrans('litersReq')),
      marck: Yup.string()
        .matches(
          /\w{0}[0-9a-zA-Za-яА-Я]/,
          { message: errorMessagesTrans('marck')}
        )
        .required(errorMessagesTrans('marckReq')),
      
      price: Yup.string()
        .matches(
          /\w{0}[0-9]/,
          { message: errorMessagesTrans('price')}
        )
        .required(errorMessagesTrans('priceReq')),
      km: Yup.string()
      .matches(
        /\w{0}[0-9]/,
        { message: errorMessagesTrans('km')}
      )
      .required(errorMessagesTrans('kmReq')),
      burn: Yup.string()
      .matches(
        /\w{0}[0-9]/,
        { message: errorMessagesTrans('L')}
      )
      .required(errorMessagesTrans('burnReq')),
    }),

    initialValues: {
      liters: '',
      marck: '',
      price: '',
      km: '',
      burn: '',
    },
    onSubmit: (values, { resetForm }) => {
  
      if (value !== null) {
        dispatch(addTrackAPI({data: {
         _id: nanoid(),
         liters: values.liters,
         marck: values.marck,
         price: values.price,
         km: values.km,
         pay: paySelect as PayType,
         burn: values.burn,
         date: `${value}`,
        }, token: tokenSelector}));
      } 
      resetForm();

    },
  });

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
        <form onSubmit={formik.handleSubmit}>
            <div className={tr.data}><p>Літри</p>
              <input 
                id="liters"
                name="liters"
                type="liters"
                onChange={formik.handleChange}
                value={formik.values.liters}>
              </input>
            </div>

            <div className={tr.data}><p>Кілометри</p>
              <input 
                id="km"
                name="km"
                type="km"
                onChange={formik.handleChange}
                value={formik.values.km}>
              </input>
            </div>

            <div className={tr.data}><p>Марка</p>
            <input 
                id="marck"
                name="marck"
                type="marck"
                onChange={formik.handleChange}
                value={formik.values.marck}>
            </input></div>

            <div className={tr.data}><p>Ціна</p>
            <input 
                id="price"
                name="price"
                type="price"
                onChange={formik.handleChange}
                value={formik.values.price}>
          
            </input></div>

            <div className={tr.data}><p>Використано</p>
            <input 
                id="burn"
                name="burn"
                type="burn"
                onChange={formik.handleChange}
                value={formik.values.burn}>
          
            </input></div>

            <div className={tr.data}><p>За власний рахунок</p><input type='checkbox' id='typeOfPay' onClick={pay}></input></div>

            <div className={tr.modDashboard}>
              <button type='submit' disabled={buttonClickName === 'new'? false : true}>Load</button>
              <button type='submit' disabled={buttonClickName === 'change'? false : true}>Change</button>
            </div>
          </form>

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