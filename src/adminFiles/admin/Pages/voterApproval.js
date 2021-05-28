import { Toolbar, Box } from "@material-ui/core"
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

export default function VoterApproval() {
  const [{ contract, accounts, getVoterData }, dispatch] = useStore();
  console.log("outer voter data: ", getVoterData);

  const clickFunc = async () => {
    await getVoterList(dispatch);
  }
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
            <button onClick={clickFunc}>Click!</button>
            <ReactBootStrap.Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>cnic</th>
                  <th>Constituency</th>
                </tr>
              </thead>
              <tbody>
                {/* {getVoterData.map(renderVoterList)} */}
                
                <th>{getVoterData.voterName}</th>
                <th>{getVoterData.cnic}</th>
                <th>{getVoterData.voteConstituency}</th>
              </tbody>
            </ReactBootStrap.Table>
          </Box>
        </main>
      </div>
    </div>
  );
}