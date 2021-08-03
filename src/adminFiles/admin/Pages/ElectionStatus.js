import React, {useEffect, useState} from 'react';
import { Box , Typography} from "@material-ui/core";
import { Form , Button} from "react-bootstrap";
import SideBar from '../Components/SideBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '../../../voterFiles/context/GlobalState';
import { loadBlockchain } from '../../../voterFiles/context/async';
import { startElection } from '../../../voterFiles/context/async';
import { endElection} from '../../../voterFiles/context/async';
import { electionStatusGet } from '../../../voterFiles/context/async';
import '../../index.css';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ElectionStatus(){
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect (() => {
    const loadWeb3 = async () => {
      await loadBlockchain (dispatch);
    await setTimeout(() => {
      setLoading(false)
   }, 1);
   await electionStatusGet(accounts, contract, dispatch);
    }
    loadWeb3();
  }, []);
  
  const [{ contract, accounts, electionStatus, ownerAddress}, dispatch] = useStore();

    let status;
    if(electionStatus === "0") {
      status = "NOT STARTED";
    } else if (electionStatus === "1") {
      status = "STARTED";
    } else if (electionStatus === "2") {
      status = "ENDED";
    }

    console.log("if status: ", status);

  const startElectionFunc = async() => {
 try {
    await startElection(accounts, contract);
    await electionStatusGet(accounts, contract, dispatch);
 }
 catch (err) {
   console.log("error: ", err);
 }
  }

  const endElectionFunc = async() => {
    try {
       await endElection(accounts, contract);
       await electionStatusGet(accounts, contract, dispatch);
    }
    catch (err) {
      console.log("error: ", err);
    }
     }

return(

    <div>
    <CssBaseline/>
    <SideBar></SideBar>
    <Toolbar/>
    { !loading ?
    ownerAddress == accounts[0] ?
    <div >
      <CssBaseline />
      <main className={classes.content}>
      <Box maxWidth="md" style={{paddingLeft:'250px'}}>
      <Typography variant="h3">Election Status</Typography>
        <div id="electionStatus">
          <div id="electionStatusText">Election Status:</div>
          <div id={electionStatus === "1" ? "green" : "red"}>{status}</div>
        </div>
       <br></br>
<Form>
<Form.Group>
<Button variant="primary" className="btn btn-dark " onClick={startElectionFunc}>
   Start Election
  </Button>
</Form.Group>
<Form.Group>
<Button variant="primary"  className="btn btn-dark " onClick={endElectionFunc}>
   End Election
  </Button>
</Form.Group>
</Form>


      </Box>
      </main>
    </div>
      : alert ('Kindly login from owner account') : ""}
</div>
);

}