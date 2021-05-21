export default (state, action) => {
    switch(action.type) {
        case 'SETUP_WEB3':
        return {
          ...state,
          web3: action.payload,
          web3LoadingErrorMessage: "",
          web3Loadded: true
        }
        case 'SETUP_CONTRACT':
        return {
          ...state,
          contract: action.payload
        }
        case 'ADD_ETHEREUM_ACCOUNTS':
        return {
          ...state,
          accounts: action.payload
        }
        default: 
        return state;
    }
    
}