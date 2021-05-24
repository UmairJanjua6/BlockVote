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
