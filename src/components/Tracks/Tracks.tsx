import { FC, useState } from 'react';

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

// types import
import { PayType } from '../../types/types.ts';

// images
import Rest from '../SvgComponents/Rest/Rest';
import Wallet from '../SvgComponents/Wallet/Wallet';
import GasStation from '../SvgComponents/GasStation/GasStation';
import Card from '../SvgComponents/Card/Card';
import Distance from '../SvgComponents/Distance/Distance';
import Mark from '../SvgComponents/Mark/Mark';

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

  const languageSelector = useAppSelector(state => state.ser.language);
  const tokenSelector = useAppSelector(state => state.signIn.token);

  // open/close modal window
  const [modalToggle, setModalToggle] = useState(false);

  const tracksSelector = useAppSelector(state => state.ser.fuelDays)

  const changeStatisticMenu = (evt: React.MouseEvent<HTMLElement>) => {
    if (evt.target as HTMLButtonElement === evt.currentTarget as HTMLButtonElement) setToggleMenu(state => !state)
  }

  const openModal = () => {
    // toggle modal window
    setModalToggle(state => !state);
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
    }),

    initialValues: {
      liters: '',
      marck: '',
      price: '',
      km: '',
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
         date: `${value}`,
        }, token: tokenSelector}));
      } 
      resetForm();

    },
  });
 
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

            <div className={tr.data}><p>За власний рахунок</p><input type='checkbox' id='typeOfPay' onClick={pay}></input></div>

            <div className={tr.modDashboard}>
              <button type='submit'>Load</button>
              <button>Change</button>
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
            <button onClick={openModal} style={{backgroundColor: 'lightgreen'}}>New</button>
            <button style={{backgroundColor: '#ffea2d'}}>Change</button>
            <button style={{backgroundColor: 'lightcoral'}}>Delete</button>
          </div>

          <ul className={tr.list}>
            { tracksSelector.length != 0 ?

              tracksSelector.map(element => {
              
                return <li className={tr.item} id={nanoid()}  key={element._id}></li>

            }): 'no tracks'}
          </ul>

          <div className={tr.parameter}><GasStation/><p>L</p></div>
          <div className={tr.parameter}><Distance/><p>KM</p></div>
          <div className={tr.parameter}><Mark/></div>
          <div className={tr.parameter}><Rest/><p>L</p></div>
          <div className={tr.parameter}><Wallet/><p>$</p></div>
          <div className={tr.parameter}><Card/><p>$</p></div>

        </div>
      </div>  

    </div>
  )
};

export default Tracks;