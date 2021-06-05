import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import { Box , Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '../../../voterFiles/context/GlobalState';
import { loadBlockchain } from '../../../voterFiles/context/async';
import { candidateArrayLength1 } from '../../../voterFiles/context/async';
import { candidateArrayLength2 } from '../../../voterFiles/context/async';
import { candidateArrayLength3 } from '../../../voterFiles/context/async';
import { getVotes1 } from '../../../voterFiles/context/async';
import { getVotes2 } from '../../../voterFiles/context/async';
import { getVotes3 } from '../../../voterFiles/context/async';
import '../../index.css';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Overview(){
    const classes = useStyles();
    const [{ contract, accounts, candiArrayLength1, candiArrayLength2, candiArrayLength3, idToVote1, idToVote2, idToVote3}, dispatch] = useStore();
    
    useEffect ( async() => {
      await loadBlockchain(dispatch);
    }, []);

    const FetchData = () => {
      loadCandidateData();
      loadVotesData();
    }
    const loadCandidateData = async() => {
      try {
      await candidateArrayLength1(1, accounts, contract, dispatch);
      await candidateArrayLength2(2, accounts, contract, dispatch);
      await candidateArrayLength3(3, accounts, contract, dispatch);
      await getVotes1(1, accounts, contract, dispatch);
      await getVotes2(2, accounts, contract, dispatch);
      await getVotes3(3, accounts, contract, dispatch);
      } catch (error) {
        console.log("error: ", error);
      }
    }

    const loadVotesData = async() => {
      try {
        await getVotes1(1, accounts, contract, dispatch);
      await getVotes2(2, accounts, contract, dispatch);
      await getVotes3(3, accounts, contract, dispatch);
      } catch (error) {
        console.log("error: ", error);
      }
    }
return(
    <main className={classes.content}>
      <Box maxWidth="md" style={{paddingLeft:'250px'}}>
      <Typography variant="h3" id="heading">Overview</Typography>
      <div id="fetchData">
      <Button variant="info" onClick={FetchData}>Fetch Data</Button>
      </div>
      <div id="infoCard">
      <div className="infoTab">
        <div className= "topTab">
          <h5>Candidates in Constituency #01</h5>
        </div>
        <div className="downTab">
          <p>{candiArrayLength1}</p>
        </div>
      </div>

      <div className="infoTab">
        <div className= "topTab">
          <h5>Candidates in Constituency #02</h5>
        </div>
        <div className="downTab">
          <p>{candiArrayLength2}</p>
        </div>
      </div>

      <div className="infoTab">
        <div className= "topTab">
          <h5>Candidates in Constituency #03</h5>
        </div>
        <div className="downTab">
          <p>{candiArrayLength3}</p>
        </div>
      </div>

      <div className="infoTab">
        <div className= "topTab">
          <h5>Votes in Constituency #01</h5>
        </div>
        <div className="downTab">
          <p>{idToVote1 ? idToVote1.totalVotes : ""}</p>
        </div>
      </div>

      <div className="infoTab">
        <div className= "topTab">
          <h5>Votes in Constituency #02</h5>
        </div>
        <div className="downTab">
          <p>{idToVote2 ? idToVote2.totalVotes : ""}</p>
        </div>
      </div>

      <div className="infoTab">
        <div className= "topTab">
          <h5>Votes in Constituency #03</h5>
        </div>
        <div className="downTab">
          <p>{idToVote3 ? idToVote3.totalVotes : ""}</p>
        </div>
      </div>
      </div>
       
      </Box>
      </main>
);

}