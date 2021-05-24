
import Web3 from "web3";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './contract';
import { setupWeb3, setupContract, addEthereumAccounts, addCandidateInfo} from "./actions";





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
            let voteraddresses = await contract.methods.getVoterAddress().call();
            let addressesLength = voteraddresses.addressesLength
            for (let i = 0; i < addressesLength; i++) {
                let getVoterDetails = await contract.methods.getVoterInfo(voteraddresses[i]).call();
                console.log(getVoterDetails);
            }
        }

    }
    catch (error) {
        console.log("Error in loading Web3 = ", error);
        if (error.code === 4001) {

        }
    }
}

export const addVoter = async (_voterAddress, name, cnic, voteConstituency, contract, accounts) => {
    try {
        const receipt = await contract.methods.addVoter(_voterAddress, name, cnic, voteConstituency).send({ from: accounts[0] });
        console.log(receipt)
    }
    catch (error) {
        console.log(error)

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


