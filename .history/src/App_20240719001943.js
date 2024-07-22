import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <h1>Main page</h1>
    </div>

    
  );
}

export default App;