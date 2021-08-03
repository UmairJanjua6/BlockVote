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
  singleVoterInfo,
  electionStatus,
  voteCast,
  userBalance,
  idVote,
  handleReceipt,
  verificationSuccess,
  ownerAddress,
} from './actions';

export const loadBlockchain = async dispatch => {
  try {
    if (Web3.givenProvider) {
      const web3 = new Web3 (Web3.givenProvider);
      await Web3.givenProvider.enable ();
      dispatch (setupWeb3 (web3));
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      dispatch (setupContract (contract));
      const accounts = await web3.eth.getAccounts ();
      var owner = await contract.methods.owner().call();
      dispatch(ownerAddress(owner));
      dispatch (addEthereumAccounts (accounts));
    }
  } catch (error) {
    console.log ('Error in loading Web3 = ', error);
    if (error.code === 4001) {
      alert(error.message);
    }
  }
};

export const addVoter = async (
  address,
  name,
  cnic,
  email,
  constituency,
  contract,
  accounts,
  dispatch
) => {
  try {
    const receipt = await contract.methods
      .addVoter (address, name, cnic, email, constituency)
      .send ({from: accounts[0]});
    dispatch (addVoterInfo (address, name, cnic, email, constituency));
    console.log ('async voter info: ', receipt);
    if(receipt) {
    dispatch(handleReceipt(receipt));
    }
  } catch (error) {
    if(error.code === "INVALID_ARGUMENT") {
      alert("Please enter valid address");
    } else if (error.code === 4001) {
      alert(error.message);
    }
    console.log(error);
  }
};

export const getVoterDetails = async (
  voterAddress,
  accounts,
  contract,
  dispatch
) => {
  try {
    const receipt = await contract.methods
      .getVoterInfo (voterAddress)
      .call ({from: accounts[0]});
    dispatch (singleVoterInfo (receipt));
    console.log ('receipt: ', receipt);
  } catch (error) {
    console.log ('error: ', error);
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
    if(receipt) {
      dispatch(handleReceipt(receipt));
    }
    console.log ('receipt: ' + receipt);
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
    const receipt = await contract.methods
      .mint(_conNum, _totalVotes, _uri, _id, _data)
      .send ({from: accounts[0]});
      if(receipt) {
      dispatch(handleReceipt(receipt));
      }
    console.log ('receipt: ' + receipt);
  } catch (error) {
    console.log ('error: ' + error);
  }
};

export const candidateArrayLength1 = async (
  consNum,
  accounts,
  contract,
  dispatch
) => {
  try {
    const receipt = await contract.methods
      .getCandidateLength (consNum)
      .call ({from: accounts[0]});
    dispatch (candiArrayLength1 (receipt));
    console.log ('receipt: ' + receipt);
  } catch (error) {
    console.log ('error: ' + error);
  }
};

export const candidateArrayLength2 = async (
  consNum,
  accounts,
  contract,
  dispatch
) => {
  try {
    const receipt = await contract.methods
      .getCandidateLength (consNum)
      .call ({from: accounts[0]});
    dispatch (candiArrayLength2 (receipt));
    console.log ('receipt: ' + receipt);
  } catch (error) {
    console.log ('error: ' + error);
  }
};

export const candidateArrayLength3 = async (
  consNum,
  accounts,
  contract,
  dispatch
) => {
  try {
    const receipt = await contract.methods
      .getCandidateLength (consNum)
      .call ({from: accounts[0]});
    dispatch (candiArrayLength3 (receipt));
    console.log ('receipt: ' + receipt);
  } catch (error) {
    console.log ('error: ' + error);
  }
};

export const getVotes1 = async (_id, accounts, contract, dispatch) => {
  try {
    const receipt = await contract.methods
      .idToVotes (_id)
      .call ({from: accounts[0]});
    console.log ('receipt: ' + receipt);
    dispatch (idToVote1 (receipt));
  } catch (error) {
    console.log ('error: ' + error);
  }
};

export const getVotes2 = async (_id, accounts, contract, dispatch) => {
  try {
    const receipt = await contract.methods
      .idToVotes (_id)
      .call ({from: accounts[0]});
    console.log ('receipt: ' + receipt);
    dispatch (idToVote2 (receipt));
  } catch (error) {
    console.log ('error: ' + error);
  }
};

export const getVotes3 = async (_id, accounts, contract, dispatch) => {
  try {
    const receipt = await contract.methods
      .idToVotes (_id)
      .call ({from: accounts[0]});
    console.log ('receipt: ' + receipt);
    dispatch (idToVote3 (receipt));
  } catch (error) {
    console.log ('error: ' + error);
  }
};

export const startElection = async (accounts, contract) => {
  try {
    const receipt = await contract.methods
      .startElection()
      .send ({from: accounts[0]});
    console.log ('receipt set: ' + receipt);
  } catch (error) {
    console.log ('error: ' + error);
  }
};

export const endElection = async (accounts, contract) => {
  try {
    const receipt = await contract.methods
      .endElection()
      .send ({from: accounts[0]});
    console.log ('receipt set: ' + receipt);
  } catch (error) {
    console.log ('error: ' + error);
  }
};

export const electionStatusGet = async (accounts, contract, dispatch) => {
  try {
    const receipt = await contract.methods
      .getElectionStatus()
      .call ({from: accounts[0]});
    dispatch (electionStatus (receipt));
    console.log('receipt: ' + receipt);
  } catch (error) {
    console.log ('electionStatusGet error: ' + error);
  }
};

export const vote = async (
  _candidateAddress,
  _voteConstituency,
  accounts,
  contract,
  dispatch
) => {
  try {
    const receipt = await contract.methods
      .vote (_candidateAddress, _voteConstituency, '0x00')
      .send ({from: accounts[0]});
    dispatch(voteCast(receipt));
    if(receipt) {
      dispatch(handleReceipt(receipt));
    }
  } catch (error) {
    console.log ('error vote: ' + error);
  }
};

export const getBalance = async (address, id, contract, accounts, dispatch) => {
  try {
    const receipt = await contract.methods.balanceOfBatch(address, id).call({from: accounts[0]});
    dispatch(userBalance(receipt));
    console.log("balance async: " + receipt);
  } catch (error) {
    console.log ('error getBalance: ' + error);
  }
}

export const idToVote = async (id, contract, accounts, dispatch) => {
  try {
    const receipt = await contract.methods.idToVotes(id).call({from: accounts[0]});
    dispatch(idVote(receipt));
    console.log("id async: " + receipt);
  } catch (error) {
    console.log ('error getBalance: ' + error);
  }
}

export const verifyEmail = async (address, contract, accounts, dispatch) => {
  try {
     const receipt = await contract.methods.setEmailStatus(address, "true").send({from: accounts[0]});
    dispatch(verificationSuccess(receipt));
  } catch (error) {
    console.log("verify Email error", error);
  }
}
