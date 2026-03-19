import React, { useEffect, useState } from "react";
import { useFormik } from "formik"; 
import { nanoid } from "nanoid";

import * as Yup from 'yup';

// style
import co from './Callaborator.module.scss'

// APIs
import singUpAPI from "../../API/signUpAPI";
import getCollabsByIdAPI from "../../API/getCollabsByIdAPI";
import getTracksCollabAPI from '../../API/getTracksCollabAPI';
import deleteCollabAPI from '../../API/deleteCollabAPI';

// types
import { ColabsArea } from '../../types/authTypes';
import { Track, Collab } from "../../types/types";
import { PayType,} from '../../types/types';

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../app.hooks"; 

// slices import
import { changeSelected } from '../../fuelTrackStore/getCollabsByIdSlice';
import { changeSelectedCollabDay } from '../../fuelTrackStore/getTracksCollabSlice';
import { changeSingUp } from '../../fuelTrackStore/signUpSlice.ts';

// modals windows
import TrackModal from "../TrackModal/TrackModal";
import InfoModal from "../InfoModal/InfoModal";
import ErrorModal from "../ErrorModal/ErrorModal";

// images
import UserPlus from '../SvgComponents/UserPlus/UserPlus';
import UserMinus from '../SvgComponents/UserMinus/UserMinus';
import UsersSearch from '../SvgComponents/UsersSearch/UsersSearch';
import UserSearch from '../SvgComponents/UserSearch/UserSearch';
import UserCatch from '../SvgComponents/UserCatch/UserCatch';
import Online from '../SvgComponents/Online/Online';
import SearchIcon from '../SvgComponents/Telescope/Telescope';

import Rest from '../SvgComponents/Rest/Rest';
import Wallet from '../SvgComponents/Wallet/Wallet';
import GasStation from '../SvgComponents/GasStation/GasStation';
import Card from '../SvgComponents/Card/Card';
import Distance from '../SvgComponents/Distance/Distance';
import Mark from '../SvgComponents/Mark/Mark';
import Burn from '../SvgComponents/Burn/Burn';
import Loader from '../SvgComponents/Loader/Loader';
import Users from '../SvgComponents/Users/Users.tsx';
import Clock from '../SvgComponents/Clock/Clock.tsx';


