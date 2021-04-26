
import { Container , Box, Typography} from "@material-ui/core";
import { Form , Button} from "react-bootstrap";
import SideBar from '../Components/SideBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
export  default function AddCandidate(){
  const classes = useStyles();
    
        return(
          <div>
            <SideBar></SideBar>
        <Toolbar></Toolbar>
        <div >
      <CssBaseline />
      <main className={classes.content}>
      <Box maxWidth="md" style={{paddingLeft:'250px'}}>
      <Typography variant="h3">Add Candidate</Typography>
      
       <br></br>
      <Form >
  <Form.Group controlId="CandidateName">
    <Form.Label>Candidate Name</Form.Label>
    <Form.Control type="name" placeholder="Enter Name of candidate" />
  </Form.Group>
  <Form.Group>
  <Form.Label>Select Constituency</Form.Label>
  <Form.Control as="select" >
  <option value="0">Choose...</option>
    <option value="1">Constituency 1</option>
    <option value="2">Constituency 2</option>
    <option value="3">Constituency 3</option>
    <option value="4">Constituency 4</option>
    <option value="5">Constituency 5</option>
  </Form.Control>
  </Form.Group>
  <Button variant="primary" type="submit" className="btn btn-dark ">
    Add candidate
  </Button>
</Form>
      </Box>
      </main>
    </div>
            
</div>

        );
        
            


       
    }
      
    
