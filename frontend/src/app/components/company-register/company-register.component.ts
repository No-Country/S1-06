import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit {

  //Datos de la empresa
  email!: string;
  razonSocial!: string;
  phone!: string;
  description!: string;
  password!: string;
  tpassword!: string

  //Ubicación de las oficinas
  country!: string;
  state!: string;
  locality!: string;
  code!: string;
  street!: string;
  by!: string;

  //Razón de la solicitud, términos y condiciones, y verificar password
  checkpass!: boolean
  application!: string;
  terminos: boolean = false

  constructor() { }

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

}
