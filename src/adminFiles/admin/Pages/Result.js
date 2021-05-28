import { Toolbar, Box } from "@material-ui/core"
import SideBar from "../Components/SideBar"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

export default function DisplayResult(){
    const classes = useStyles();
    return(

        <div>
            {/* <Header></Header> */}
            <SideBar></SideBar>
            <Toolbar/>
            <div >
      <main className={classes.content}>
      <Box maxWidth="md" style={{paddingLeft:'250px'}}>
      <h1>Display Result</h1>

      </Box>
      </main>
    </div>
        </div>
    );
}