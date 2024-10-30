import { Route, Routes } from 'react-router-dom';
import { nanoid } from 'nanoid';

// import component pages
import SharedLayout from './components/SharedLayout/SharedLayout.tsx';
import Information from './pages/Information/Information.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import Home from './pages/Home/Home.tsx';
import Tracks from './pages/Tracks/Tracks.tsx';
import SignIn from './pages/SignIn/SignIn.tsx';
import SignUp from './pages/SignUp/SignUp.tsx';

import './App.css';

const TRACKS = '/tracks';
const INFORMATION = '/information';
const SIGNIN = '/signin';
const SIGNUP = '/signup';
const NOTFOUND = '/*';

const App = () => {

  // Routes
  const appRoutes = [
  
  {path: TRACKS, element: <Tracks />,}, 
  {path: INFORMATION, element: <Information />,}, 
  {path: SIGNIN, element: <SignIn />,}, 
  {path: SIGNUP, element: <SignUp />,},
  {path: NOTFOUND, element: <NotFound />,},
  
  ];
  
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index
            element={<Home/>}
          />

          {appRoutes.map(({ path, element }) => 
          {return <Route key={nanoid()} path= {path} element={element}/>})}
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;