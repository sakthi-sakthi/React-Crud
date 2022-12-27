import React, { useState } from 'react';
import Swal from 'sweetalert2';
import $ from "jquery"

const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing }) => {
  const id = selectedEmployee.id;

  const [name, setname] = useState(selectedEmployee.name);
  const [designation, setdesignation] = useState(selectedEmployee.designation);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [salary, setSalary] = useState(selectedEmployee.salary);
  const [date, setDate] = useState(selectedEmployee.date);

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

  const handleUpdate = e => {
    e.preventDefault();

    if (!name || !designation || !email || !salary || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'You Missed Some Fields.',
        showConfirmButton: true,
        color:'red',
      });
    }

    const employee = {
      id,
      name,
      designation,
      email,
      salary,
      date,
    };

    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        employees.splice(i, 1, employee);
        break;
      }
    }

    localStorage.setItem('employees_data', JSON.stringify(employees));
    setEmployees(employees);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated Successfully!',
      text: `${employee.name}'s data has been updated.`,
      showConfirmButton: true,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
        <label htmlFor="name">Name <span class="required" style={{color: "red"}}>*</span></label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={e => setname(e.target.value)}
        />
        <label htmlFor="designation">Designation <span class="required" style={{color: "red"}}>*</span></label>
        <input
          id="designation"
          type="text"
          name="designation"
          value={designation}
          onChange={e => setdesignation(e.target.value)}
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
        />
        <label htmlFor="salary">Salary (₹) <span class="required" style={{color: "red"}}>*</span></label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={salary}
          onChange={e => setSalary(e.target.value)}
        />
        <label htmlFor="date">Date of Joining <span class="required" style={{color: "red"}}>*</span></label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
