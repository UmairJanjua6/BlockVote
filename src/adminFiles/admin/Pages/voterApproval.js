import React, {useEffect} from 'react';
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

  useEffect (() => {
    loadBlockchain (dispatch);
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
    } catch (error) {
      console.log ('error: ', error);
    }
  };

  const RejectVoterBtn = async (index) => {
    try {
      let voterAddress = voterListArray[index];
      await deleteVoter(voterAddress, index, contract, accounts);
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
        <td>{voter.authorize === true ? "Registered" : "Not Registered"}</td>
        <td>
          <Button
            variant="success"
            className="btn  "
            disabled= {voter.authorize === true ? true: false}
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
            disabled= {voter.authorize === true ? true: false}
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
            <Button variant="dark" style={{marginBottom: '15px', float: 'right'}} onClick={getList} >Fetch Voter List</Button>
            <br/>
            <ReactBootStrap.Table striped bordered hover>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>CNIC</th>
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
    </div>
  );
};

export default VoterApproval;
