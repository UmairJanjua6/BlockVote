import React from 'react';
import Voter from './voterFiles/voter.js';
import Admin from './admin';
import {GlobalProvider} from './voterFiles/context/GlobalState.js';

function App() {
    return(
        <GlobalProvider>
            <Voter />
            <Admin />
        </GlobalProvider>
    );
}

export default App;

