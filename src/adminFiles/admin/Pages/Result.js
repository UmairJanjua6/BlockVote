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
  const [{ contract, accounts, getCandidateInfo, userBalance, idVote, ownerAddress}, dispatch] = useStore ();
  const [turnOver, setTurnOver] = useState (0);
  const [loading, setLoading] = useState(true);
  const [consi, setConsi] = useState();
    const classes = useStyles();
    console.log("candidateInfo: ", getCandidateInfo);
    console.log("balance: ", userBalance);

    useEffect (() => {
      const loadWeb3 = async () => {
        await loadBlockchain (dispatch);
        setTimeout(() => {
        setLoading(false)
     }, 1);
      }
      loadWeb3();
    }, []);

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
    let date;
    var today = new Date();
    date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();

    const candidateBalance = async() => {
      try {
        let batchAddress = [];
        let batchConsNum = [];
        if(getCandidateInfo) {
        for(let i = 0; i < getCandidateInfo.length; i++) {
        batchAddress[i] = getCandidateInfo[i].candiAddress;
        batchConsNum[i] = consi
        }
        await getBalance(batchAddress, batchConsNum, contract, accounts, dispatch);
        calTurnOver();
      }
      } catch (e) {
        console.log("error: ", e);
      }
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
        { !loading ?
        ownerAddress === accounts[0] ?
            <div >
      <main className={classes.content}>
      <Box maxWidth="md" style={{paddingLeft:'250px'}}>
      <p id="date">Date: {date}</p>
      <h1 id="title">Election Result of: </h1>
      <h3 id="consiNum">Result of Constituency No: {consi}</h3>
      <select id="consiOption" onChange={(e) => {setConsi(e.target.value); candidateInfo(e.target.value);}}>
        <option value ="0">Choose...</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="2">3</option>
      </select>
      <Button variant="primary" onClick={candidateBalance}>Show</Button>
      <Button variant="primary" id="printBtn" onClick={printFunc}>Print</Button>
      
      {idVote ? <div><p id="turnOver">Election Turn over: {turnOver}%</p></div> : ""}
      <ReactBootStrap.Table striped bordered hover id="printTable">
              <thead>
                <tr style={{textAlign: "center"}}>
                  <th>NAME</th>
                  <th>Votes Secured</th>
                </tr>
              </thead>
              <tbody style={{textAlign: "center"}}>
              {getCandidateInfo && userBalance ? (getCandidateInfo).map(renderResult) : ""}
              </tbody>
            </ReactBootStrap.Table>

      </Box>
      <div className="resultFooter">
        This is system generated result and does not requires any signature verification.
      </div>
      </main>
    </div>
      : alert ('Kindly login from owner account') : ""}
        </div>
    );
}