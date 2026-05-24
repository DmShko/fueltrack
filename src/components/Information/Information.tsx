import { FC } from 'react';
import HomeImg from '../../images/home.png';
import SingInImg from '../../images/SingIn.png';
import SingUpImg from '../../images/SingUp.png';
import CollabsImg from '../../images/Collabs.png';
import AddCollabImg from '../../images/AddCollab.png';
import TrackImg from '../../images/Track.png';
import CollabsListImg from '../../images/CollabsList.png';
import CollabsDataImg from '../../images/CollabData.png';

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
        <div  className={inf.imgBlock}>
          <img src={CollabsImg} alt="To singUp" width="200" height="250"></img>
          <p>{languageSelector === 'En' ? 'Press the <Collaborators> key to go to the corresponding page. For administrators.': 'Натисни клавішу <Collaborators>, щоб перейти до відповідної сторінки. Для адміністраторів.'}</p>
        </div>
        <div  className={inf.imgBlock}>
          <img src={AddCollabImg} alt="To singUp" width="400" height="250"></img>
          <p>{languageSelector === 'En' ? 'To add one or more participants at once, fill in this field strictly according to the flashing prompt (through the underscore). Namely: Email_name_password_repeat password. Make one space and enter the same for the next user. If the user is the last - there should be no space at the end!': 'Щоб додати одного або декількох учасників одночасно, заповни це поле суворо відповідно з заблоном блимаючої підказки (через нижнє підкреслювання). А саме: Електронна пошта_імя_пароль_повторний пароль. Зроби один пробіл і так само введи танні для наступного користувача. Якщо користувач останній - пробілу в кінці бути не повинно!'}</p>
        </div>
        <div  className={inf.imgBlock}>
          <img src={TrackImg} alt="To singUp" width="400" height="250"></img>
          <p>{languageSelector === 'En' ? 'Select a day in the right field to see statistics, or to edit or delete. In the left field, you must select a day to add statistics for it. Otherwise, a track for the current date will be added.': 'Вибери день у правому полі, щоб побачити статистику, або провести редагування чи видалення. У лівому полі треба вибрати день, щоб додати статистику для нього. Інакше буде додано трек для поточної дати.'}</p>
        </div>
        <div  className={inf.imgBlock}>
          <img src={CollabsListImg} alt="To singUp" width="400" height="250"></img>
          <p>{languageSelector === 'En' ? 'Select one of the names to open the statistics of the desired group member.': 'Вибери одне з імен, щоб відкрити статистику потрібного учасника групи.'}</p>
        </div>
        <div  className={inf.imgBlock}>
          <img src={CollabsDataImg} alt="To singUp" width="400" height="250"></img>
          <p>{languageSelector === 'En' ? 'Select a day at the top of the menu to see statistics for the day and the total for the last two months. Statistics older than two months are automatically deleted!!!': 'Вибери день у верхній частині меню, щоб побачити статистику за день, та загальну за два останніх місяці. Статистика старша за два місяці видаляється автоматичкно!!!'}</p>
        </div>
    </div>
  )
}
export default Information;