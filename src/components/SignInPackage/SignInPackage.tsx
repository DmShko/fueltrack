import { useState, useEffect, } from "react";  

import { useNavigate  } from 'react-router-dom';  

import { useFormik } from "formik"; 

import * as Yup from 'yup';

// style
import si from './SignInPackage.module.scss';

import singInAPI from "../../API/signInAPI";

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../app.hooks"; 

import { changeSingIn } from '../../fuelTrackStore/signInSlice'; 
import { changeSingUp } from "../../fuelTrackStore/signUpSlice";  
import { changeLogout } from "../../fuelTrackStore/logOutSlice"; 

// images
import Info from '../SvgComponents/Info/Info';
import Enter from '../SvgComponents/Enter/Enter';
import RoadSign from '../SvgComponents/RoadSign/RoadSign';
// import Mail from "../SvgComponents/Courses/Mail";
// import Lock from "../SvgComponents/Courses/Lock";
// import Horn from '../SvgComponents/Courses/Modal/Horn'; 
// import Loading from '../SvgComponents/Courses/Loading/Loading';

const SignIn = () => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const logOutMessageSelector = useAppSelector(state => state.logOut.message);
  const signInMessageSelector = useAppSelector(state => state.signIn.message);
  const isSignInSelector = useAppSelector(state => state.signIn.isLogIn);
  const lightModeSelector = useAppSelector(state => state.ser.lightMode);
  const isLogOutSelector = useAppSelector(state => state.logOut.isLogout);
  const languageSelector = useAppSelector(state => state.ser.language);

  // open/close alert modal window
  const [alertModalToggle, setAlertModalToggle] = useState(false);

  useEffect(() => {
  
    if(isSignInSelector) {

      navigate('/tracks');
      dispatch(changeSingIn({operation: 'changeIsLogIn', data: false}));

    }; 
   
  },[isSignInSelector]);

  useEffect(() => {
  
    if(isLogOutSelector) dispatch(changeSingIn({operation: 'clearToken', data: ''}));
    
  },[isLogOutSelector]);

  useEffect(() => {
  
    if(signInMessageSelector !== '' || logOutMessageSelector !== '') {

      setAlertModalToggle(true);

      // clear timer and close modalAlert window
      const alertHandler = () => {

        // close modalAlert window 
        setAlertModalToggle(false);

        clearTimeout(timout);

        dispatch(changeSingUp({operation: 'clearMessage', data: ''}));
        dispatch(changeSingIn({operation: 'clearMessage', data: ''}));
        dispatch(changeLogout({operation: 'clearMessage', data: ''}));

      };

      // start timer and open modalAlert window
      const timout = window.setTimeout(alertHandler, 3000);

    };
    
  },[signInMessageSelector, logOutMessageSelector]);

  const errorMessagesTrans = (data: string) => { 

    let message = '';

    switch(data) {

      case 'email':
        languageSelector === 'En' ? message = 'Invalid email' : message = 'Невірний формат пошти';
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

      default:
        break;
    }

    return message;
    
  };

  const formik = useFormik({

    //yup stored own validate functions (for email, password...etc)
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /\w{0}[0-9a-zA-Za-яА-Я@-_]+@\w{0}[a-zA-Za-яА-Я]+\.\w{0}[a-zA-Za-яА-Я]/,
          { message: errorMessagesTrans('email')}
        )
        .required(errorMessagesTrans('emailReq')),
      password: Yup.string()
        .min(8, errorMessagesTrans('passport'))
        .required(errorMessagesTrans('passportReq')),
      }
    ),
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(singInAPI({
        email: values.email,
        password: values.password
      }));

      if(isSignInSelector) resetForm();

    },
  });

  const dis = () => {

    let status = false;

    if(formik.errors.email || formik.errors.password) {
      status = true; 
    }

    return status;
  };

  return (
    
    <div className={si.container}>

      <div className={si.formWrapper}>

        <form onSubmit={formik.handleSubmit}>

          <h1 className={si.formTitle}>{'Вхід'}</h1>

          {formik.errors.email ? <div className={si.formInfo}><Info/><p>{`${formik.errors.email}`}</p></div> : formik.errors.password ? <div className={si.formInfo}><Info/><p>{`${formik.errors.password}`}</p></div> : <RoadSign/>}

          <div className={si.itemLabel}> <label htmlFor="email"></label>

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

          <div className={si.itemLabel}> <label htmlFor="password"></label>
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

          <button type="submit" className={si.courseButton} title='SignIn' disabled={dis()} style={dis() ?{backgroundColor: "lightcoral"} : {backgroundColor: "lightgreen"}}><Enter/></button>

        </form>

        <p className={si.switch} onClick={() => navigate('/signup')}>{'Створити'}</p>

      </div>

    </div>
  )
}

export default SignIn