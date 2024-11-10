import { useState, useEffect, } from "react";  

import { useNavigate  } from 'react-router-dom';  

import { useFormik } from "formik"; 
import * as Yup from 'yup';

// style
import su from './SignUpPackage.module.scss'

import singUpAPI from "../../API/signUpAPI";

import { changeSingIn } from "../../fuelTrackStore/signInSlice"; 
import { changeSingUp } from "../../fuelTrackStore/signUpSlice";  
import { changeLogout } from "../../fuelTrackStore/logOutSlice"; 
import { changeReVerify } from "../../fuelTrackStore/reVerifySlice";

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../app.hooks"; 

// images
import Pointer from '../SvgComponents/Pointer/Pointer';
import Add from '../SvgComponents/Add/Add';
import Info from '../SvgComponents/Info/Info';
import RoadSign from '../SvgComponents/RoadSign/RoadSign';

const SignUp = () => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isSignUpSelector = useAppSelector(state => state.signUp.isSignUp);
  const signUpMessageSelector = useAppSelector(state => state.signUp.message);
  const logOutMessageSelector = useAppSelector(state => state.logOut.message);
  const isLogOutSelector = useAppSelector(state => state.logOut.isLogout);
  const reVerifyMessageSelector = useAppSelector(state => state.reVerify.message);
  const lightModeSelector = useAppSelector(state => state.ser.lightMode);
  const languageSelector = useAppSelector(state => state.ser.language);

  const [reVerifyMessage, setReVerifyMessage] = useState('');

  useEffect(() => {
  
    if(isLogOutSelector) dispatch(changeSingIn({operation: 'clearToken', data: ''}));
    
  },[isLogOutSelector]);

  useEffect(() => {
  
    if(signUpMessageSelector !== '' || reVerifyMessageSelector !== '' || logOutMessageSelector !== '' || reVerifyMessage != '' || reVerifyMessageSelector !== '') {

      // clear timer and close modalAlert window
      const alertHandler = () => {

        clearTimeout(timout);

        dispatch(changeSingIn({operation: 'clearMessage', data: ''}));
        dispatch(changeSingUp({operation: 'clearMessage', data: ''}));
        dispatch(changeLogout({operation: 'clearMessage', data: ''}));
        dispatch(changeReVerify({operation: 'clearMessage', data: ''}));

        setReVerifyMessage('');

      };

      // start timer and open modalAlert window
      const timout = window.setTimeout(alertHandler, 3000);

    };
    
  },[signUpMessageSelector, logOutMessageSelector, reVerifyMessage, reVerifyMessageSelector]);

  const errorMessagesTrans = (data: string) => { 

    let message = '';

    switch(data) {

      case 'company':
        languageSelector === 'En' ? message = 'Invalid company name': message = 'Невірний формат назви компанії';
      break;

      case 'companyReq':
        languageSelector === 'En' ? message = 'Company field is required': message = 'Зазначте назву компанії';
      break;

      case 'nameReq':
        languageSelector === 'En' ? message = 'Name field is required': message = "Ім'я обов'язкове";
      break;

      case 'email':
        languageSelector === 'En' ? message = 'Invalid email': message = 'Невірний формат пошти';
      break;

      case 'emailReq':
        languageSelector === 'En' ? message = 'Email field is required': message = "Пошта обов'язкова";
      break;

      case 'passport':
        languageSelector === 'En' ? message = 'Must be 8 characters or more': message = "Має бути від 8 символів";
      break;

      case 'passportReq':
        languageSelector === 'En' ? message = 'Password field is required': message = "Пароль обов'язковий";
      break;

      case 'passportRep':
        languageSelector === 'En' ? message = 'Must be 8 characters or more': message = "Має бути від 8 символів";
      break;

      case 'passportRepReq':
        languageSelector === 'En' ? message = 'RepeatPassword field is required': message = "Повторіть пароль";
      break;

      case 'passportMatch':
        languageSelector === 'En' ? message = 'Passwords must match': message = "Паролі мають збігатися";
      break;

      default:
        break;
    }

    return message;
    
  };

  const formik = useFormik({

      //yup stored own validate functions (for email, password...etc)
      validationSchema: Yup.object({
        company: Yup.string()
          .matches(
            /\w{0}[0-9a-zA-Za-яА-Я]/,
            { message: errorMessagesTrans('company')}
          )
          .required(errorMessagesTrans('companyReq')),
        name: Yup.string().required(errorMessagesTrans('nameReq')),
        email: Yup.string()
          .matches(
            /\w{0}[0-9a-zA-Za-яА-Я@-_]+@\w{0}[a-zA-Za-яА-Я]+\.\w{0}[a-zA-Za-яА-Я]/,
            { message: errorMessagesTrans('email')}
          )
          .required(errorMessagesTrans('emailReq')),
        password: Yup.string()
          .min(8, errorMessagesTrans('passport'))
          .required(errorMessagesTrans('passportReq')),
        repeatPassword: Yup.string()
          .min(8, errorMessagesTrans('passportRep'))
          .required(errorMessagesTrans('passportRepReq'))
          .oneOf([Yup.ref('password')], errorMessagesTrans('passportMatch')),
                            // ,null^
      }
    ),

    initialValues: {
      company: '',
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    
    onSubmit: (values, { resetForm }) => {

      if(values.password === values.repeatPassword) {
        dispatch(singUpAPI({
          company: values.company,
          name: values.name,
          email: values.email,
          password: values.password
        }));
      };

      if(isSignUpSelector) resetForm();
      
    },
  });

  const dis = () => {

    let status = false;

    if(formik.errors.company || formik.errors.email || formik.errors.password || formik.errors.repeatPassword) {
      status = true; 
    }

    return status;
  };

  return (
    
    <div className={su.container}>

      <div className={su.formWrapper}>

        <form onSubmit={formik.handleSubmit}>

          <h1 className={su.formTitle}>{'Реєстрація'}</h1>

          {formik.errors.company ? <div className={su.formInfo}><Info/><p>{`${formik.errors.company}`}</p></div> : formik.errors.name ? <div className={su.formInfo}><Info/><p>{`${formik.errors.name}`}</p></div> : formik.errors.email ? <div className={su.formInfo}><Info/><p>{`${formik.errors.email}`}</p></div> : formik.errors.password ? <div className={su.formInfo}><Info/><p>{`${formik.errors.password}`}</p></div> : formik.errors.repeatPassword ? <div className={su.formInfo}><Info/><p>{`${formik.errors.repeatPassword}`}</p></div> : <RoadSign/>}

          <div className={su.itemLabel}> <label htmlFor="company"></label>
            <input
              id="company"
              name="company"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.company}
              placeholder="Company name"
              style={formik.errors.company ? lightModeSelector === 'dark' ?  {backgroundColor: 'rgb(39, 29, 92)', outline: 'solid 1px lightcoral'} : {backgroundColor: 'white', outline: 'solid 1px lightcoral'} 
              : lightModeSelector === 'dark' ?  {backgroundColor: 'rgb(39, 29, 92)', outline: 'none'} : {backgroundColor: 'white', outline: 'none'}}
            />   
          </div> 

          <div className={su.itemLabel}> <label htmlFor="name"></label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder="Your name"
              style={formik.errors.name ? lightModeSelector === 'dark' ?  {backgroundColor: 'rgb(39, 29, 92)', outline: 'solid 1px lightcoral'} : {backgroundColor: 'white', outline: 'solid 1px lightcoral'} 
              : lightModeSelector === 'dark' ?  {backgroundColor: 'rgb(39, 29, 92)', outline: 'none'} : {backgroundColor: 'white', outline: 'none'}}
            />   
          </div>   

          <div className={su.itemLabel}> <label htmlFor="email"></label>

          <input
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Your email"
            style={formik.errors.email ? lightModeSelector === 'dark' ?  {backgroundColor: 'rgb(39, 29, 92)', outline: 'solid 1px lightcoral'} : {backgroundColor: 'white', outline: 'solid 1px lightcoral'} 
              : lightModeSelector === 'dark' ?  {backgroundColor: 'rgb(39, 29, 92)', outline: 'none'} : {backgroundColor: 'white', outline: 'none'}}
          />
          </div>

          <div className={su.passgen}>
            <a onClick={() => window.open("https://dmshko.github.io/password_generator/", '_blank')}>Password generator</a>
            <Pointer/>
          </div>

          <div className={su.itemLabel}> <label htmlFor="password"></label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Password"
            style={formik.errors.password ? lightModeSelector === 'dark' ?  {backgroundColor: 'rgb(39, 29, 92)', outline: 'solid 1px lightcoral'} : {backgroundColor: 'white', outline: 'solid 1px lightcoral'} 
              : lightModeSelector === 'dark' ?  {backgroundColor: 'rgb(39, 29, 92)', outline: 'none'} : {backgroundColor: 'white', outline: 'none'}}
          />
          </div>

          <div className={su.itemLabel}><label htmlFor="repeatPassword"></label>
          <input
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            placeholder="Yes) Again"
            style={formik.errors.repeatPassword ? lightModeSelector === 'dark' ?  {backgroundColor: 'rgb(39, 29, 92)', outline: 'solid 1px lightcoral'} : {backgroundColor: 'white', outline: 'solid 1px lightcoral'} 
              : lightModeSelector === 'dark' ?  {backgroundColor: 'rgb(39, 29, 92)', outline: 'none'} : {backgroundColor: 'white', outline: 'none'}}
          />
          </div>

          <button type="submit" title='SignUp' disabled={dis()} style={dis() ?{backgroundColor: "lightcoral"} : {backgroundColor: "lightgreen"}}><Add/></button>

        </form>

        <p className={su.switch} onClick={() => navigate('/signup')}>{'Увійти'}</p>

      </div>

    </div>
  )
}

export default SignUp