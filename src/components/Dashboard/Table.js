import React from 'react';
import $ from "jquery"

const Table = ({ employees, handleEdit, handleDelete }) => {
  employees.forEach((employee, i) => {
    employee.id = i + 1;
  });

  // sorting //
  $(function () {
  $('table')
    .on('click', 'th', function () {
      var index = $(this).index(),
          rows = [],
          thClass = $(this).hasClass('asc') ? 'desc' : 'asc';

      $('#example th').removeClass('asc desc');
      $(this).addClass(thClass);

      $('#example tbody tr').each(function (index, row) {
        rows.push($(row).detach());
      });

      rows.sort(function (a, b) {
        var aValue = $(a).find('td').eq(index).text(),
            bValue = $(b).find('td').eq(index).text();

        return aValue > bValue
             ? 1
             : aValue < bValue
             ? -1
             : 0;
      });

      if ($(this).hasClass('desc')) {
        rows.reverse();
      }

      $.each(rows, function (index, row) {
        $('#example tbody').append(row);
      });
    });
});

// search //
  $(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#example tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'IND',
    minimumFractionDigits: null,
  })
  
  return (
    <div className="contain-table">
      <div id="DataTable">
       <div id="table_box_bootstrap"></div>
      <table id="example" class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Email</th>
            <th>Salary (₹)</th>
            <th>Joining Date</th>
            <th>Address</th>
            <th>Mobile</th>
            <th colSpan={3} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee.id}>
                <td style={{fontFamily:"Times New Roman",fontSize:"18px"}}>{i + 1}</td>
                <td style={{fontFamily:"Times New Roman",fontSize:"18px"}}>{employee.name}</td>
                <td style={{fontFamily:"Times New Roman",fontSize:"18px"}}>{employee.designation}</td>
                <td style={{fontFamily:"Times New Roman",fontSize:"18px"}}>{employee.email}</td>
                <td style={{fontFamily:"Times New Roman",fontSize:"18px"}}>{employee.salary} ₹</td>
                <td style={{fontFamily:"Times New Roman",fontSize:"18px"}}>{employee.date} </td>
                <td style={{fontFamily:"Times New Roman",fontSize:"18px"}}>{employee.address}</td>
                <td style={{fontFamily:"Times New Roman",fontSize:"18px"}}>{employee.mobile}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="fa fa-edit"
                    id="tooltip"
                    style={{fontSize:"15px",backgroundColor:"dodgerblue"}} 
                  >
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="fa fa-trash" style={{fontSize:"15px",backgroundColor:"crimson"}} 
                  >
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10}><center><b>No Employee Records in The Table</b></center></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Table;
