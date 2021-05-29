import { Box, Typography } from "@material-ui/core";
import { Form, Button } from "react-bootstrap";
import SideBar from '../Components/SideBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '../../../voterFiles/context/GlobalState';
import { getCandidatesInConsi } from '../../../voterFiles/context/async';

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));
    
export default function Setting() {
    const classes = useStyles();
    const [{ accounts, contract}, dispatch] = useStore();
    console.log("data setting:", contract, accounts);
    return (

        <div>
            <SideBar></SideBar>
            <Toolbar />
            <div >
                <main className={classes.content}>
                    <Box maxWidth="md" style={{ paddingLeft: '250px' }}>

                    </Box>
                </main>
            </div>

        </div>
    );

}