import React, { useState } from 'react';
import Swal from 'sweetalert2';
import $ from "jquery"


const Login = ({setIsAuthenticated }) => {
  const Email = 'abc@gmail.com';
  const Password = 'abcd';

  const [email, setEmail] = useState('abc@gmail.com');
  const [password, setPassword] = useState('abcd');

  /*validation*/
  
  $('form input[name="email"]').blur(function () {
    var email = $(this).val();
    var re = /[A-Z0-9.]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
    if (re.test(email)) {
        $('.msg').hide();
        $('.success').show();
    } else {
        $('.msg').hide();
        $('.error').show();
    }
    });

  /*validation*/

  const handleLogin = e => {
    e.preventDefault();

    if (email === Email && password === Password) {
      Swal.fire({
        timer: 1500,
        title:'Please Wait',
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          localStorage.setItem('is_authenticated', true);
          setIsAuthenticated(true);

          Swal.fire({
            icon: 'success',
            title: 'Successfully logged in!',
            showConfirmButton: true,
          });
        },
      });
    } else {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        title:'Please Wait',
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Please Check Your Login Credentials.',
            showConfirmButton: true,
          });
        },
      });
    }
  };


  return (
    <div className="small-container">
      <form onSubmit={handleLogin} id={"form"}>
        <h1>Login</h1>
        <label htmlFor="email">Email  <span className="required" style={{color: "red"}}>*</span></label>
         <span class="msg error">Invalid email address *</span>
          <span class="msg success">Valid email address *</span>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter Username"
          onChange={e => setEmail(e.target.value)}
          autoComplete="off"
          required
          
        />

        <label htmlFor="password">Password <span className="required" style={{color: "red"}}>*</span></label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={e => setPassword(e.target.value)}
          minLength="4"
          maxLength="12"
          autoComplete="off"
          required
        />
        <input style={{ marginTop: '12px' }} type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
