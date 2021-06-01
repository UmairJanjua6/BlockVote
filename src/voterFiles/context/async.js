import Web3 from 'web3';
import {CONTRACT_ADDRESS, CONTRACT_ABI} from './contract';
import {
  setupWeb3,
  setupContract,
  addEthereumAccounts,
  addCandidateInfo,
  getCandidateInfo,
  addVoterInfo,
  authorizeVote,
  voterListArray,
  getVoterData,
  candiArrayLength1,
  candiArrayLength2,
  candiArrayLength3,
  idToVote1,
  idToVote2,
  idToVote3,
} from './actions';

export const loadBlockchain = async dispatch => {
  try {
    console.log ('Web3 = ', Web3);
    console.log ('Web3.givenProvider = ', Web3.givenProvider.chainId);
    if (Web3.givenProvider) {
      const web3 = new Web3 (Web3.givenProvider);
      await Web3.givenProvider.enable ();
      dispatch (setupWeb3 (web3));
      const contract = new web3.eth.Contract (CONTRACT_ABI, CONTRACT_ADDRESS);
      dispatch (setupContract (contract));
      const accounts = await web3.eth.getAccounts ();
      dispatch (addEthereumAccounts (accounts));
    }
  } catch (error) {
    console.log ('Error in loading Web3 = ', error);
    if (error.code === 4001) {
    }
  }
};

export const addVoter = async (
  address,
  name,
  cnic,
  constituency,
  contract,
  accounts,
  dispatch
) => {
  try {
    const receipt = await contract.methods
      .addVoter (address, name, cnic, constituency)
      .send ({from: accounts[0]});
    dispatch (addVoterInfo (address, name, cnic, constituency));
    console.log ('aynce voter info: ', receipt);
  } catch (error) {
    console.log (error);
  }
};

export const getVoterList = async (dispatch, contract, accounts) => {
  try {
    let voterArray = [];
    voterArray = await contract.methods
      .getVoterAddress ()
      .call ({from: accounts[0]});
    dispatch (voterListArray (voterArray));
    let addressesLength = voterArray.length;
    let getVoterDetails = [];
    for (let i = 0; i < addressesLength; i++) {
      getVoterDetails[i] = await contract.methods
        .getVoterInfo (voterArray[i])
        .call ();
      dispatch (getVoterData (getVoterDetails));
    }
  } catch (error) {
    console.log ('error: ', error);
  }
};

export const authorizeVoter = async (
  _voterAddress,
  _id,
  contract,
  accounts,
  dispatch
) => {
  try {
    const receipt = await contract.methods
      .authorizeVoter (_voterAddress, _id, '0x00')
      .send ({from: accounts[0]});
    dispatch (authorizeVote (authorizeVoter));
    console.log ('receipt: ' + receipt);
  } catch (error) {
    console.log ('error: ', error);
  }
};

export const deleteVoter = async (
  _voterAddress,
  _index,
  contract,
  accounts
) => {
  try {
    const receipt = await contract.methods
      .deleteVoter (_voterAddress, _index)
      .send ({from: accounts[0]});
    console.log (receipt);
  } catch (error) {
    console.log (error);
  }
};

export const addCandidate = async (
  _conNum,
  _candidateAddress,
  _name,
  contract,
  accounts,
  dispatch
) => {
  try {
    const receipt = await contract.methods
      .addCandidate (_conNum, _candidateAddress, _name)
      .send ({from: accounts[0]});
    dispatch (addCandidateInfo (_conNum, _candidateAddress, _name));
    console.log ('receipt: ' + receipt);
    console.log ('AC after');
  } catch (error) {
    console.log ('error: ' + error);
  }
};

export const getCandidatesInConsi = async (
  _conNum,
  contract,
  accounts,
  dispatch
) => {
  try {
    var candidateList = [];
    candidateList = await contract.methods
      .getCandidatesInConsi (_conNum)
      .call ({from: accounts[0]});
    dispatch (getCandidateInfo (candidateList));
    console.log ('array: ', candidateList);
    console.log("length: ", candidateList.length);
  } catch (error) {
    console.log ('error: ', error);
  }
};

export const mintVotes = async (
  _conNum,
  _totalVotes,
  _uri,
  _id,
  _data,
  accounts,
  contract,
  dispatch
) => {
  try {
    console.log ('aaaaaaa: ');
    const receipt = await contract.methods
      .mint (_conNum, _totalVotes, _uri, _id, _data)
      .send ({from: accounts[0]});
    console.log ('receipt: ' + receipt);
  } catch (error) {
    console.log ('error: ' + error);
  }
};

export const candidateArrayLength1 = async (consNum, accounts, contract, dispatch) => {
    try {
        const receipt = await contract.methods.getCandidateLength(consNum).call({from: accounts[0]});
        dispatch(candiArrayLength1(receipt));
        console.log("receipt: " + receipt);
    } catch (error) {
        console.log("error: " + error);
    }
}

export const candidateArrayLength2 = async (consNum, accounts, contract, dispatch) => {
    try {
        const receipt = await contract.methods.getCandidateLength(consNum).call({from: accounts[0]});
        dispatch(candiArrayLength2(receipt));
        console.log("receipt: " + receipt);
    } catch (error) {
        console.log("error: " + error);
    }
}

export const candidateArrayLength3 = async (consNum, accounts, contract, dispatch) => {
    try {
        const receipt = await contract.methods.getCandidateLength(consNum).call({from: accounts[0]});
        dispatch(candiArrayLength3(receipt));
        console.log("receipt: " + receipt);
    } catch (error) {
        console.log("error: " + error);
    }
}

export const getVotes1 = async (_id, accounts, contract, dispatch) => {
  try {
    const receipt = await contract.methods.idToVotes(_id).call({from: accounts[0]});
    console.log("receipt: " + receipt);
    dispatch(idToVote1(receipt));
  } catch (error) {
    console.log("error: " + error);
  }
}

export const getVotes2 = async (_id, accounts, contract, dispatch) => {
  try {
    const receipt = await contract.methods.idToVotes(_id).call({from: accounts[0]});
    console.log("receipt: " + receipt);
    dispatch(idToVote2(receipt));
  } catch (error) {
    console.log("error: " + error);
  }
}

export const getVotes3 = async (_id, accounts, contract, dispatch) => {
  try {
    const receipt = await contract.methods.idToVotes(_id).call({from: accounts[0]});
    console.log("receipt: " + receipt);
    dispatch(idToVote3(receipt));
  } catch (error) {
    console.log("error: " + error);
  }
}
