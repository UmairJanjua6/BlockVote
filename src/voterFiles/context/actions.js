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

export const idToVote1 = (voteId) => {
    return {
        type: 'ID_TO_VOTE1',
        payload: voteId
    }
}

export const idToVote2 = (voteId) => {
    return {
        type: 'ID_TO_VOTE2',
        payload: voteId
    }
}

export const idToVote3 = (voteId) => {
    return {
        type: 'ID_TO_VOTE3',
        payload: voteId
    }
}

export const candiArrayLength1 = (length) => {
    return {
        type: 'CANDI_ARRAY_LENGTH1',
        payload: length
    }
}

export const candiArrayLength2 = (length) => {
    return {
        type: 'CANDI_ARRAY_LENGTH2',
        payload: length
    }
}

export const candiArrayLength3 = (length) => {
    return {
        type: 'CANDI_ARRAY_LENGTH3',
        payload: length
    }
}

export const singleVoterInfo = (info) => {
    return {
        type: 'VOTER_INFO',
        payload: info
    }
}

export const electionStatus = (flag) => {
    return {
        type: 'ELECTION_STATUS',
        payload: flag
    }
}

export const voteCast = (status) => {
    return {
        type: 'CAST_VOTE',
        payload: status
    }
}