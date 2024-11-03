import { FC } from 'react'

import PageContainer from '../../components/PageContainer/PageContainer';
import SignUp from '../../components/SignUpPackage/SignUpPackage';

const SignUpPage: FC = () => {
  return (
    <div>
         <PageContainer>
            <SignUp/>
        </PageContainer>
    </div>
  )
}

export default SignUpPage;