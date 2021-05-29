import React, { useEffect } from 'react';
import { Box , Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import '../../index.css';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Overview(){
    const classes = useStyles();
    useEffect ( () => {
      let account = sessionStorage.getItem("accounts");
      account = JSON.parse(account);
    
      let contract = sessionStorage.getItem("contract");
      contract = JSON.parse(contract);
      console.log("asdasdasaaa: ", account, contract);
    }, []);
return(
    <main className={classes.content}>
      <Box maxWidth="md" style={{paddingLeft:'250px'}}>
      <Typography variant="h3">Overview</Typography>
      <div className="infoTab">
        <div className= "topTab">
          <h5>Total Candidates in Con #01</h5>
        </div>
        <div className="downTab">
          <p>Lower text</p>
        </div>
      </div>

      <div className="infoTab">
        <div className= "topTab">
          <h5>Total Candidates in Con #02</h5>
        </div>
        <div className="downTab">
          <p>Lower text</p>
        </div>
      </div>

      <div className="infoTab">
        <div className= "topTab">
          <h5>Total Candidates in Con #03</h5>
        </div>
        <div className="downTab">
          <p>Lower text</p>
        </div>
      </div>

      <div className="infoTab">
        <div className= "topTab">
          <h5>Total Votes in Con #01</h5>
        </div>
        <div className="downTab">
          <p>Lower text</p>
        </div>
      </div>

      <div className="infoTab">
        <div className= "topTab">
          <h5>Total Votes in Con #02</h5>
        </div>
        <div className="downTab">
          <p>Lower text</p>
        </div>
      </div>

      <div className="infoTab">
        <div className= "topTab">
          <h5>Total Votes in Con #03</h5>
        </div>
        <div className="downTab">
          <p>Lower text</p>
        </div>
      </div>
       
      </Box>
      </main>
);

}