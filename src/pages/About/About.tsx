// own dispatch hook
import { useAppSelector } from "../../app.hooks"; 

import { LangType } from '../../types/types';

import PageContainer from '../../components/PageContainer/PageContainer';

import ab from './About.module.scss';

const About = () => {
     
  const languageSelector = useAppSelector(state => state.ser.language);

  return (
    <PageContainer>
        <div className={ab.container}><p>{languageSelector === LangType.en ? 'Hello! This resource is designed for the convenience of monitoring and maintaining fuel consumption statistics by both an individual and a team. For questions and suggestions, please contact fueltrack2024.service@gmail.com.' : 'Привіт! Цей ресурс розроблений для зручності моніторингу та ведення статистики витрат палива як однією особою, так і колективом. З питань та пропозицій прошу звертатися за електронною адресою fueltrack2024.service@gmail.com.'}</p></div>
    </PageContainer>
  )
}

export default About