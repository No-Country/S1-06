import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  //Datos del perfil
  email!: string;
  name!: string;
  surname!: string;
  description!: string;
  nationality!: string;
  state!: string;
  code!: string;
  password!:string;
  tpassword!:string;

  //Confirmar contraseña
  checkpass!:boolean

  //Confirmar términos
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
    console.log(this.terminos)
    if(this.terminos==false){
       this.terminos = true
    }else{
      this.terminos = false
    }
  }
}
