import React, {useEffect} from 'react';
import { Box , Typography} from "@material-ui/core";
import { Form , Button} from "react-bootstrap";
import SideBar from '../Components/SideBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '../../../voterFiles/context/GlobalState';
import { loadBlockchain } from '../../../voterFiles/context/async';
import { electionStatusSet } from '../../../voterFiles/context/async';
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
  const [{ contract, accounts, electionStatus}, dispatch] = useStore();
  console.log("status: ", electionStatus);

  useEffect( async() => {
    await loadBlockchain(dispatch);
  }, []);

  const updateElectionState = async(status) => {
 try {
    await electionStatusSet(status, accounts, contract);
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
    <div >
      <CssBaseline />
      <main className={classes.content}>
      <Box maxWidth="md" style={{paddingLeft:'250px'}}>
      <Typography variant="h3">Election Status</Typography>
        <div id="electionStatus">
          <div id="electionStatusText">Election Status:</div>
          <div id={electionStatus === true? "green" : "red"}>{electionStatus ? "Started" : "Not Started"}</div>
        </div>
       <br></br>
<Form>
<Form.Group>
<Button variant="primary" className="btn btn-dark " onClick={ () => {updateElectionState(true)}}>
   Start Election
  </Button>
</Form.Group>
<Form.Group>
<Button variant="primary"  className="btn btn-dark " onClick={ () => {updateElectionState(false)}}>
   End Election
  </Button>
</Form.Group>
</Form>


      </Box>
      </main>
    </div>
   
</div>
);

}