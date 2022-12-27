import React from 'react';
import $ from "jquery"
import Logout from '../Logout';

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header>
      <h1><center>Employee Details</center></h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button onClick={() => setIsAdding(true)}>Add Employee</button>
        <Logout setIsAuthenticated={setIsAuthenticated}/>
      </div>
      <input type="text" id="myInput" placeholder="Search Here.." />
    </header>
  );
};

export default Header;
