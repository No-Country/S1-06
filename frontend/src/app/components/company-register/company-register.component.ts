import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecruiterService } from '../../services/recruiter.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit {

  //Datos de la empresa
  email!: string;
  name!: string;
  phone!: string;
  description!: string;
  password!: string;
  tpassword!: string
  reason!: string;
  //Ubicación de las oficinas
  country!: string;
  state!: string;
  postalCode!: string;
  city!: string;

  //Razón de la solicitud, términos y condiciones, y verificar password
  checkpass!: boolean
  application!: string;
  terminos: boolean = false

  constructor(private service: RecruiterService, private router: Router) { }

  ngOnInit(): void {
  }

  equalpass(){
    if(this.password===this.tpassword){
      this.checkpass = true
    }else{
      this.checkpass = false
    }
  }

  checkterminos(){
    if(this.terminos==false){
       this.terminos = true
    }else{
      this.terminos = false
    }
    console.log(this.terminos)
  }

  register () {
      const profile = {
      name: this.name,
      phone: this.phone,
      request_reason: this.reason,
      description: this.description,
      location: {
        country: this.country,
        city: this.city,
        postal_code: this.postalCode,
      }
    }
    let applicant = {
      email : this.email,
      password: this.password,
      recruiter_profile: profile
    }

    this.service.create(applicant).subscribe(_ => {
      Swal.fire({
        icon: "success",
        title:"¡Cuenta creada exitosamente!"
      }).then(_ => { this.router.navigate(['/login'])})
    })

  }
}
