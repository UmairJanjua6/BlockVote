import { Box , Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Overview(){
    const classes = useStyles();
return(
    <main className={classes.content}>
      <Box maxWidth="md" style={{paddingLeft:'250px'}}>
      <Typography variant="h3">Overview</Typography>
       
      </Box>
      </main>
);

}