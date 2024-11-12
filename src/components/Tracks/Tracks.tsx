import { FC, useState } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import tr from './Tracks.module.scss';

// own dispatch hook
import { useAppSelector } from "../../app.hooks"; 

// images
import Rest from '../SvgComponents/Rest/Rest';
import Wallet from '../SvgComponents/Wallet/Wallet';
import GasStation from '../SvgComponents/GasStation/GasStation';
import Card from '../SvgComponents/Card/Card';
import Distance from '../SvgComponents/Distance/Distance';
import Mark from '../SvgComponents/Mark/Mark';

import { nanoid } from 'nanoid';

// calendar types
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Tracks: FC = () => {

  const [value, onChange] = useState<Value>(new Date());
  const [toggleMenu, setToggleMenu] = useState(true);

  const tracksSelector = useAppSelector(state => state.ser.fuelDays)

  const changeStatisticMenu = (evt: React.MouseEvent<HTMLElement>) => {
    if (evt.target as HTMLButtonElement === evt.currentTarget as HTMLButtonElement) setToggleMenu(state => !state)
  }
 
  return (

    <div className={tr.container}>

      <div className={tr.toggleStatictic}>
        <button onClick={changeStatisticMenu}>{toggleMenu === true ? 'Others' : 'My'}</button>
      </div>

      <div className={tr.currentStatistic}>
        <Calendar className={tr.calendar} maxDate={new Date} showNeighboringMonth={false} onChange={onChange} value={value}/>
        
        <div className={tr.monthStatistic}>

          <div className={tr.dashboard}>
            <button style={{backgroundColor: 'lightgreen'}}>New</button>
            <button style={{backgroundColor: '#ffea2d'}}>Change</button>
            <button style={{backgroundColor: 'lightcoral'}}>Delete</button>
          </div>

          <ul className={tr.list}>
            { tracksSelector.length != 0 ?

              tracksSelector.map(element => {
              
                return <li className={tr.item} id={nanoid()}  key={element.id}></li>

            }): 'no tracks'}
          </ul>

          <div className={tr.parameter}><GasStation/><p>L</p></div>
          <div className={tr.parameter}><Distance/><p>KM</p></div>
          <div className={tr.parameter}><Mark/></div>
          <div className={tr.parameter}><Rest/><p>L</p></div>
          <div className={tr.parameter}><Wallet/><p>$</p></div>
          <div className={tr.parameter}><Card/><p>$</p></div>

        </div>
      </div>  

    </div>
  )
};

export default Tracks;