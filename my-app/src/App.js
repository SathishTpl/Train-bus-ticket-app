import React from 'react';

import {BrowserRouter as Router,Switch, Route,Redirect}  from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// import ReactDOM from 'react-dom';
import 'bootstrap/dist/js/bootstrap'
import { ToastContainer, toast } from 'react-toastify';
 import './App.css';
 import 'bootstrap/js/dist/dropdown';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import Login from './Log-in/login'
import Home from './Home/Home'
import Register from './Register/register';
import TrainSearch from './TrainSearch/trainSearch';
import Trainlist from './Trainlist/trainList';
import TrainBooking from './TrainBooking/trainBooking';
import Profile from './Profile&Activity/Profile';
import Activity from './Profile&Activity/Activity';



function App() {

  return (

    <Router >
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/home" component={Home}/>
          <Route path="/trainSearch" component={TrainSearch}/>
          <Route path="/trainList" component={Trainlist}/>
          <Route path="/trainBooking" component={TrainBooking}/>
          <Route path = "/Profile" component={Profile}/>
          <Route path = "/Activity" component={Activity}/>
          <Redirect from="*" to="/"/>
        </Switch>
      <ToastContainer />
    </div>
    </Router>
  
  );
}

export default App;


// <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    //  </div>