import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantService } from '../../services/applicant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //Datos del perfil
  email!: string;
  name!: string;
  lastName!: string;
  surname!: string;
  description!: string;
  country!: string;
  city!: string;
  postalCode!: string;
  password!:string;
  tpassword!:string;

  //Confirmar contraseña
  checkpass!:boolean

  //Confirmar términos
  terminos: boolean = false

  constructor(private applicantService: ApplicantService, private router: Router) { }

  ngOnInit(): void {
  }

  registrar(){

    const profile = {
      first_name: this.name,
      last_name: this.lastName,
      location: {
        country: this.country,
        city: this.city,
        postal_code: this.postalCode
      }
    }
    let applicant = {
      email : this.email,
      password: this.password,
      applicant_profile: profile
    }

    this.applicantService.create(applicant).subscribe(res => {
      Swal.fire({
        icon: "success",
        title: "Cuenta creada exitosamente!"
      }).then(_ => { this.router.navigate(['/login'])})
    })

  }

  equalpass(){
    if(this.password===this.tpassword){
      this.checkpass = true
    }else{
      this.checkpass = false
    }
  }

  checkterminos(){
    console.log(this.terminos)
    if(this.terminos==false){
       this.terminos = true
    }else{
      this.terminos = false
    }
  }
}
