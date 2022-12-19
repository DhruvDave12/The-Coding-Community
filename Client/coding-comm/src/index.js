import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Context from './context/auth.context';
import PostProvider from './context/postContext';
import ProfileProvider from './context/profile.context';
import QuestionProvider from './context/question.context';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
        <Context>
          <ProfileProvider>
            <PostProvider>
              <QuestionProvider>
                <App />
              </QuestionProvider>
            </PostProvider>
          </ProfileProvider>
        </Context>
    </React.StrictMode>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
