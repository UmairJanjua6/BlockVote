import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';


//initial state
const initialState = {
    voterInfo: [
        { name: 'Umair', cnic: 3740625280301, constituency: 1, address: '0x2445s4d5sd45f4se4fsd5f4s8e4f'},
        { name: 'Zaryab', cnic: 356979449234, constituency: 2, address: '0x2445s4d5sd45f4se4fsd5f4s8e4f'},
        { name: 'Sultan', cnic: 3124578798787, constituency: 3, address: '0x2445s4d5sd45f4se4fsd5f4s8e4f'}
    ]
}

// Create context 
export const GlobalContext = createContext(initialState);

// Provider Conponent
export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(useReducer, initialState);

    return (<GlobalContext.Provider value= {{
        voterInfo: state.voterInfo
    }}>
        {children} 
        </GlobalContext.Provider>);
}