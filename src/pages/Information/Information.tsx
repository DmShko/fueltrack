import { FC } from 'react'

import PageContainer from '../../components/PageContainer/PageContainer';
import Information from '../../components/Information/Information';

const InformationPage: FC = () => {
  return (
    <div>
         <PageContainer>
            <Information/>
        </PageContainer>
    </div>
  )
}

export default InformationPage;