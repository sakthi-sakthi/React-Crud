import React from 'react';
import $ from "jquery"
import Logout from '../Logout';

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header>
      <h1 style={{fontFamily:"Georgia",fontSize:"35px",letterSpacing:"2px"}}><center>Employee Details</center></h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button onClick={() => setIsAdding(true)} className="fa fa-user-plus" style={{fontSize:"15px",backgroundColor:"dodgerblue"}}></button>
        <Logout setIsAuthenticated={setIsAuthenticated}/>
      </div>
      <input type="text" id="myInput" placeholder="Search Here.." />
    </header>
  );
};

export default Header;
