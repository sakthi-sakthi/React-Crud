import React from 'react';
import $ from "jquery"

const Table = ({ employees, handleEdit, handleDelete }) => {
  employees.forEach((employee, i) => {
    employee.id = i + 1;
  });

  /*****************************/
  const isBackgroundRed = true;
  const isBackgroundBrown = true;
  /*****************************/

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
  });
  
  return (
    <div className="contain-table">
      <table id="example" class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Email</th>
            <th>Salary(₹)</th>
            <th>Date of Joining</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee.id}>
                <td>{i + 1}</td>
                <td>{employee.name}</td>
                <td>{employee.designation}</td>
                <td>{employee.email}</td>
                <td>{employee.salary} ₹</td>
                <td>{employee.date} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="fa fa-edit" 
                  >
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="fa fa-trash" style={{
        backgroundColor: isBackgroundRed ? 'red' : 'blue',marginleft: '100px',
      }}
                  >
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}><center><b>No Employee Records in The Table</b></center></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
