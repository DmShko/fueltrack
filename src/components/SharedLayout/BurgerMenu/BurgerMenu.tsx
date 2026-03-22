import { FC, PropsWithChildren, } from "react";

import { NavLink } from "react-router-dom";

// types import
import { BurgerModalPropsTypes } from '../../../types/types.ts'

// own dispatch hook
import { useAppSelector } from "../../../app.hooks"; 

import OpenSpace from '../../SvgComponents/OpenSpace/OpenSpace';

// images
import Arrow from '../../SvgComponents/Arrow/Arrow';

// styles
import bm from './BurgerMenu.module.scss'

const BurgerMenu: FC<PropsWithChildren<BurgerModalPropsTypes>> = ({ openClose, logout }) => {

  const tokenSelector = useAppSelector(state => state.signIn.token);

  const closeMenu = () => {

    logout();
    openClose();

  };

  return (

    <div className={bm.container}>

        {tokenSelector && <ul className={bm.navList}>
               <ul className={bm.navList}>
                {tokenSelector && <li className={bm.navItem} style={location.pathname === '/tracks' ? {color: 'white', borderColor: 'gray'} : {color: 'white'}}>
                  <NavLink to={"/tracks"} style={{color: 'white'}}>tracks</NavLink>
                </li>}
                <li className={bm.navItem} style={location.pathname === '/information' ? {color: 'white', borderColor: 'gray'} : {color: 'white'}}>
                  <NavLink to={"/information"} style={{color: 'white'}}>information</NavLink>
                </li>
              </ul>
        </ul>}

        <h1 className={bm.outTitle}>Exit</h1>
        <Arrow width='20px' height='20px'/>
        {tokenSelector && <button className={bm.out} type="button" onClick={() => closeMenu()}><OpenSpace width={'40px'} height={'40px'} fill="white"/></button>
        }
       
    </div>
  )
}

export default BurgerMenu