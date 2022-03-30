import './App.css';
import { Routes, Route } from 'react-router-dom';

import SignUp from './pages/authentication/sign-up/sign-up.component';
import SignIn from './pages/authentication/sign-in/sign-in.component';
import Home from './pages/home/home.component';
import TellUsMoreForm from './pages/tell-us-more/tell-us-more.component';

import NavBar from './components/navbar/navbar.component';
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/register' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/profile' element={<Home />} />
        <Route path='/tell-us-more' element={<TellUsMoreForm />}/>
      </Routes>
    </>
  );
}

export default App;
