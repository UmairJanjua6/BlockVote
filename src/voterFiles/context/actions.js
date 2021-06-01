export const setupWeb3 = (web3) => {
    return {
        type: 'SETUP_WEB3',
        payload: web3
    };
}

export const setupContract = (contract) => {
    return {
        type: 'SETUP_CONTRACT',
        payload: contract
    };
}

export const addEthereumAccounts = (accounts) => {
    return {
        type: 'ADD_ETHEREUM_ACCOUNTS',
        payload: accounts
    };
}

export const addCandidateInfo = (_conNum, _candidateAddress, _name) => {
    return {
        type: 'ADD_CANDIDATE_INFO',
        payload: _conNum, _candidateAddress, _name
    };
}

export const getCandidateInfo = (candidateListArray) => {
    return {
        type: 'GET_CANDIDATE_INFO',
        payload: candidateListArray
    }
}

export const addVoterInfo = (voterInfo) => {
    return {
        type: 'ADD_VOTER',
        payload: voterInfo
    }
}

export const getVoterData = (voterList) => {
    return {
        type: 'GET_VOTER_LIST',
        payload: voterList
    }
}

export const mintNewVote = (mintNewVotes) => {
    return {
        type: 'MINT_VOTE',
        payload: mintNewVotes
    }
}

export const voterListArray = (voterArrayList) => {
    return {
        type: 'VOTER_LIST_ARRAY',
        payload: voterArrayList
    }
}

export const authorizeVote = (authorizeVoter) => {
    return {
        type: 'AUTHORIZE_VOTE',
        payload: authorizeVoter
    }
}