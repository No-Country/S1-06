import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email!: string
  password!:string
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login () {
    this.auth.login(this.email, this.password)
      .subscribe(({ user }) => {
        const dashboardName = this.getDashboardName(user)
        this.router.navigate([dashboardName]);
       },
        (errorResponse) => {
          if (errorResponse == 'Unauthorized') {
            this.swalError('Correo electrónico o contraseña invalidas!')
          } else {
            this.swalError('Error de servidor')
          }
        });
  }

  getDashboardName(user: any) {
    if (user.is_superuser) {
      return '/inicio-admin'
    }
    if (user.is_recruiter) {
      return '/inicio-empresa'
    }
    return '/inicio-usuario'
  }
  swalError (text: string) {
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: text,
    })
  }
}
