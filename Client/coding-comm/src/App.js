import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/home.component';
import SignUp from './pages/authentication/sign-up/sign-up.component';
import SignIn from './pages/authentication/sign-in/sign-in.component';
import Profile from './pages/profile/profile.component';
import TellUsMoreForm from './pages/tell-us-more/tell-us-more.component';

import NavBar from './components/navbar/navbar.component';
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/tell-us-more' element={<TellUsMoreForm />}/>
      </Routes>
    </>
  );
}

export default App;
