import 'antd/dist/antd.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/home.component';
import SignUp from './pages/authentication/sign-up/sign-up.component';
import SignIn from './pages/authentication/sign-in/sign-in.component';
import Edit from './pages/edit/edit.component';
import TellUsMoreForm from './pages/tell-us-more/tell-us-more.component';
import Profile from './pages/Profile/profile.component';
import Feed from './pages/Feed/feed.component';
import Comments from './pages/comments/comments.component';
import NewPost from './pages/new-post/new-post.compoent';
import OtherProfile from './pages/others-profile/others-profile.component';
import ListOfFollows from './components/listoffollows/list-of-follows.component';
import Course from './pages/course/course.component';
import SellCourse from './pages/course/sellCourse/sellCourse.component';
import BoughtCourse from './pages/course/boughtCourse/boughtCourse.component';
import ParticularCourse from './pages/particular-course/particular-course.component';

import NavBar from './components/navbar/navbar.component';
function App() {
  return (
    <>
    {
      localStorage.getItem('token') ? 
      <NavBar />
      :
      null
    }
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/search' element={<Home />}/>
        <Route path='/register' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/edit' element={<Edit />} />
        <Route path='/tell-us-more' element={<TellUsMoreForm />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/social/:id' element={<ListOfFollows />}/>
        <Route path='/feed' element={<Feed />}/>
        <Route path='/comments/:id' element={<Comments />}/>
        <Route path='/new/post' element={<NewPost />}/>
        <Route path='/profile/:id' element={<OtherProfile />}/>
        <Route path='/course' element={<Course />} />
        <Route path='/course/sell' element={<SellCourse />}/>
        <Route path='/course/:id' element={<ParticularCourse />}/>
        <Route path='/course/:id/bought' element={<BoughtCourse />}/>
      </Routes>
    </>
  );
}

export default App;
