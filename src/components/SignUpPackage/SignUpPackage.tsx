import { useState, useEffect, } from "react";  

import { useNavigate  } from 'react-router-dom';  

import { useFormik } from "formik"; 
import * as Yup from 'yup';

// style
import si from './SignUpPackage.module.scss'

import singUpAPI from "../../API/signUpAPI";

import { changeSingIn } from "../../fuelTrackStore/signInSlice"; 
import { changeSingUp } from "../../fuelTrackStore/signUpSlice";  
import { changeLogout } from "../../fuelTrackStore/logOutSlice"; 
import { changeReVerify } from "../../fuelTrackStore/reVerifySlice";

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../app.hooks"; 

// images
// import Mail from "../SvgComponents/Courses/Mail";
// import Lock from "../SvgComponents/Courses/Lock";
// import Horn from '../SvgComponents/Courses/Modal/Horn'; 
// import Loading from '../SvgComponents/Courses/Loading/Loading';

const SignUp = () => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isSignUpSelector = useAppSelector(state => state.signUp.isSignUp);
  const signUpMessageSelector = useAppSelector(state => state.signUp.message);
  const logOutMessageSelector = useAppSelector(state => state.logOut.message);
  const isLogOutSelector = useAppSelector(state => state.logOut.isLogout);
  const reVerifyMessageSelector = useAppSelector(state => state.reVerify.message);

  const [reVerifyMessage, setReVerifyMessage] = useState('');

  useEffect(() => {
  
    if(isLogOutSelector) dispatch(changeSingIn({operation: 'clearToken', data: ''}));
    
  },[isLogOutSelector]);

  useEffect(() => {
  
    if(signUpMessageSelector !== '' || reVerifyMessageSelector !== '' || logOutMessageSelector !== '' || reVerifyMessage != '' || reVerifyMessageSelector !== '') {

      // setAlertModalToggle(true);

      // clear timer and close modalAlert window
      const alertHandler = () => {

        // close modalAlert window 
        // setAlertModalToggle(false);

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

  // const errorMessagesTrans = (data: string) => { 

  //   let message = '';

  //   switch(data) {

  //     case 'email':
  //       languageSelector === 'En' ? message = 'Invalid email': message = 'Невірний формат пошти';
  //     break;

  //     case 'emailReq':
  //       languageSelector === 'En' ? message = 'Email field is required': message = "Пошта обов'язкова";
  //     break;

  //     case 'passport':
  //       languageSelector === 'En' ? message = 'Must be 8 characters or more': message = "Має бути від 8 символів";
  //     break;

  //     case 'passportReq':
  //       languageSelector === 'En' ? message = 'Password field is required': message = "Пароль обов'язковий";
  //     break;

  //     case 'passportRep':
  //       languageSelector === 'En' ? message = 'Must be 8 characters or more': message = "Має бути від 8 символів";
  //     break;

  //     case 'passportRepReq':
  //       languageSelector === 'En' ? message = 'RepeatPassword field is required': message = "Повторіть пароль";
  //     break;

  //     case 'passportMatch':
  //       languageSelector === 'En' ? message = 'Passwords must match': message = "Паролі мають збігатися";
  //     break;

  //     default:
  //       break;
  //   }

  //   return message;
    
  // };

  const formik = useFormik({

      //yup stored own validate functions (for email, password...etc)
      validationSchema: Yup.object({
        email: Yup.string()
          .matches(
            /\w{0}[0-9a-zA-Za-яА-Я@-_]+@\w{0}[a-zA-Za-яА-Я]+\.\w{0}[a-zA-Za-яА-Я]/,
            // { message: errorMessagesTrans('email')}
          ),
          // .required(errorMessagesTrans('emailReq'))
        password: Yup.string(),
          // .min(8, errorMessagesTrans('passport'))
          // .required(errorMessagesTrans('passportReq')),
        repeatPassword: Yup.string()
          // .min(8, errorMessagesTrans('passportRep'))
          // .required(errorMessagesTrans('passportRepReq'))
          // .oneOf([Yup.ref('password')], errorMessagesTrans('passportMatch')),
                            // ,null^
      }
    ),

    initialValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    onSubmit: (values, { resetForm }) => {

      if(values.password === values.repeatPassword) {
        dispatch(singUpAPI({
          name: values.name,
          email: values.email,
          password: values.password
        }));
      };

      if(isSignUpSelector) resetForm();
      
    },
  });

  return (
    
    <div className={si.container}>

      <div className={si.formWrapper}>

        <form onSubmit={formik.handleSubmit}>

          <div className={si.messageContainer} style={formik.errors.email || formik.errors.password ? {width: '230px', } : {width: '0'}}>

            <div className={si.curtain}>

              {/* <p>{formik.errors.email ? formik.errors.email : formik.errors.password ? formik.errors.password : signInMessageSelector}</p> */}

            </div>

          </div>

          <h1 className={si.formTitle}>{'Реєстрація'}</h1>

          <p className={si.formTitle}>{'Будь ласка, заповніть поля нижче для реєстрації'}</p>

          <div className={si.itemLabel}> <label htmlFor="name"></label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              // style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)'} : {backgroundColor: 'white'}}
            />   
          </div>   

          <div className={si.itemLabel}> <label htmlFor="email"></label>

          <input
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            // style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)'} : {backgroundColor: 'white'}}
          />
          </div>

          <div className={si.itemLabel}> <label htmlFor="password"></label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            // style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)'} : {backgroundColor: 'white'}}
          />
          </div>

          <div className={si.itemLabel}><label htmlFor="repeatPassword"></label>
          <input
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            // style={lightModeSelector === 'dark' ? {backgroundColor: 'rgb(39, 29, 92)'} : {backgroundColor: 'white'}}
          />
          </div>

          <button type="submit" className={si.courseButton} title='SignIn'>{'Створити'}</button>

        </form>

        <p className={si.switch} onClick={() => navigate('/signup')}>{'Створити'}</p>

      </div>

    </div>
  )
}

export default SignUp