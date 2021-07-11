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
    case 'CANDI_ARRAY_LENGTH1':
      return {
        ...state,
        candiArrayLength1: action.payload,
      };
    case 'CANDI_ARRAY_LENGTH2':
      return {
        ...state,
        candiArrayLength2: action.payload,
      };
    case 'CANDI_ARRAY_LENGTH3':
      return {
        ...state,
        candiArrayLength3: action.payload,
      };
    case 'ID_TO_VOTE1':
      return {
        ...state,
        idToVote1: action.payload,
      };
    case 'ID_TO_VOTE2':
      return {
        ...state,
        idToVote2: action.payload,
      };
    case 'ID_TO_VOTE3':
      return {
        ...state,
        idToVote3: action.payload,
      };
    case 'VOTER_INFO':
      return {
        ...state,
        singleVoterInfo: action.payload,
      };
    case 'ELECTION_STATUS':
      return {
        ...state,
        electionStatus: action.payload,
      };
      case 'CAST_VOTE':
        return {
          ...state,
          voteCast: action.payload,
        }
        case 'USER_BALANCE':
          return {
            ...state,
            userBalance: action.payload,
          }
          case 'ID_VOTE':
            return {
              ...state,
              idVote: action.payload,
            }
    default:
      return state;
  }
};
