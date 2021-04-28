import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import CardContainer from './Components/CardContainer.js';
import UserLogin from './Components/UserLogin.js';
import AdminLogin from './Components/AdminLogin.js';
import RegisterUser from './Components/RegisterUser.js';
import Navbar from './Components/Navbar.js';
import '.././index.css';
import User from './Components/User.js';
import VoterRegister from './Components/VoterRegister.js';
import {ElectionTimeContext} from './context/ElectionTimeContext.js';
function Voter() {
  const [canVote, setCanVote] = useState(false);
  return (
    <div className="container-fluid">
      <Navbar/>

      <Switch>
        <Route exact path= '/' component={CardContainer} />
        <Route path= '/userlogin' component={UserLogin} />
        <Route path= '/registervoter' component={VoterRegister} />
        <Route path= '/adminlogin' component={AdminLogin} />
        <Route path= '/user' component={User} />
        <Route path= '/registeruser' component={RegisterUser} />
      </Switch>
      </div>
  );
}

export default Voter;
