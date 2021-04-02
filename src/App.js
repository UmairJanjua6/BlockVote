import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import CardContainer from './Components/CardContainer.js';
import UserLogin from './Components/UserLogin.js';
import AdminLogin from './Components/AdminLogin.js';
import Navbar from './Components/Navbar.js';
import './index.css';
import User from './Components/User.js';
// import {ElectionTimeContext} from './context/ElectionTimeContext.js';
function App() {
  const [canVote, setCanVote] = useState(false);
  return (
    <div className="container-fluid">
      <Navbar/>

      <Switch>
        <Route exact path= '/' component={CardContainer} />
        <Route path= '/userlogin' component={UserLogin} />
        <Route path= '/adminlogin' component={AdminLogin} />
        <Route path= '/user' component={User} />
      </Switch>
      </div>
  );
}

export default App;
