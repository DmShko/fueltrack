import { useState, useEffect, } from "react";  

import { useNavigate  } from 'react-router-dom';  

import { useFormik } from "formik"; 
import * as Yup from 'yup';

// style
import si from './SignInPackage.module.scss'

// import singInAPI from "../../API/signInAPI";

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../app.hooks"; 

// images
// import Mail from "../SvgComponents/Courses/Mail";
// import Lock from "../SvgComponents/Courses/Lock";
// import Horn from '../SvgComponents/Courses/Modal/Horn'; 
// import Loading from '../SvgComponents/Courses/Loading/Loading';

const SignIn = () => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  // const tokenSelector = useAppSelector(state => state.signIn.token);

  // open/close alert modal window
  const [alertModalToggle, setAlertModalToggle] = useState(false);

  // useEffect(() => {
  
  //   if(isLogInSelector) {

  //     navigate('/courses');
  //     dispatch(changeSingIn({operation: 'changeIsLogIn', data: false}));

  //   }; 
   
  // },[isLogInSelector]);

  // useEffect(() => {
  
  //   if(tokenSelector !== '') dispatch(changeLogout({operation: 'changeIsLogout', data: false}));
   
  // },[tokenSelector]);

  // useEffect(() => {
  
  //   if(isLogOutSelector) dispatch(changeSingIn({operation: 'clearToken', data: ''}));
    
  // },[isLogOutSelector]);

  // useEffect(() => {
  
  //   if(signInMessageSelector !== '' || logOutMessageSelector !== '') {

  //     setAlertModalToggle(true);

  //     // clear timer and close modalAlert window
  //     const alertHandler = () => {

  //       // close modalAlert window 
  //       setAlertModalToggle(false);

  //       clearTimeout(timout);

  //       dispatch(changeSingUp({operation: 'clearMessage', data: ''}));
  //       dispatch(changeSingIn({operation: 'clearMessage', data: ''}));
  //       dispatch(changeLogout({operation: 'clearMessage', data: ''}));

  //     };

  //     // start timer and open modalAlert window
  //     const timout = window.setTimeout(alertHandler, 3000);

  //   };
    
  // },[signInMessageSelector, logOutMessageSelector]);

  // const errorMessagesTrans = (data: string) => { 

  //   let message = '';

  //   switch(data) {

  //     case 'email':
  //       languageSelector === 'En' ? message = 'Invalid email' : message = 'Невірний формат пошти';
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
        // .required(errorMessagesTrans('emailReq')),
      password: Yup.string()
        // .min(8, errorMessagesTrans('passport'))
        // .required(errorMessagesTrans('passportReq')),
      }
    ),
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values, { resetForm }) => {
      // dispatch(singInAPI({
      //   email: values.email,
      //   password: values.password
      // }));

      // if(isLogInSelector) resetForm();

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

          <h1 className={si.formTitle}>{'Вхід'}</h1>

          <p className={si.formTitle}>{'Будь ласка, заповніть поля нижче для входу в особистий кабінет'}</p>   

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

          <button type="submit" className={si.courseButton} title='SignIn'>{'Увійти'}</button>

        </form>

        <p className={si.switch} onClick={() => navigate('/signup')}>{'Створити'}</p>

      </div>

    </div>
  )
}

export default SignIn