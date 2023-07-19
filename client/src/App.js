import * as React from 'react';
import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Register from './components/Register';
import TrainList from './components/Train';
import TrainDetails from "./components/Traindetails"
import Api from './components/api';



export default function App() {
  return (
    <>
    <Router>
           <div className="App">
           <Routes>
                 <Route exact path='/register' element={< Register />}></Route>
                 <Route exact path='/train/trains' element={< TrainList />}></Route>
                 <Route exact path='/train/trains/:trainNumber' element={<TrainDetails/>}></Route>
                 <Route exact path='/api/auth' element={<Api/>}></Route>
                

               
          </Routes>
          </div>
       </Router>
    </>
  );
}
