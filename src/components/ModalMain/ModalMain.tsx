import { useState, FC, PropsWithoutRef } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { nanoid } from "nanoid";

import tr from './ModalMain.module.scss';

import { useAppDispatch, useAppSelector } from "../../app.hooks";

// API
import addTrackAPI from '../../API/addTrackAPI';
import putTrackAPI from '../../API/putTrackAPI';

// types import
import { PayType, ModalPropsTypes } from '../../types/types.ts';

const ModalMain: FC<PropsWithoutRef<ModalPropsTypes>> = ({ buttonName, elementName, value, selectedId }) => {


  const dispatch = useAppDispatch();
  const languageSelector = useAppSelector(state => state.ser.language);
  const tokenSelector = useAppSelector(state => state.signIn.token);
  const [paySelect, setPaySelect] = useState('company');

  const pay = (evt: React.MouseEvent<HTMLInputElement>) => {
    evt.currentTarget.checked === true ? setPaySelect(PayType.own) : setPaySelect(PayType.company);
  }

  const errorMessagesTrans = (data: string) => {

    let message = '';

    switch (data) {

      case 'liters':
        languageSelector === 'En' ? message = 'Invalid email' : message = 'Невірний формат літри';
        break;

      case 'litersReq':
        languageSelector === 'En' ? message = 'Email field is required' : message = "Літри обов'язкові";
        break;

      case 'marck':
        languageSelector === 'En' ? message = 'Must be numbers' : message = "Мають бути цифри";
        break;

      case 'marckReq':
        languageSelector === 'En' ? message = 'Password field is required' : message = "Марка обов'язкова";
        break;

      case 'price':
        languageSelector === 'En' ? message = 'Must be numbers' : message = "Мають бути цифри";
        break;

      case 'priceReq':
        languageSelector === 'En' ? message = 'Price field is required' : message = "Ціна обов'язкова";
        break;

      case 'km':
        languageSelector === 'En' ? message = 'Must be numbers' : message = "Мають бути цифри";
        break;

      case 'kmReq':
        languageSelector === 'En' ? message = 'Km field is required' : message = "Відстань обов'язковs";
        break;

      case 'burn':
        languageSelector === 'En' ? message = 'Must be numbers' : message = "Мають бути цифри";
        break;

      case 'burnReq':
        languageSelector === 'En' ? message = 'Burn field is required' : message = "Використано обов'язково";
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
          { message: errorMessagesTrans('liters') }
        )
        .required(errorMessagesTrans('litersReq')),
      marck: Yup.string()
        .matches(
          /\w{0}[0-9a-zA-Za-яА-Я]/,
          { message: errorMessagesTrans('marck') }
        )
        .required(errorMessagesTrans('marckReq')),

      price: Yup.string()
        .matches(
          /\w{0}[0-9]/,
          { message: errorMessagesTrans('price') }
        )
        .required(errorMessagesTrans('priceReq')),
      km: Yup.string()
        .matches(
          /\w{0}[0-9]/,
          { message: errorMessagesTrans('km') }
        )
        .required(errorMessagesTrans('kmReq')),
      burn: Yup.string()
        .matches(
          /\w{0}[0-9]/,
          { message: errorMessagesTrans('L') }
        )
        .required(errorMessagesTrans('burnReq')),
      selected: Yup.boolean()
    }),

    initialValues: elementName !== undefined && elementName.selected === true && buttonName === 'change' ?
      {
        liters: elementName.liters,
        marck: elementName.marck,
        price: elementName.price,
        km: elementName.km,
        burn: elementName.burn,
        selected: elementName.selected,
      } :
      {
        liters: '',
        marck: '',
        price: '',
        km: '',
        burn: '',
        selected: '',
      },
      
    onSubmit: (values, { resetForm }) => {

      if (value !== null) {
        if (buttonName === 'new') {

          dispatch(addTrackAPI({
            data: {
              _id: nanoid(24), // 24 elements in id
              liters: values.liters,
              marck: values.marck,
              price: values.price,
              km: values.km,
              pay: paySelect as PayType,
              burn: values.burn,
              date: `${value}`,
              selected: false,
            }, token: tokenSelector
          }));

        } else {

          dispatch(putTrackAPI({
            id: selectedId, token: tokenSelector, data: {
              _id: selectedId,
              liters: values.liters,
              marck: values.marck,
              price: values.price,
              km: values.km,
              pay: paySelect as PayType,
              burn: values.burn,
              date: `${value}`,
              selected: false,
            }
          }));

        };

      };
      resetForm();

    },
  });

  return (
    <div>

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

        <div className={tr.data}><p>Марка палива</p>
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
          <button type='submit' disabled={buttonName === 'new' ? false : true}>Load</button>
          <button type='submit' disabled={buttonName === 'change' ? false : true}>Change</button>
        </div>
      </form>

    </div>
  )
}

export default ModalMain;