const Collaborators = () => {

    const dispatch = useAppDispatch();

    //search collaborators
    const [serachCollabs, setSerachCollabs] = useState('');

    // open/close modal window
    const [modalToggle, setModalToggle] = useState(false);
    const [buttonClickName, setButtonClickName ]= useState('');

    const languageSelector = useAppSelector(state => state.ser.language);
    const idSelector = useAppSelector(state => state.signIn.id);
    const companySelector = useAppSelector(state => state.signIn.company);
    const tokenSelector = useAppSelector(state => state.signIn.token);
    const collabsSelector = useAppSelector(state => state.getCollabsById.collabsById);
    const collabTracksSelector = useAppSelector(state => state.getTracksCollab.fuelCollabDays);
    const collabCurrentDaySelector = useAppSelector(state => state.getTracksCollab.selectedCollabDay);
    const collabIsAddSelector = useAppSelector(state => state.signUp.isSignUp);
    const collabIsDeleted = useAppSelector(state => state.delCollab.isDeleted);

    const collabsAre = Array.isArray(collabsSelector) && collabsSelector.length !== 0;
    const collabTracksAre = Array.isArray(collabTracksSelector) && collabTracksSelector.length !== 0;

    useEffect(() => {

        if(tokenSelector !== '') {
          dispatch(getCollabsByIdAPI({id: idSelector, token: tokenSelector}));
        } 
    
    },[tokenSelector, collabsSelector.length, collabIsAddSelector, collabIsDeleted]);

    useEffect(() => {

        if(tokenSelector !== '' && collabIsAddSelector) {
          setButtonClickName('success');
          setModalToggle(state => !state);
          dispatch(changeSingUp({operation: 'resetIsSignUp', data: ''}));
        } 
    
    },[collabIsAddSelector]);

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
            } else setModalToggle(state => !state);
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
              isCatch: false,
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

                resetForm();

            }else errorMessagesTrans('empty');
    
          
        },
      });

    const writeSearchCollabs = (evt: React.ChangeEvent<HTMLInputElement>) => {
      setSerachCollabs(state => state = evt.target.value)
    };

    const toggleCollabDetail = (evt: React.MouseEvent<HTMLLIElement>) => {

      dispatch(changeSelected({mode:'clearSelAll', data: {id: evt.currentTarget.id, value: false}}));

      // find 'selected' value of current collabs
      const curentSelected = collabsSelector.find(element => element._id === evt.currentTarget.id)?.selected;
     
      dispatch(changeSelected({mode:'setSel', data: {id: evt.currentTarget.id, value: !curentSelected}}));

      // dowloand tracks of selected user
      if(tokenSelector !== '') {
            dispatch(getTracksCollabAPI({token: tokenSelector, owner: evt.currentTarget.id}));
      } 

      dispatch(changeSelectedCollabDay({mode: 'clearDay', data: { id: evt.currentTarget.id, value: {_id: '',
              liters: '',
              marck: '',
              price: '',
              km: '',
              pay: PayType.company,
              burn: '',
              date: '',
              selected: false,}}}));
    };

    const loadDayStatistic = (evt: React.MouseEvent<HTMLLIElement>) => {

      evt.stopPropagation();

      const collabOneDay = collabTracksSelector.find(value => value._id === evt.currentTarget.id);
   
      if(collabOneDay) {
        dispatch(changeSelectedCollabDay({mode: 'freshDay', data: { id: evt.currentTarget.id, value: collabOneDay}}));
      };

      // // dowloand tracks of selected user
      // if(tokenSelector !== '') {
      //       dispatch(getTracksCollabAPI({token: tokenSelector, owner: evt.currentTarget.id}));
      // } 

    };

    const totalCollabStatistic = (data: keyof(Omit<Track, 'pay' | 'selected'>), monthIn: string, marckOfFuel: string, back: number = 0) => {

      for(const all of collabTracksSelector) {
      
        if(monthIn !== undefined && all.date.split(' ')[1] === monthIn.charAt(0).toUpperCase() + monthIn.slice(1).toLowerCase()
        && all.marck === marckOfFuel)
          back += Number(all[data])
      };

      if(back !== 0)
        return back;

    };

    const totalRest = (monthIn: string, marckOfFuel: string) => {

      let backRest = 0

      for(const all of collabTracksSelector) {

        if(monthIn !== undefined && all.date.split(' ')[1] === monthIn.charAt(0).toUpperCase() + monthIn.slice(1).toLowerCase()
        && all.marck === marckOfFuel)
          backRest += Number(all.liters) - Number(all.burn)
      };

      if(backRest !== 0)
        return backRest;

    };

    const catchCollab = () => {

      // find _id collabs whith 'selected' key is true
      const currentId = collabsSelector.find(element => element.selected === true)?._id;

      // find 'isCatch' key value of selected collabs
      const currentIsCatch  = collabsSelector.find(element => element._id === currentId)?.isCatch;
     
      if(currentIsCatch !== undefined) {
        
        if(currentId !== '' && currentId !== undefined)
        
          dispatch(changeSelected({mode:'setIsCatch', data: {id: currentId, value: currentIsCatch}}));
      }
    };

    const catchCollabs = () => {

      var collCounter = 0;

      for(const a in collabsSelector) {

        if(collabsSelector[a].isCatch) collCounter += 1;

      }

      collCounter === collabsSelector.length ? dispatch(changeSelected({mode:'setCatchAll', data: {id: '', value: false}})) : dispatch(changeSelected({mode:'setCatchAll', data: {id: '', value: true}}));

    }; 

    const deleteCollabFIFO = async (data: Collab[]) => {

      for(const c in data) {
        if(data[c].isCatch === true)
          await dispatch(deleteCollabAPI({id: data[c]._id, token: tokenSelector}));
      };

    };

    const deleteCollab = (evt: React.MouseEvent<HTMLButtonElement>) => {

       // toggle modal window
      setModalToggle(state => !state);

      if(evt !== undefined) setButtonClickName(evt.currentTarget.name);

    };

    const getMonthList = () => {

      const actualDate = new Date();

      const currentMonth = new Date(actualDate.getFullYear(), actualDate.getMonth()).toLocaleString('en-US', { month: 'short' });

      const prevMonth = new Date(actualDate.getFullYear(), actualDate.getMonth() - 1).toLocaleString('en-US', { month: 'short' });

      var months = '';

      if(collabTracksSelector.length !== 0 && collabTracksSelector !== undefined) {

        if(collabTracksSelector.find(element => element.date.split(' ')[1] === prevMonth.toString())) {
          months += prevMonth.toLocaleUpperCase() + '/';
        }else (collabTracksSelector.find(element => element.date.split(' ')[1] === currentMonth.toString()));
          months += currentMonth.toString().toLocaleUpperCase();
      };

      return months;

    };

    const sortDate = (inData: Track []) => {

          const sortData = [...inData].sort((a, b) => {
      
            const dateA = a.date.split(' ')[2];
            const dateB = b.date.split(' ')[2];
            
            return dateA.localeCompare(dateB);
          });
          
        return sortData;
    };
    
    const openModal = (evt: React.MouseEvent<HTMLButtonElement>) => {
      // toggle modal window
      setModalToggle(state => !state);
      if(evt !== undefined) setButtonClickName(evt.currentTarget.name);
    
    };

    const modalSelect = () => {

     switch(buttonClickName) {
          case 'userMinus':
            return <ErrorModal openClose={openModal} action={() => deleteCollabFIFO(collabsSelector)} props={{messages: 'Are you sure you want to delete?', buttonName: buttonClickName,}} />
          case 'userPlus':
            return <InfoModal openClose={openModal} props={{messages: 'Passwords do not match!',}} />;
          case 'success':
            return <InfoModal openClose={openModal} props={{messages: 'Employee added successfully)',}} />;
          default:
            break; 
        }
  };

  return (

    <div className={co.container}>

      {modalToggle && <TrackModal openClose={openModal}>
              
          {modalSelect()}

        </TrackModal>
      }

        <div className={co.mustOperations}>
          
          <form className={co.form} onSubmit={formik.handleSubmit}>
              <p className={co.errorsMessages}>{formik.errors.colabsBuffer !== undefined ? `${formik.errors.colabsBuffer}` : ''}</p>
              <textarea className={co.newCollabsField}
                      id="colaborate"
                      name="colabsBuffer"
                      onChange={formik.handleChange}
                      value={formik.values.colabsBuffer}
                      placeholder="Colaborator's: email_name_password_repeatpassword email_..."></textarea>

             
              <button className={co.userPlus} onClick={() => setButtonClickName('userPlus')} name='userPlus' type="submit" title='userPlus' disabled={formik.errors.colabsBuffer === '' ? true : false}><UserPlus width={'20px'} height={'20px'}/></button>
              
          </form>

          <div className={co.buttonsSet}>

            <div className={co.buttons}>

              <SearchIcon width={'35px'} height={'35px'}/>

                <input
                className={co.search}
                id="search"
                name="colabsSearch"
                onChange={writeSearchCollabs}
                value={serachCollabs}
                placeholder="Search"
                ></input>

              <li className={co.item}>
                  
                <button name="userMinus" onClick={deleteCollab} disabled={!collabsSelector.find(value => value.isCatch === true)?.isCatch}><UserMinus width={'20px'} height={'20px'} fill={collabsSelector.find(value => value.isCatch === true)?.isCatch ? '#aab1f8' : 'gray'}/></button>
                <button onClick={catchCollab} disabled={!collabsSelector.find(value => value.selected === true)?.selected}><UserSearch width={'18px'} height={'18px'} fill={collabsSelector.find(value => value.selected === true)?.selected ? '#aab1f8' : 'gray'}/></button>
                <button onClick={catchCollabs}><UsersSearch width={'25px'} height={'25px'}/></button>
                
              </li>  

            </div>

            <p><Users width={'20px'} height={'20px'} /> {`${collabsSelector.length}`} </p>  

          </div>
            
        </div>

        <div className={co.collabs}>
          <ul className={co.collabsList}>
          { collabsAre && collabsSelector.map(element => {
            return element.name.toLocaleLowerCase().includes(serachCollabs) || element.email.toLocaleLowerCase().includes(serachCollabs) ?
                  
                    <li className={co.item} id={element._id} key = {nanoid()} onClick={element.verify === true ? toggleCollabDetail : undefined}>

                      <div className={co.userData} style={element.selected ? {backgroundColor: '#aab1f8'} : {backgroundColor: 'none'}}>
                        <p className={co.name} style={element.verify ? {color: "black"}: {color: "lightgray"}}>{`${element.name}`}
                          {element.isCatch === true && <UserCatch width={'18px'} height={'18px'} style={element.selected ? {fill: 'white'} : {fill: 'gray'}}/>}
                          {element.token !== '' && <Online width={'18px'} height={'18px'}/>}
                          {!element.verify && <Clock width={'18px'} height={'18px'}/>}
                        </p>
                        <p className={co.adress} style={element.verify ? {color: "black"}: {color: "lightgray"}}>{`${element.email}`}</p>
                      </div >

                      {collabsSelector.find(value => value._id === element._id)?.selected && <div className={co.userDetails} >
                        <ul className={co.collabDaysList}>
                         
                            {collabTracksAre ? sortDate(collabTracksSelector).map(element => {
                              return  <li className={co.collabDates} id={element._id} key = {nanoid()} onClick={loadDayStatistic}>
                                        <p className={co.collabDate} style={collabCurrentDaySelector._id === element._id? {backgroundColor: "gray"} : element.date.split(' ')[1].toLocaleUpperCase() === getMonthList().split('/')[0]? {backgroundColor: 'rgba(222, 45, 168, 0.3)'} : {backgroundColor: 'rgba(255, 94, 0, 0.3)'}}>{element.date.split(' ')[2]}</p> 
                                      </li> 
                            }):<Loader className={co.loader} width={'35px'} height={'35px'}/>}
                         
                        </ul>

                        <div className={co.explanation}>

                          <div className={co.explanationGas}>GAS</div>
                          <div className={co.explanationLpg}>LPG</div>
                          <div className={co.explanationDiesel}>DIESEL</div>

                        </div>

                        <div className={co.parameters}>

                          <div className={co.paramsPartDay}>

                              <p>Day</p>
                              <div className={co.paramsRowDay}><div className={co.paramsRowBlock}><GasStation width={'18px'} height={'18px'}/><p>liters</p></div><p>{collabCurrentDaySelector.liters}</p></div>
                              <div className={co.paramsRowDay}><div className={co.paramsRowBlock}><Mark width={'18px'} height={'18px'}/><p>marck</p></div><p>{collabCurrentDaySelector.marck}</p></div>
                              <div className={co.paramsRowDay}><div className={co.paramsRowBlock}><Wallet width={'18px'} height={'18px'}/><p>price</p></div><p>{collabCurrentDaySelector.price}</p></div>
                              <div className={co.paramsRowDay}><div className={co.paramsRowBlock}><Distance width={'18px'} height={'18px'}/><p>km</p></div><p>{collabCurrentDaySelector.km}</p></div>
                              <div className={co.paramsRowDay}><div className={co.paramsRowBlock}><Card width={'18px'} height={'18px'}/><p>pay</p></div><p>{collabCurrentDaySelector.pay}</p></div>
                              <div className={co.paramsRowDay}><div className={co.paramsRowBlock}><Burn width={'18px'} height={'18px'}/><p>burn</p></div><p>{collabCurrentDaySelector.burn}</p></div>
                              <div className={co.paramsRowDay}><div className={co.paramsRowBlock}><Rest width={'18px'} height={'18px'}/><p>rest</p></div><p>{Number(collabCurrentDaySelector.liters) - Number(collabCurrentDaySelector.burn)}</p></div>
                          </div >

                           <div className={co.paramsPartMonth}>
                              <div className={co.monthTitle}>

                                <p> Month </p>
                                <div className={co.oneOfMonth}> <div className={co.firstMonth}>{getMonthList().split('/')[0]}</div> / <div  className={co.secondMonth}>{getMonthList().split('/')[1]}</div></div>

                              </div>
                              
                              <div className={co.paramsRowMonths}> 
                                <div className={co.paramsRowMonth} style={{backgroundColor: 'rgba(222, 45, 168, 0.3)'}}>
                                  <div className={co.gas}>{totalCollabStatistic('liters', getMonthList().split('/')[0], 'GAS')}</div>
                                  <div className={co.lpg}>{totalCollabStatistic('liters', getMonthList().split('/')[0], 'LPG')}</div>
                                  <div className={co.diesel}>{totalCollabStatistic('liters', getMonthList().split('/')[0], 'DIESEL')}</div>
                                </div> 
                                <div className={co.paramsRowMonth} style={{backgroundColor: 'rgba(255, 94, 0, 0.3)'}}>
                                  <div className={co.gas}>{totalCollabStatistic('liters', getMonthList().split('/')[1], 'GAS')}</div>
                                  <div className={co.lpg}>{totalCollabStatistic('liters', getMonthList().split('/')[1], 'LPG')}</div>
                                  <div className={co.diesel}>{totalCollabStatistic('liters', getMonthList().split('/')[1], 'DIESEL')}</div>
                                </div> 
                              </div> 
                              <div className={co.paramsRowMonths}>
                                <div className={co.paramsRowMonth} style={{backgroundColor: 'rgba(222, 45, 168, 0.3)'}}>-</div> 
                                <div className={co.paramsRowMonth} style={{backgroundColor: 'rgba(255, 94, 0, 0.3)'}}>-</div> 
                              </div>
                              <div className={co.paramsRowMonths}>
                                <div className={co.paramsRowMonth} style={{backgroundColor: 'rgba(222, 45, 168, 0.3)'}}>-</div> 
                                <div className={co.paramsRowMonth} style={{backgroundColor: 'rgba(255, 94, 0, 0.3)'}}>-</div> 
                              </div>
                              <div className={co.paramsRowMonths}> 
                                <div className={co.paramsRowMonth} style={{backgroundColor: 'rgba(222, 45, 168, 0.3)'}}>
                                  <div className={co.gas}>{totalCollabStatistic('km', getMonthList().split('/')[0], 'GAS')}</div>
                                  <div className={co.lpg}>{totalCollabStatistic('km', getMonthList().split('/')[0], 'LPG')}</div>
                                  <div className={co.diesel}>{totalCollabStatistic('km', getMonthList().split('/')[0], 'DIESEL')}</div>
                                </div> 
                                <div className={co.paramsRowMonth} style={{backgroundColor: 'rgba(255, 94, 0, 0.3)'}}>
                                  <div className={co.gas}>{totalCollabStatistic('km', getMonthList().split('/')[1], 'GAS')}</div>
                                  <div className={co.lpg}>{totalCollabStatistic('km', getMonthList().split('/')[1], 'LPG')}</div>
                                  <div className={co.diesel}>{totalCollabStatistic('km', getMonthList().split('/')[1], 'DIESEL')}</div>
                                </div> 
                              </div>
                              <div className={co.paramsRowMonths}>
                                <div className={co.paramsRowMonth} style={{backgroundColor: 'rgba(222, 45, 168, 0.3)'}}>-</div> 
                                <div className={co.paramsRowMonth} style={{backgroundColor: 'rgba(255, 94, 0, 0.3)'}}>-</div> 
                              </div>
                              <div className={co.paramsRowMonths}> 
                               <div className={co.paramsRowMonth} style={{backgroundColor: 'rgba(222, 45, 168, 0.3)'}}>
                                  <div className={co.gas}>{totalCollabStatistic('burn', getMonthList().split('/')[0], 'GAS')}</div>
                                  <div className={co.lpg}>{totalCollabStatistic('burn', getMonthList().split('/')[0], 'LPG')}</div>
                                  <div className={co.diesel}>{totalCollabStatistic('burn', getMonthList().split('/')[0], 'DIESEL')}</div>
                                </div> 
                                <div className={co.paramsRowMonth} style={{backgroundColor: 'rgba(255, 94, 0, 0.3)'}}>
                                  <div className={co.gas}>{totalCollabStatistic('burn', getMonthList().split('/')[1], 'GAS')}</div>
                                  <div className={co.lpg}>{totalCollabStatistic('burn', getMonthList().split('/')[1], 'LPG')}</div>
                                  <div className={co.diesel}>{totalCollabStatistic('burn', getMonthList().split('/')[1], 'DIESEL')}</div>
                                </div> 
                              </div>
                              <div className={co.paramsRowMonths}> 
                                <div className={co.paramsRowMonth} style={{color: 'black', fontWeight: '600', backgroundColor: 'rgba(222, 45, 168, 0.3)'}}>
                                  <div className={co.gas}>{totalRest(getMonthList().split('/')[0], 'GAS')}</div>
                                  <div className={co.lpg}>{totalRest(getMonthList().split('/')[0], 'LPG')}</div>
                                  <div className={co.diesel}>{totalRest(getMonthList().split('/')[0], 'DIESEL')}</div>
                                </div> 
                                <div className={co.paramsRowMonth} style={{color: 'black', fontWeight: '600', backgroundColor: 'rgba(255, 94, 0, 0.3)'}}>
                                  <div className={co.gas}>{totalRest(getMonthList().split('/')[1], 'GAS')}</div>
                                  <div className={co.lpg}>{totalRest(getMonthList().split('/')[1], 'LPG')}</div>
                                  <div className={co.diesel}>{totalRest(getMonthList().split('/')[1], 'DIESEL')}</div>
                                </div> 
                              </div>
                          </div>
                           
                        </div>
                      </div>}
                  </li> 
                : ''
          })}
          </ul>
        </div>
       
    </div>
  )
}

export default Collaborators