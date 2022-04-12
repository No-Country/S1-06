import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '../../services/character.service';

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

  constructor(private servicioUsuario: CharacterService, private router: Router) { }

  ngOnInit(): void {
  }

  registrar(){
    let usuario = {
      email : this.email,
      name: this.name,
      surname: this.name,
      nationality: this.nationality,
      state: this.state,
      code: this.code,
      password: this.password,
    }

    if (sessionStorage.getItem('idUser') == null){
      this.servicioUsuario.post_usuario(usuario).subscribe(
        (response:any)=>{
          let nameUser = response ['applicant_profile']['first_name']
          let idUser : any = sessionStorage.getItem('idUsuario');

            }
          )
        }
    
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
