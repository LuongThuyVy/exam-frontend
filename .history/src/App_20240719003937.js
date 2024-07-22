import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter,Route } from 'react-router-dom';
import Login from './components/Login/Login';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <h1>Main page</h1>
      <Route path='login'> 
          <Login/>
      </Route>

     
      </BrowserRouter>
    </div>

    
  );
}

export default App;