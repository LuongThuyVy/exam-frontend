import './App.css';
import Header from './components/Header/Header';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './components/Login/Login';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <h1>Main page</h1>


     
      </BrowserRouter>
    </div>

    
  );
}

export default App;