import { useEffect, useState } from "react";
import { useFormik } from "formik"; 
import { nanoid } from "nanoid";

import * as Yup from 'yup';

// style
import co from './Callaborator.module.scss'

// APIs
import singUpAPI from "../../API/signUpAPI";
import getCollabsByIdAPI from "../../API/getCollabsByIdAPI";

// types
import { ColabsArea } from "../../types/authTypes"

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../app.hooks"; 

// slices import
import { changeSelected } from '../../fuelTrackStore/getCollabsByIdSlice';

// images
import UserPlus from '../SvgComponents/UserPlus/UserPlus';
import UserMinus from '../SvgComponents/UserMinus/UserMinus';

const Collaborators = () => {

    const dispatch = useAppDispatch();

    //search collaborators
    const [serachCollabs, setSerachCollabs] = useState('');

    const languageSelector = useAppSelector(state => state.ser.language);
    const idSelector = useAppSelector(state => state.signIn.id);
    const companySelector = useAppSelector(state => state.signIn.company);
    const tokenSelector = useAppSelector(state => state.signIn.token);
    const collabsSelector = useAppSelector(state => state.getCollabsById.collabsById);

    const collabsAre = Array.isArray(collabsSelector) && collabsSelector.length !== 0;

    useEffect(() => {

        if(tokenSelector !== '') {
          dispatch(getCollabsByIdAPI({id: idSelector, token: tokenSelector}));
        } 
    
    },[tokenSelector,]);

    const errorMessagesTrans = (data: string) => { 

    let message = '';

    switch(data) {

      case 'colabsBuffer':
        languageSelector === 'En' ? message = 'Please, check the data.': message = 'Будь ласка, перевірте введені данні.';
      break;

      case 'empty':
        languageSelector === 'En' ? message = 'Please, enter data.': message = 'Будь ласка, введіть дані.';
      break;

      default:
        break;
    }

    return message;
    
    };

    const colabsBufferSeparate = (pack: string) => {

        const backPack: ColabsArea[] = [];
        const packSeparate: string[] = pack.split(' ');
   
        for(const index in packSeparate){
    
            // check, if password = repeat password
            if(packSeparate[index].split('_')[2] === packSeparate[index].split('_')[3]) {

                
                backPack.push({
                    //!!!The input sequence in the field 'textarea' must be clear: 
                    // Mail_Name_Password_Repeat password then a space character and the same for the second user - <@_@_@_@ @_@_@_@>!!!.
                    name: packSeparate[index].split('_')[1],
                    email: packSeparate[index].split('_')[0],
                    password: packSeparate[index].split('_')[2],
                
                });
            } else console.log('Passwords are different')
        }
  
        return backPack

    }

    const colaboratesFIFO = async (letsArg: ColabsArea) => {

            await dispatch(singUpAPI({
              company: companySelector,
              name: letsArg.name,
              email: letsArg.email,
              password: letsArg.password,
              bossId: idSelector,
            }));
    };

    const formik = useFormik({
    
          //yup stored own validate functions (for email, password...etc)
          //base on: /^[a-zA-Z0-9._%+-]+_[a-zA-Z0-9]+_[a-zA-Z0-9+_[a-zA-Z0-9+(\s[a-zA-Z0-9._%+-]+_[a-zA-Z0-9]+_[a-zA-Z0-9+_[a-zA-Z0-9+)*$/ by AI

          validationSchema: Yup.object({
            colabsBuffer: Yup.string()
              .matches(
                /^w{0}[0-9a-zA-Za-яА-Я@-_-.]+@\w{0}[a-zA-Za-яА-Я]+\.\w{0}[a-zA-Za-яА-Я]+_[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9]+(\sw{0}[0-9a-zA-Za-яА-Я@-_-.]+@\w{0}[a-zA-Za-яА-Я]+\.\w{0}[a-zA-Za-яА-Я]+_[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9]+)*$/,
                { message: errorMessagesTrans('colabsBuffer') }
              ).required(errorMessagesTrans('empty') ),
          }
        ),
    
        initialValues: {
          colabsBuffer: '',
        },
        
        onSubmit: (values, { resetForm }) => {

           const backPack = colabsBufferSeparate(values.colabsBuffer);
             console.log(formik.errors.colabsBuffer);
           if(backPack.length !== 0) {
                for(const col in backPack) {
                        colaboratesFIFO(backPack[col]);
                } 
            }else console.log('Please check the data. It seems one of the passwords is incorrect.')
    
        resetForm();
          
        },
      });

    const writeSearchCollabs = (evt: React.ChangeEvent<HTMLInputElement>) => {
      setSerachCollabs(state => state = evt.target.value)
    };

    const toggleCollabDetail = (evt: React.MouseEvent<HTMLLIElement>) => {

      // find 'selected' value of current collabs
      const curentSelected = collabsSelector.find(element => element._id === evt.currentTarget.id)?.selected;

      dispatch(changeSelected({mode:'setSel', data: {id: evt.currentTarget.id, value: !curentSelected}}));
    };

  return (

    <div className={co.container}>
        <div className={co.mustOperations}>
          <div className={co.buttonsSet}>
              <li className={co.item}>
                  <button><UserMinus width={'30px'} height={'30px'}/></button>
                  <button><UserPlus width={'30px'} height={'30px'}/></button>
              </li>
          </div>

          <form className={co.form} onSubmit={formik.handleSubmit}>
              <div>
                  <textarea className={co.newCollabsField}
                      id="colaborate"
                      name="colabsBuffer"
                      onChange={formik.handleChange}
                      value={formik.values.colabsBuffer}
                      placeholder="Colaborator's: email_name_password_repeatpassword email_..."></textarea>
              </div>
              <button type="submit" title='Go' disabled={formik.errors.colabsBuffer === '' ? true : false}>Go</button>
          </form>

          <p className={co.errorsMessages}>{formik.errors.colabsBuffer !== undefined ? `${formik.errors.colabsBuffer}` : ''}</p>

          <input
              className={co.search}
              id="search"
              name="colabsSearch"
              onChange={writeSearchCollabs}
              value={serachCollabs}
              placeholder="Search"
          ></input>
        
          </div>

        <div className={co.collabs}>

          { collabsAre && collabsSelector.map(element => {
            return element.name.toLocaleLowerCase().includes(serachCollabs) || element.email.toLocaleLowerCase().includes(serachCollabs) ?
                  <li className={co.item} id={element._id} key = {nanoid()} onClick={toggleCollabDetail}>
                      <div className={co.userData}>
                        <p className={co.name} style={element.verify ? {color: "black"}: {color: "lightgray"}}>{`${element.name}`}</p>
                        <p className={co.adress} style={element.verify ? {color: "black"}: {color: "lightgray"}}>{`${element.email}`}</p>
                      </div >
                      {collabsSelector.find(value => value._id === element._id)?.selected && <div className={co.userDetails}>
                        <p>Details</p>
                      </div>}
                  </li> : ''
          })}
        </div>
       
    </div>
  )
}

export default Collaborators