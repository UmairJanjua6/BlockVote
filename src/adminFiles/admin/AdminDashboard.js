import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import SideBar from './Components/SideBar';

import Overview from './Pages/OverView';

export default  function Dashboard() {
  

  return (
    <div >
      <SideBar></SideBar>
      <Toolbar/>
      <Overview></Overview>
    </div>
    
  );
}
