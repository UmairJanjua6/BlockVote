import React, { useState, useEffect } from 'react';
import { Toolbar, Box } from "@material-ui/core"
import {Button } from "react-bootstrap";
import SideBar from "../Components/SideBar"
import { makeStyles } from '@material-ui/core/styles';
import * as ReactBootStrap from 'react-bootstrap';
import { getVoterList } from '../../../voterFiles/context/async';
import { loadBlockchain } from '../../../voterFiles/context/async';
import { useStore } from '../../../voterFiles/context/GlobalState';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const VoterApproval = () => {
  const [{ contract, accounts, getVoterData }, dispatch] = useStore();
  const [VoterDataState, setVoterDataState] = useState([]);
  // console.log("contract", contract);

  useEffect( () => {
        loadBlockchain(dispatch);
    }, []);

  const loadData = () => {
    getList();
    changeState();
  }
  const getList = async () => {
    await getVoterList(dispatch);
  }

  const changeState = () => {
    if(getVoterData != null) {
      setVoterDataState(getVoterData);
    }
  
  }
  
  console.log("voter state: ", VoterDataState);
  const classes = useStyles();

  const renderVoterList = (voter, index) => {
    return (
      <tr key={index}>
        <td>{voter.voterName}</td>
        <td>{voter.cnic}</td>
        <td>{voter.voteConstituency}</td>
      </tr>
    )
  }
  return (
    <div>

      <SideBar></SideBar>
      <Toolbar />
      <div >
        <main className={classes.content}>
          <Box maxWidth="md" style={{ paddingLeft: '250px' }}>
            <h1>Approve the Voter</h1>
            <button onClick={loadData}>Click!</button>
            <ReactBootStrap.Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>cnic</th>
                  <th>Constituency</th>
                  <th>Approve</th>
                </tr>
              </thead>
              <tbody>
                {VoterDataState.map(renderVoterList)}
                {/* <Button variant="primary"  className="btn btn-dark " >Approve</Button> */}
              </tbody>
            </ReactBootStrap.Table>
          </Box>
        </main>
      </div>
    </div>
  );
}

export default VoterApproval;