import Swal from 'sweetalert2';

export default class ErrorMessages {
    public constructor() {}

    public static displayErrorPopupMessage = (message: string): void => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: message,
          showConfirmButton: false,
          timer: 2500
        });
      }
    
      public static displaySuccessPopupMessage = (message: string): void => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: message,
          showConfirmButton: false,
          timer: 2500
        });
      }
}