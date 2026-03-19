import { FC, PropsWithChildren, } from "react";

import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";

// types import
import { BurgerModalPropsTypes } from '../../../types/types.ts'

// own dispatch hook
import { useAppSelector } from "../../../app.hooks"; 

import OpenSpace from '../../SvgComponents/OpenSpace/OpenSpace';

// styles
import bm from './BurgerMenu.module.scss'

const BurgerMenu: FC<PropsWithChildren<BurgerModalPropsTypes>> = ({ logout }) => {

  const tokenSelector = useAppSelector(state => state.signIn.token);

  return (
    <div>

        <ul className={bm.navList}>
                {tokenSelector && <li className={bm.navItem} style={location.pathname === '/tracks' ? {color: 'white', borderColor: 'gray'} : {color: 'white'}}>
                  <NavLink to={"/tracks"} style={{color: 'white'}}>tracks</NavLink>
                </li>}
                <li className={bm.navItem} style={location.pathname === '/information' ? {color: 'white', borderColor: 'gray'} : {color: 'white'}}>
                  <NavLink to={"/information"} style={{color: 'white'}}>information</NavLink>
                </li>
        </ul>

        {!tokenSelector && <ul className={bm.navList}>
                <li className={bm.navItem} style={location.pathname === '/signIn' ? {color: 'white', borderColor: 'gray'} : {color: 'white'}}>
                  <NavLink to={"/signIn"} style={{color: 'white'}}>signIn</NavLink>
                </li>
                <li className={bm.navItem} style={location.pathname === '/signUp' ? {color: 'white', borderColor: 'gray'} : {color: 'white'}}>
                  <NavLink to={"/signUp"} style={{color: 'white'}}>signUp</NavLink>
                </li>
        </ul>}

        {tokenSelector && <button className={bm.out} type="button" onClick={() => logout}><OpenSpace width={'40px'} height={'40px'} fill="white"/></button>
        }
       
    </div>
  )
}

export default BurgerMenu