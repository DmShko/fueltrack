import { FC, useState, useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate  } from "react-router-dom";
import { Suspense } from "react";

import sh from './SharedLayout.module.scss';

const SharedLayout: FC = () => {
    return (
        <>
          <header className={sh.header}>

            <div className={sh.headerContainer}>
              <NavLink to="/" style={{fontSize: '25px', color: 'yellowgreen'}}>FuelTrack</NavLink>
              <ul className={sh.navList}>
                <li className={sh.navItem}>
                  <NavLink to={"/tracks"}>tracks</NavLink>
                </li>
                <li className={sh.navItem}>
                  <NavLink to={"/information"}>information</NavLink>
                </li>
              </ul>
              <ul className={sh.navList}>
                <li className={sh.navItem}>
                  <NavLink to={"/SignIn"}>signIn</NavLink>
                </li>
                <li className={sh.navItem}>
                  <NavLink to={"/SignOut"}>signOut</NavLink>
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