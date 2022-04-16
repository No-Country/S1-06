import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-desafio',
  templateUrl: './crear-desafio.component.html',
  styleUrls: ['./crear-desafio.component.css']
})
export class CrearDesafioComponent implements OnInit {
  
  //Inicio formulario
  titulo!: string
  descripcion!: string
  lenguaje!: string
  nivel!: string

  //Validación
  inicio: boolean = true
  estructura: boolean = false

  //Fin del formulario
  pregunta1!: string
  pregunta2!: string
  pregunta3!: string
  pregunta4!: string
  pregunta5!: string
  
  //Pregunta 1
  opcion1!: string
  opcion2!: string
  opcion3!: string
  opcion4!: string

  //Pregunta 2
  opcion5!: string
  opcion6!: string
  opcion7!: string
  opcion8!: string

  //Pregunta 3
  opcion9!: string
  opcion10!: string
  opcion11!: string
  opcion12!: string

  //Pregunta 4
  opcion13!: string
  opcion14!: string
  opcion15!: string
  opcion16!: string

  //Pregunta 5
  opcion17!: string
  opcion18!: string
  opcion19!: string
  opcion20!: string


  constructor() { }

  ngOnInit(): void {
  }

  mostrar(){
    this.estructura = true
    this.inicio = false

    let bloque = document.getElementById('bloque')

  }

  inverso(){
    this.estructura = false
    this.inicio = true
  }
}
