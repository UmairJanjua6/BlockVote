import { Box , Typography} from "@material-ui/core";
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

export default function AddAdmin(){
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
      <Typography variant="h3">Add Admin</Typography>
       
      </Box>
      </main>
    </div>
   
</div>
);

}