export default (state, action) => {
  switch (action.type) {
    case 'SETUP_WEB3':
      return {
        ...state,
        web3: action.payload,
        web3LoadingErrorMessage: '',
        web3Loadded: true,
      };
    case 'SETUP_CONTRACT':
      return {
        ...state,
        contract: action.payload,
      };
    case 'ADD_ETHEREUM_ACCOUNTS':
      return {
        ...state,
        accounts: action.payload,
      };

    case 'ADD_CANDIDATE_INFO':
      return {
        ...state,
        addCandidateInfo: action.payload,
      };

    case 'GET_CANDIDATE_INFO':
      return {
        ...state,
        getCandidateInfo: action.payload,
      };
    case 'ADD_VOTER':
      return {
        ...state,
        voterInfo: action.payload,
      };
    case 'GET_VOTER_LIST':
      return {
        ...state,
        getVoterData: action.payload,
      };
    case 'MINT_VOTE':
      return {
        ...state,
        mintVotesDispatch: action.payload,
      };
    case 'VOTER_LIST_ARRAY':
      return {
        ...state,
        voterListArray: action.payload,
      };
    case 'AUTHORIZE_VOTE':
      return {
        ...state,
        authorizeVote: action.payload,
      };
    default:
      return state;
  }
};
