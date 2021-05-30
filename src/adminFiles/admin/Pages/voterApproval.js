import React, {useState, useEffect} from 'react';
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
  const [
    {contract, accounts, getVoterData, voterListArray},
    dispatch,
  ] = useStore ();
  const [VoterDataState, setVoterDataState] = useState ([]);
  console.log ('array: ', voterListArray);
  console.log ('data: ', VoterDataState);
  console.log ('length: ', VoterDataState.length);

  useEffect (() => {
    loadBlockchain (dispatch, contract, accounts);
  }, []);

  const loadData = () => {
    getList ();
    changeState ();
  };
  const getList = async () => {
    await getVoterList (dispatch, contract, accounts);
  };

  const changeState = () => {
    if (getVoterData != null) {
      setVoterDataState (getVoterData);
    }
  };

  const authorizeVoterBtn = async (index) => {
    try {
      let voterAddress = voterListArray[index];
      let id = VoterDataState[index].voteConstituency;
      await authorizeVoter (voterAddress, id, contract, accounts, dispatch);
    } catch (error) {
      console.log ('error: ', error);
    }
  };

  const RejectVoterBtn = async (index) => {
    try {
      let voterAddress = voterListArray[index];
      console.log("address: ", voterAddress);
      await deleteVoter(voterAddress, index, contract, accounts);
      console.log("index: ", index);

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
        <td>{voter.voteConstituency}</td>
        <td>
          <Button
            variant="success"
            className="btn  "
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
            className="btn"
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
      <div>
        <main className={classes.content} >
          <Box maxWidth="md" style={{paddingLeft: '250px'}}>
            <h1 style={{width: '82%', textAlign: 'center'}}>Voter List</h1>
            <Button variant="dark" style={{marginBottom: '15px', float: 'right'}} onClick={loadData} >Fetch Voter List</Button>
            <br/>
            <ReactBootStrap.Table striped bordered hover>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>CNIC</th>
                  <th>CONSTITUENCY</th>
                  <th>APPROVE</th>
                  <th>REJECT</th>
                </tr>
              </thead>
              <tbody>
                {VoterDataState.map (renderVoterList)}
              </tbody>
            </ReactBootStrap.Table>
          </Box>
        </main>
      </div>
    </div>
  );
};

export default VoterApproval;
