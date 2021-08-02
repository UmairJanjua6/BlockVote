import React, {useEffect, useState} from 'react';
import './adminFiles/App.css';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './adminFiles/admin/AdminDashboard';
import AddCandidate from './adminFiles/admin/Pages/AddCandidate';
import ElectionStatus from './adminFiles/admin/Pages/ElectionStatus';
import DisplayResult from './adminFiles/admin/Pages/Result';
import CandidateList from './adminFiles/admin/Pages/CandidateList';
import MintVote from './adminFiles/admin/Pages/MintVote';
import VoterApproval from './adminFiles/admin/Pages/voterApproval';
import {loadBlockchain} from './voterFiles/context/async';
import {useStore} from './voterFiles/context/GlobalState';

function Admin () {
  const [{ownerAddress, accounts}, dispatch] = useStore ();
  const [loading, setLoading] = useState(true);
  useEffect (async () => {
    await loadBlockchain (dispatch);
    setTimeout(() => {
      setLoading(false)
   }, 1)
  }, []);
  console.log ('admin owner: ' + ownerAddress);
  return (
    <div>
      { !loading ?
      ownerAddress == accounts[0]
        ? <Switch>
            <Route exact path="/admin" component={Dashboard} />
            <Route exact path="/addcandidate" component={AddCandidate} />
            <Route exact path="/candidatelist" component={CandidateList} />
            <Route exact path="/approvevoter" component={VoterApproval} />
            <Route exact path="/electionstatus" component={ElectionStatus} />
            <Route exact path="/displayresult" component={DisplayResult} />
            <Route exact path="/mintvote" component={MintVote} />
          </Switch>
        : alert ('Kindly login from owner account') : ""}

    </div>
  );
}

export default Admin;
