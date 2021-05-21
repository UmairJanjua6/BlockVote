
import Web3 from "web3";
import {CONTRACT_ADDRESS,CONTRACT_ABI } from './contract';
import { setupWeb3, setupContract, addEthereumAccounts, } from "./actions";





export const loadBlockchain = async (dispatch) => {
    try {
        console.log("Web3 = ", Web3);
        console.log("Web3.givenProvider = ", Web3.givenProvider.chainId);
        if (Web3.givenProvider) {
            const web3 = new Web3(Web3.givenProvider);
            await Web3.givenProvider.enable();
            dispatch(setupWeb3(web3));
            const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
            dispatch(setupContract(contract));
            const accounts = await web3.eth.getAccounts();
            dispatch(addEthereumAccounts(accounts));
        }

    }
    catch (error) {
        console.log("Error in loading Web3 = ", error);
        if (error.code === 4001) {

        }
    }
}
