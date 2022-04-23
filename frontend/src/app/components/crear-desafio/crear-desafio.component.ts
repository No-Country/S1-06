import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment'
import { ChallengeService } from '../../services/challenge.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  duration!: string
  categories!:Array<any>
  //Validación
  inicio: boolean = true
  estructura: boolean = false

  challenge = {
    id: -1
  }
  questions = [
    {
        number: "1",
        title: "",
        options: [
          { text: ""},
          { text: ""},
          { text: ""},
          { text: ""},
        ],
        select: "",
      },
    {
        number: "2",
        title: "",
        options: [
          { text: ""},
          { text: ""},
          { text: ""},
          { text: ""},
        ],
        select: "",
      },
    {
        number: "3",
        title: "",
        options: [
          { text: ""},
          { text: ""},
          { text: ""},
          { text: ""},
        ],
        select: "",
      },
    {
        number: "4",
        title: "",
        options: [
          { text: ""},
          { text: ""},
          { text: ""},
          { text: ""},
        ],
        select: "",
      },
    {
        number: "5",
        title: "",
        options: [
          { text: ""},
          { text: ""},
          { text: ""},
          { text: ""},
        ],
        select: "",
      },
    ]


  constructor(private http: HttpClient, private challengeService: ChallengeService, private router: Router) { }

  ngOnInit (): void {
    this.getCategories().subscribe(result => {
      this.categories = result
   })
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
  getCategories () {
    return this.http.get<any>(`${environment.api_url}categories/`);
  }

  getQuestionsForm () {
    return this.questions.map((question) => {
      let options = question.options.map((option, i) => {
        let is_correct = (Number(question.select) == i) ? true : false
        return {
          text: option.text,
          is_correct
        }
      })
      return {
        challenge: this.challenge.id,
        title: question.title,
        options,
      }
    })
  }


  create () {
    const challenge = {
      title: this.titulo,
      description: this.descripcion,
      category: this.lenguaje,
      level: this.nivel,
      duration: this.duration
    }
      Swal.fire({
        title: 'Creando...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        },
      })


    this.challengeService.create(challenge).subscribe(result => {
      this.challenge = result
      const questions = this.getQuestionsForm()
      this.challengeService.addQuestions(questions, this.challenge.id).subscribe(res => {
        Swal.fire({
          icon: 'success',
          title: 'Creado exitosamente!',
          showConfirmButton: true,
        }).then(_ => {
          this.router.navigate(['/desafíos'])
      })
      })
    })
  }
}
