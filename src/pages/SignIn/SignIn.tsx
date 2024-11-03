import { FC } from 'react'

import PageContainer from '../../components/PageContainer/PageContainer';
import SignIn from '../../components/SignInPackage/SignInPackage';

const SignInPage: FC = () => {
  return (
    <div>
         <PageContainer>
            <SignIn/>
        </PageContainer>
    </div>
  )
}

export default SignInPage;