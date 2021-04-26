import React from 'react'
import './adminFiles/App.css';
import {Switch, Route , Router} from "react-router-dom"

import Dashboard from './adminFiles/admin/AdminDashboard'
import AddCandidate from './adminFiles/admin/Pages/AddCandidate';
import ElectionStatus from './adminFiles/admin/Pages/ElectionStatus';
import DisplayResult from './adminFiles/admin/Pages/Result';
import CandidateList from './adminFiles/admin/Pages/CandidateList';
import AddAdmin from './adminFiles/admin/Pages/AddAdmin';
function Admin() {
  return (
  
    <Switch>
      
      <Route exact path="/admin" component ={Dashboard} />
      <Route exact path="/AddCandidate" component ={AddCandidate} />
      <Route exact path="/ElectionStatus" component ={ElectionStatus} />
      <Route exact path="/DisplayResult" component ={DisplayResult} />
      <Route exact path="/CandidateList" component ={CandidateList} />
      <Route exact path="/AddAdmin" component ={AddAdmin} />
    </Switch>
 
  
  );
}

export default Admin;
