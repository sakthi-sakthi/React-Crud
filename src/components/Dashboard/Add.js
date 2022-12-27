import React, { useState } from 'react';
import Swal from 'sweetalert2';
import $ from "jquery"

const Add = ({ employees, setEmployees, setIsAdding }) => {
  const [name, setname] = useState('');
  const [designation, setdesignation] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [date, setDate] = useState('');

  /*validation*/

  $(function(){
    var dtToday = new Date();
    
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    
    var maxDate = year + '-' + month + '-' + day;
    $('#date').attr('max', maxDate);
  });

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

  const handleAdd = e => {
    e.preventDefault();

    if (!name || !designation || !email || !salary || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Warning!',
        text:'You Must Enter all the Details *',
        showConfirmButton: true,
        showCancelButton:false,
        color:'red',
      });
    }

    const id = employees.length + 1;
    const newEmployee = {
      id,
      name,
      designation,
      email,
      salary,
      date,
    };

    employees.push(newEmployee);
    localStorage.setItem('employees_data', JSON.stringify(employees));
    setEmployees(employees);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added Successfully!',
      text: `${name}'s data has been Added.`,
      showConfirmButton: true,
    });
  };


    $('form input[name="name"]').blur(function (e) {
    var regex = new RegExp("^[a-zA-Z. ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(name)) {
        $('.msgs').hide();
        $('.successs').show();
    } else {
        $('.msgs').hide();
        $('.errors').show();
    }
    });

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Employee Details</h1>
        <label htmlFor="name">Name <span class="required" style={{color: "red"}}>*</span></label>
        <p class="Error"></p>
        <span class="msgs errors">Enter Only Alphabets *</span>
          <span class="msgs successs">You Enterd a Valid Name !</span>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={e => setname(e.target.value)}
          autoComplete="off"
          class="txtOnly"
        />

        <label htmlFor="designation">Designation <span class="required" style={{color: "red"}}>*</span></label>
        <input
          id="designation"
          type="text"
          name="designation"
          value={designation}
          onChange={e => setdesignation(e.target.value)}
          autoComplete="off"

        />

        <label htmlFor="email">Email <span class="required" style={{color: "red"}}>*</span></label>
        <span class="msg error">Invalid email address *</span>
        <span class="msg success">Valid email address *</span>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="off"
        />

        <label htmlFor="salary">Salary (₹) <span class="required" style={{color: "red"}}>*</span></label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={salary}
          onChange={e => setSalary(e.target.value)}
          autoComplete="off"
        />

        <label htmlFor="date">Date of Joining <span class="required" style={{color: "red"}}>*</span></label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          autoComplete="off"
        />

        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>

      </form>
    </div>
  );
};

export default Add;
