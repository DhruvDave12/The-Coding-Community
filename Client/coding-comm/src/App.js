import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/home.component';
import SignUp from './pages/authentication/sign-up/sign-up.component';
import SignIn from './pages/authentication/sign-in/sign-in.component';
import Edit from './pages/edit/edit.component';
import TellUsMoreForm from './pages/tell-us-more/tell-us-more.component';
import Profile from './pages/Profile/profile.component';

import NavBar from './components/navbar/navbar.component';
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/edit' element={<Edit />} />
        <Route path='/tell-us-more' element={<TellUsMoreForm />}/>
        <Route path='/profile' element={<Profile />}/>
      </Routes>
    </>
  );
}

export default App;
