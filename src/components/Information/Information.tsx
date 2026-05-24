import { FC } from 'react';
import HomeImg from '../../images/home.png'
import SingInImg from '../../images/SingIn.png'
import SingUpImg from '../../images/SingUp.png'

// own dispatch hook
import { useAppSelector } from "../../app.hooks"; 

import inf from './Information.module.scss';

const Information: FC = () => {

  const languageSelector = useAppSelector(state => state.ser.language);

  return (
    <div className={inf.container}>
        <div  className={inf.imgBlock}>
          <img src={HomeImg} alt="To home page" width="200" height="200"></img>
          <p>{languageSelector === 'En' ? 'Click on <FuelTrack> to go to the main page': 'Натисни на <FuelTrack>, щоб перейти на головну сторінку'}</p>
        </div>
        <div  className={inf.imgBlock}>
        <img src={SingInImg} alt="To singIn" width="300" height="250"></img>
          <p>{languageSelector === 'En' ? 'The <SingUp> key takes you to the authorization page.If you are not an administrator - you do not need to log in. Wait for the link from the administrator': 'Клавіша <SingUp> переводить до сторінки авторизації. Якщо ти не адміністратор - авторизуватися не треба. Чекай на посилання від адміністратора.'}</p>
        </div>
        <div  className={inf.imgBlock}>
          <img src={SingUpImg} alt="To singUp" width="200" height="250"></img>
          <p>{languageSelector === 'En' ? 'The <SingIn> key takes you to the registration page.': 'Клавіша <SingIn> переводить до сторінки регістрації.'}</p>
        </div>
    </div>
  )
}

export default Information;