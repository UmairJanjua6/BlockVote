import { Box , Typography} from "@material-ui/core";
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

export default function ElectionStatus(){
  const classes = useStyles();
return(

    <div>
    <CssBaseline/>
    <SideBar></SideBar>
    <Toolbar/>
    <div >
      <CssBaseline />
      <main className={classes.content}>
      <Box maxWidth="md" style={{paddingLeft:'250px'}}>
      <Typography variant="h3">Update Status of Election</Typography>
       <br></br>
<Form>
<Form.Group>
<Button variant="primary" type="submit" className="btn btn-dark ">
   Start Election
  </Button>
</Form.Group>
<Form.Group>
<Button variant="primary" type="submit" className="btn btn-dark ">
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