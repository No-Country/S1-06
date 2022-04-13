import {throwError} from 'rxjs';
import Swal from 'sweetalert2';

export function handleError (error: any) {
      let errorMessage = '';
      if (error.status === 400) {
        const errors = error.error
        let html = ''
        Object.keys(errors).forEach((key) => {
          let field = `<p>${key}: ${errors[key]}</p>`
          html += field
        })
        Swal.fire({
          title: 'Por favor verifique los siguientes campos',
          icon: 'error',
          html: html,
        })
      }
      else {
         errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: errorMessage,
          })
      }
      return throwError(() => {
        return errorMessage;
      });
  }
