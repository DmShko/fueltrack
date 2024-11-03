import { FC, useState } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import tr from './Tracks.module.scss';

// calendar types
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Tracks: FC = () => {

  const [value, onChange] = useState<Value>(new Date());
  const [toggleMenu, setToggleMenu] = useState(true);

  const changeStatisticMenu = (evt: React.MouseEvent<HTMLElement>) => {
    if (evt.target as HTMLButtonElement === evt.currentTarget as HTMLButtonElement) setToggleMenu(state => !state)
  }
 
  return (

    <div className={tr.container}>

      <div className={tr.toggleStatictic}>
        <button onClick={changeStatisticMenu}>{toggleMenu === true ? 'Others' : 'My'}</button>
      </div>

      <div className={tr.monthStatistic}>
        <p>Fuel</p>
        <p>Km/month</p>
        <p>Liters/month</p>
      </div>

      <div className={tr.currentStatistic}>
        <Calendar className={tr.calendar} maxDate={new Date} showNeighboringMonth={false} onChange={onChange} value={value}/>
        <div className={tr.dayStatistic}>
          <p>Km/day</p>
          <p>Liters/day</p>
        </div>
      </div>  

    </div>
  )
}

export default Tracks;