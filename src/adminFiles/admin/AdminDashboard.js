import React from 'react';
//import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
//import Header from './Components/Header';
import SideBar from './Components/SideBar';

import Overview from './Pages/OverView';

export default  function Dashboard() {
  

  return (
    <div >
      {/* <CssBaseline /> */}
      {/* <Header></Header> */}
      <SideBar></SideBar>
      <Toolbar/>
      <Overview></Overview>
    </div>
    
  );
}
