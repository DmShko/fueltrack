import { FC, useState, useEffect } from 'react'

// own dispatch hook
import { useAppDispatch } from "../../app.hooks";

import { changeLightMode } from '../../fuelTrackStore/trackSlice';

//images
import Moon from '../SvgComponents/DayNight/Night';
import Sun from '../SvgComponents/DayNight/Day';

import dn from './DayNight.module.scss';

// types
import { LightModeType } from '../../types/types';

const DayNight: FC = () => {

  const dispatch = useAppDispatch();

  const [ lightMode, setLightMode ] = useState<LightModeType>(LightModeType.light);

  useEffect(() => {
    dispatch(changeLightMode({ data: lightMode}));
  },[lightMode])
  
  return (
    <div className={dn.container} >

        <div className={dn.day} onClick={() => setLightMode(LightModeType.light)} style={lightMode === 'light' ? {boxShadow: 'unset', cursor: 'unset'}: {boxShadow: '1px 0 3px 3px #b2b2b3, -1px -1px 1px 3px #f4f4f5', cursor: 'pointer'}}><Moon/></div>
        <div className={dn.night} onClick={() => setLightMode(LightModeType.dark)} style={lightMode === 'dark' ? {boxShadow: 'unset', cursor: 'unset'}: {boxShadow: '1px 0 3px 3px #b2b2b3, -1px -1px 1px 3px #f4f4f5', cursor: 'pointer'}}><Sun/></div>

    </div>
  )
}

export default DayNight;