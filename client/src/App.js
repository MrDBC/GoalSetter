import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import DashBoard from './pages/DashBoard';
import Register from './pages/Register';
import Login from './pages/Login';



function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header/>
          <div className="container-routes">
            <Routes>
              <Route path='/' element={<DashBoard/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/login' element={<Login/>} />
            </Routes>
          </div>
        </div> 
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
