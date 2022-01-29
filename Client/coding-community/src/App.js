import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
      <h1>Hello Backend</h1>

      <p>We have successfully connected to the backend</p>
      <form action="/check-connection" method = "POST">
        <button className='is-connected'>Are you connected?</button>
      </form>
      <p>If you are connected you must be seeing something on your console.</p>
    </>
  );
}

export default App;
