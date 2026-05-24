import { FC } from 'react';

// own dispatch hook
import { useAppSelector } from "../../app.hooks";

import ho from './Home.module.scss';

import PageContainer from '../../components/PageContainer/PageContainer';
import RocketEasy from '../../components/SvgComponents/RocketEasy/RocketEasy';
import CalcEasy from '../../components/SvgComponents/CalcEasy/CalcEasy';
import Eath from '../../components/SvgComponents/Eath/Eath';

import { useNavigate  } from 'react-router-dom';  

const Home: FC = () => {

  const languageSelector = useAppSelector(state => state.ser.language);

  const navigate = useNavigate();

  return (
    <PageContainer>

     <div className={ho.line}>
      <div className={ho.block1}>
        <RocketEasy width={'300px'} height={'300px'}/>
        <button onClick={() => navigate('/signUp')}>{languageSelector === 'En' ? 'Start...' : 'Почати...'}</button>
      </div>
      <div className={ho.titleBlock}>
        <h1 className={ho.title}>{languageSelector === 'En' ? 'Detailed description of each trip': 'Детальний опис кожної поїздки'}</h1>
        <h2>{languageSelector === 'En' ? 'Date, number of kilometers, fuel type, the rest...': 'Дата, кількість кілометрів, тип палива, решта...'}</h2>
      </div>
     </div>
     <div className={ho.line}>
      <div className={ho.titleBlock}>
        <h1 className={ho.title}>{languageSelector === 'En' ? 'Corporate fleet costs under control': 'Витрати корпоративного автопарку'}</h1>
        <h2>{languageSelector === 'En' ? 'You always know that everything is fine - You and your colleagues...': 'Завжди знаєш, що все в порядку - Ти і твої колеги...'}</h2>
      </div>  
      <div className={ho.block2}>
        <CalcEasy width={'300px'} height={'300px'}/>
        <button onClick={() => navigate('/signUp')}>{languageSelector === 'En' ? 'Try...' : 'Спробувати...'}</button>
      </div>
     </div>
     <div className={ho.line}>
      <div className={ho.block1}>
        <Eath width={'300px'} height={'300px'}/>
        <button onClick={() => navigate('/signUp')}>{languageSelector === 'En' ? 'Look...': 'Подивитися...'}</button>
      </div>
        <div className={ho.titleBlock}>
          <h1 className={ho.title}>{languageSelector === 'En' ? 'General and individual statistics': 'Загальна та індивідуальна статистика'}</h1>
          <h2>{languageSelector === 'En' ? 'Individual and corporate stories are at your disposal....': 'У твоєму розпорядженні індивідуальні на корпоративні історії...'}</h2>
        </div>
     </div>
    </PageContainer>
  )
}

export default Home