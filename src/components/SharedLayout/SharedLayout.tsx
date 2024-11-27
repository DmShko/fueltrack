import { FC, useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Suspense } from "react";

import sh from './SharedLayout.module.scss';

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../app.hooks"; 

import logoutAPI from "../../API/logOutAPI";

import { changeLogout } from '../../fuelTrackStore/logOutSlice';
import { changeSingIn }  from '../../fuelTrackStore/signInSlice'; 

import DayNight  from '../DayNight/DayNight';

// images
import BallOfWool from '../SvgComponents/Logo/BallOfWool';

// types
import { NewDateType } from '../../types/types'

const SharedLayout: FC = () => {

    const tokenSelector = useAppSelector(state => state.signIn.token);
    const isLogOutSelector = useAppSelector(state => state.logOut.isLogout);

    const dispatch = useAppDispatch();
  
    const [ timeValue, setTimeValue ]= useState({time: new Date()});
    const [ newDateObj, setNewDateObj ]= useState<NewDateType>();

    useEffect(() => {
  
      if(tokenSelector !== '') dispatch(changeLogout({operation: 'changeIsLogout', data: false}));
     
    },[tokenSelector]);
  
    useEffect(() => {
    
      if(isLogOutSelector) {
        dispatch(changeSingIn({operation: 'clearToken', data: ''}));
        dispatch(changeSingIn({operation: 'changeIsLogIn', data: false}));
      }
      
    },[isLogOutSelector]);

    useEffect(() => {

      const tick = () => {

        setTimeValue({
          time: new Date()
        });
        
        const dateHours =  timeValue.time.getHours().toString().length === 1 ? "0" +  timeValue.time.getHours().toString() :  timeValue.time.getHours().toString();
        const dateMinutes =  timeValue.time.getMinutes().toString().length === 1 ? "0" +  timeValue.time.getMinutes().toString() : timeValue.time.getMinutes().toString();
        const dateSeconds =  timeValue.time.getSeconds().toString().length === 1 ? "0" +  timeValue.time.getSeconds().toString() : timeValue.time.getSeconds().toString();
        // get date
        const dateDay =  timeValue.time.getDate().toString().length === 1 ? "0" +  timeValue.time.getDate().toString() :  timeValue.time.getDate().toString();
        const dateMonth =  timeValue.time.getMonth().toString().length === 1 ? "0" + (timeValue.time.getMonth() + 1).toString() : (timeValue.time.getMonth() + 1).toString();
        
        const timedata = dateHours + ":" + dateMinutes;
        const datedata = dateDay + "." + dateMonth;
        const yeardata =  timeValue.time.getFullYear();
  
        setNewDateObj({ timedata, datedata, yeardata, dateSeconds });
        
        // save day if he different
        // if(datedata !== selectorGallSlice.date) dispatch(change({ operation: 'changeDate', data: datedata }));
  
      };

        let timerID = setTimeout(
            () => tick(),
            1000
        );

        return () => {
            clearTimeout(timerID);
        };
       
    },[newDateObj]);

    const logout = () => {
      dispatch(logoutAPI({token: tokenSelector,}));
    };

    return (
        <>
          <header className={sh.header}>

            <div className={sh.container}>
              <NavLink to="/"><div className={sh.logo}><p className={sh.logoLeft}>Fuel</p><p className={sh.logoRight}>Track</p><BallOfWool /></div></NavLink>
              <ul className={sh.navList}>
                <li className={sh.navItem}>
                  <NavLink to={"/tracks"} style={{color: 'white'}}>tracks</NavLink>
                </li>
                <li className={sh.navItem}>
                  <NavLink to={"/information"} style={{color: 'white'}}>information</NavLink>
                </li>
              </ul>

              <div className={sh.time}><p className={sh.today}>{'Today'}</p><p>{newDateObj !== undefined ? `${newDateObj.datedata}.${newDateObj.yeardata} ${newDateObj?.timedata}:${newDateObj.dateSeconds}`: ''}</p></div>
              <DayNight/>
              {!tokenSelector && <ul className={sh.navList}>
                <li className={sh.navItem}>
                  <NavLink to={"/signIn"} style={{color: 'white'}}>signIn</NavLink>
                </li>
                <li className={sh.navItem}>
                  <NavLink to={"/signUp"} style={{color: 'white'}}>signUp</NavLink>
                </li>
              </ul> 
              }

              {tokenSelector && <button className={sh.out} type="button" onClick={logout}>Вийти</button>
              }
            </div>
          </header>
    
          <main>
            <Suspense fallback={"..loading"}>
              <Outlet />
            </Suspense>
          </main>
    
          <footer>
    
          </footer>
    
        </>
      );
    };
    
export default SharedLayout;