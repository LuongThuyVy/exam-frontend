import './App.css';
import Header from './components/Header/Header';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Register from './components/Register/Register';
function NotFound() {
  return (
      <div>
          <h2>404 Not Found</h2>
          <p>Sorry, the page you are looking for does not exist.</p>
      </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <h1>Main page</h1>

      <Routes>
      <Route path='/shift' element={<Shift/>} />
      <Route path='/login' element={<Login />} />
      
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/profile' element={<Login />} />
     
      <Route path="*" element={<NotFound />} />
 
      </Routes>
     
      </BrowserRouter>
    </div>

    
  );
}

export default App;