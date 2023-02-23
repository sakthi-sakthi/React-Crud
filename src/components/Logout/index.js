import React from 'react';
import Swal from 'sweetalert2';

const Logout = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Logging Out',
      text: 'Are you sure you want to log out?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: 'crimson',
    }).then(result => {
      if (result.value) {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
           title:'Please Wait',
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            localStorage.setItem('is_authenticated', false);
            setIsAuthenticated(false);
            
            Swal.fire({
            icon: 'success',
            title: 'Successfully logged out!',
            showConfirmButton: true,
            confirmButtonColor:'red',
          });
          },
        });
      }
    });
  };

  return (
    <button
      style={{ marginLeft: '12px',fontSize:"15px",backgroundcolor:"crimson" }}
      className="fa fa-power-off" id="GetFile"
      onClick={handleLogout}
    >
    </button>
  );
};

export default Logout;
