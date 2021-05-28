import Web3 from "web3";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './contract';
import { setupWeb3, setupContract, addEthereumAccounts, addCandidateInfo, getCandidateInfo, addVoterInfo, getVoterData} from "./actions";





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
            // let voteraddresses = await contract.methods.getVoterAddress().call();
            
        }

    }
    catch (error) {
        console.log("Error in loading Web3 = ", error);
        if (error.code === 4001) {

        }
    }
}

export const addVoter = async (address, name, cnic, constituency, contract, accounts, dispatch) => {
    try {
        const receipt = await contract.methods.addVoter(address, name, cnic, constituency).send({ from: accounts[0] });
        dispatch(addVoterInfo(address, name, cnic, constituency));
        console.log("aynce voter info: ", receipt);
    }
    catch (error) {
        console.log(error)

    }
}

export const getVoterList = async (dispatch) => {
    try {
        const web3 = new Web3(Web3.givenProvider);
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        const accounts = await web3.eth.getAccounts();
        let voterArray = [];
        voterArray = await contract.methods.getVoterAddress().call({ from: accounts[0]});
        let addressesLength = voterArray.length;
            for (let i = 0; i < addressesLength; i++) {
                let getVoterDetails = await contract.methods.getVoterInfo(voterArray[i]).call();
                dispatch(getVoterData(getVoterDetails));
            }
    }
    catch(error) {
        console.log("error: ", error);
    }
}

export const deleteVoter = async (_voterAddress, contract, accounts) => {
    try {
        const receipt = await contract.methods.deleteVoter(_voterAddress).send({ from: accounts[0] });
        console.log(receipt)
    }
    catch (error) {
        console.log(error)

    }
}

export const addCandidate = async (_conNum, _candidateAddress, _name,accounts, contract, dispatch) => {
    try {
        const receipt = await contract.methods.addCandidate(_conNum, _candidateAddress, _name).send({from: accounts[0]});
        dispatch(addCandidateInfo(_conNum, _candidateAddress, _name));
        console.log("receipt: " + receipt);
    }
    catch (error) {
        console.log("error: " + error);
    }
}

export const getCandidatesInConsi = async (_conNum, contract, accounts, dispatch) => {
    try {
        var candidateList = [];
        candidateList = await contract.methods.getCandidatesInConsi(_conNum).call({ from: accounts[0]});
        dispatch(getCandidateInfo(candidateList));
        console.log("array: ", candidateList);
    }
    catch (error) {
        console.log("error: ", error);
    }
}
