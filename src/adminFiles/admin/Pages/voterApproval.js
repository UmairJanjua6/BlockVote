import React, {useEffect, useState} from 'react';
import {Toolbar, Box} from '@material-ui/core';
import {Button} from 'react-bootstrap';
import SideBar from '../Components/SideBar';
import {makeStyles} from '@material-ui/core/styles';
import * as ReactBootStrap from 'react-bootstrap';
import {getVoterList} from '../../../voterFiles/context/async';
import {loadBlockchain} from '../../../voterFiles/context/async';
import {useStore} from '../../../voterFiles/context/GlobalState';
import {authorizeVoter} from '../../../voterFiles/context/async';
import {deleteVoter} from '../../../voterFiles/context/async';

const useStyles = makeStyles (theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing (3),
  },
}));

const VoterApproval = () => {
  const [{contract, accounts, getVoterData, voterListArray, ownerAddress}, dispatch] = useStore();
  const [loading, setLoading] = useState(true);

  useEffect (() => {
    const loadWeb3 = async() => {
      await loadBlockchain (dispatch);
      setTimeout(() => {
      setLoading(false)
   }, 1);
    }
    loadWeb3();
  }, []);
  
  const getList = async () => {
    await getVoterList (dispatch, contract, accounts);
  };

  const authorizeVoterBtn = async (index) => {
    try {
      let voterAddress = voterListArray[index];
      let id;
      if(getVoterData) {
        id = getVoterData[index].voteConstituency;
      }
      await authorizeVoter (voterAddress, id, contract, accounts, dispatch);
      await getVoterList (dispatch, contract, accounts);
    } catch (error) {
      console.log ('error: ', error);
    }
  };

  const RejectVoterBtn = async (index) => {
    try {
      let voterAddress = voterListArray[index];
      await deleteVoter(voterAddress, index, contract, accounts);
      await getVoterList (dispatch, contract, accounts);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const classes = useStyles ();

  const renderVoterList = (voter, index) => {
    return (
      <tr key={index}>
        <td>{voter.voterName}</td>
        <td>{voter.cnic}</td>
        <td>{voter.email}</td>
        <td>{voter.emailStatus === true ? "Verified" : "Not Verified"}</td>
        <td>{voter.voteConstituency}</td>
        <td>{voter.authorize === true ? "Registered" : "Not Registered"}</td>
        <td>
          <Button
            variant="success"
            title= {voter.authorize === true ? "Registered Voter" : voter.voteCast === true ? "Vote casted" : "Approve"}
            className="btn  "
            disabled= {voter.authorize === true || voter.voteCast === true ? true: false}
            onClick={() => {
              authorizeVoterBtn (index);
            }}
          >
            Approve
          </Button>
        </td>
        <td>
          <Button
            variant="secondary"
            title= {voter.authorize === true ? "Registered Voter" : voter.voteCast === true ? "Vote casted" : "Reject"}
            className="btn"
            disabled= {voter.authorize === true || voter.voteCast === true ? true: false}
            onClick={() => {
              RejectVoterBtn (index);
            }}
          >
            Reject
          </Button>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <SideBar />
      <Toolbar />
    { !loading ?
    ownerAddress === accounts[0] ?
      <div>
        <main className={classes.content} >
          <Box maxWidth="md" style={{paddingLeft: '250px'}}>
            <h1 style={{width: '82%', textAlign: 'center'}}>Voter List</h1>
            <Button variant="dark" style={{marginBottom: '15px', float: 'right'}} onClick={getList} >Fetch Voter List</Button>
            <br/>
            <ReactBootStrap.Table striped bordered hover>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>CNIC</th>
                  <th>EMAIL</th>
                  <th>EMAIL STATUS</th>
                  <th>CONSTITUENCY</th>
                  <th>STATUS</th>
                  <th>APPROVE</th>
                  <th>REJECT</th>
                </tr>
              </thead>
              <tbody>
                {getVoterData ? getVoterData.map (renderVoterList) : ""}
              </tbody>
            </ReactBootStrap.Table>
          </Box>
        </main>
      </div>
      : alert ('Kindly login from owner account') : null}
    </div>
  );
};

export default VoterApproval;
