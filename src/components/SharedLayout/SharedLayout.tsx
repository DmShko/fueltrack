import { FC, useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Suspense } from "react";

import sh from './SharedLayout.module.scss';

// images
import BallOfWool from '../SvgComponents/Logo/BallOfWool';

// types
import { newDateType } from '../../types/types'

const SharedLayout: FC = () => {
  
    const [ timeValue, setTimeValue ]= useState({time: new Date()});
    const [ newDateObj, setNewDateObj ]= useState<newDateType>();

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
              
              <ul className={sh.navList}>
                <li className={sh.navItem}>
                  <NavLink to={"/SignIn"} style={{color: 'white'}}>signIn</NavLink>
                </li>
                <li className={sh.navItem}>
                  <NavLink to={"/SignUp"} style={{color: 'white'}}>signUp</NavLink>
                </li>
              </ul>
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