import React, { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap';
import { Toolbar, Box } from "@material-ui/core"
import SideBar from "../Components/SideBar"
import * as ReactBootStrap from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '../../../voterFiles/context/GlobalState';
import { loadBlockchain } from '../../../voterFiles/context/async';
import { getCandidatesInConsi } from '../../../voterFiles/context/async';
import { getBalance } from '../../../voterFiles/context/async';
import { idToVote } from '../../../voterFiles/context/async';
import '../../index.css';



const useStyles = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

export default function DisplayResult(){
  const [{ contract, accounts, getCandidateInfo, userBalance, idVote}, dispatch] = useStore ();
  const [turnOver, setTurnOver] = useState (0);
  const [consi, setConsi] = useState();
    const classes = useStyles();
    console.log("candidateInfo: ", getCandidateInfo);

    useEffect( async() => {
      await loadBlockchain(dispatch);
    }, []);

    const fetchResult = () => {
      candidateInfo(consi);
      candidateBalance(consi);
      if (userBalance && idVote) {
        calTurnOver();
      }
    }
    const candidateInfo = async(consNum) => {
      try {
      await getCandidatesInConsi(consNum, contract, accounts, dispatch);
      await idToVote(consNum, contract, accounts, dispatch);
      } catch (error) {
        console.log("error: ", error);
      }
    }

    const printFunc = () => {
      window.print();
    }

    const candidateBalance = async() => {
      try {
        let Batchaddress = [];
        let BatchConsNum = [consi, consi];
        if(getCandidateInfo) {
        for(let i = 0; i < getCandidateInfo.length; i++) {
        Batchaddress[i] = getCandidateInfo[i].candiAddress;
        }
        await getBalance(Batchaddress, BatchConsNum, contract, accounts, dispatch);
      }
      } catch (e) {
        console.log("error: ", e);
      }
    }

    const print = () => {
      window.print();
    }
    const calTurnOver = () => {
      let sum = userBalance.reduce((a, b) => (parseInt(a) + parseInt(b)), 0);
      let percentage = (sum / idVote.totalVotes) * 100;
      setTurnOver(percentage);
    }
    const renderResult = (candidate, index) => {
      return (
        <tr key={index}>
          <td>{candidate.candiName}</td>
          <td>{userBalance[index]}</td>
        </tr>
      )
    }
    return(

        <div>
            <SideBar></SideBar>
            <Toolbar/>
            <div >
      <main className={classes.content}>
      <Box maxWidth="md" style={{paddingLeft:'250px'}}>
      <h1 id="title">Election Result of: </h1>
      <select id="consiOption" onChange={(e) => setConsi(e.target.value)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="2">3</option>
      </select>
      <Button variant="primary" onClick={fetchResult}>Show</Button>
      <Button variant="primary" id="printBtn" onClick={printFunc}>Print</Button>
      
      {idVote ? <div><p id="turnOver">Election Turn over: {turnOver}%</p></div> : ""}
      <ReactBootStrap.Table striped bordered hover id="printTable">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>Votes Secured</th>
                </tr>
              </thead>
              <tbody>
              {getCandidateInfo && userBalance ? (getCandidateInfo).map(renderResult) : "null"}
              </tbody>
            </ReactBootStrap.Table>

      </Box>
      </main>
    </div>
        </div>
    );
}