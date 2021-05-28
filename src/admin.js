import React from 'react'
import './adminFiles/App.css';
import {Switch, Route} from "react-router-dom"

import Dashboard from './adminFiles/admin/AdminDashboard'
import AddCandidate from './adminFiles/admin/Pages/AddCandidate';
import ElectionStatus from './adminFiles/admin/Pages/ElectionStatus';
import DisplayResult from './adminFiles/admin/Pages/Result';
import CandidateList from './adminFiles/admin/Pages/CandidateList';
import AddAdmin from './adminFiles/admin/Pages/AddAdmin';
import VoterApproval from './adminFiles/admin/Pages/voterApproval';
function Admin() {
  return (
  
    <Switch>
      
      <Route exact path="/admin" component ={Dashboard} />
      <Route exact path="/addcandidate" component ={AddCandidate} />
      <Route exact path="/candidatelist" component ={CandidateList} />
      <Route exact path= "/approvevoter" component ={VoterApproval} />
      <Route exact path="/electionstatus" component ={ElectionStatus} />
      <Route exact path="/displayresult" component ={DisplayResult} />
      <Route exact path="/addadmin" component ={AddAdmin} />
    </Switch>
 
  
  );
}

export default Admin;
