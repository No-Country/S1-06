import { ApplicantService } from './../../services/applicant.service';
import { AuthService } from '../../services/auth.service';
import { QuestionService } from './../../services/question.service';
import { ChallengeService } from './../../services/challenge.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-jugar-desafio',
  templateUrl: './jugar-desafio.component.html',
  styleUrls: ['./jugar-desafio.component.css']
})
export class JugarDesafioComponent implements OnInit {


  challenge_id: string = "0"
  challenge: any = { questions: []}
  title: string = ""
  start!: any;
  answers: any = [];
  disabledButton: Boolean = true;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private challengeService: ChallengeService,
    private questionService: QuestionService,
    private authService: AuthService,
    private applicantService: ApplicantService,
    private router: Router
  ) { }
  ngOnInit (): void {
    this._Activatedroute.paramMap.subscribe(params => {
      this.challenge_id = params.get('challenge_id') ?? "";
      if (this.challenge_id) {
        this.challengeService.getById(this.challenge_id).subscribe(res => {
          this.challenge = res
          this.title = this.challenge.title
          this.start = new Date()
        })
      }
    });

    this.questionService.questionDispatch.subscribe(data => {
      this.appendAnswer(data)
      if (this.answers.length === this.challenge.questions.length) {
        this.disabledButton = false;
      }
    })
  }
  appendAnswer (answer: any) {
    const answerIndex = this.answers.findIndex((item: any) => item.question === answer.question)
    if (answerIndex !== -1) {
      this.answers[answerIndex] = answer
    }
    else {
      this.answers.push(answer)
    }
  }

  complete () {
    Swal.fire({
      title: 'Enviando...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
          Swal.showLoading()
      },
    })
    const payload = { answers: this.answers, duration: this.getDuration() }
    const user = this.authService.getCurrentUser()
    this.applicantService
      .completeChallenge(payload, user.id, this.challenge_id)
      .subscribe((res: any) => {
        const msg = `Tu resultado fue ${res.score}`;
        Swal.fire({
          icon: 'success',
          title: 'Finalizado exitosamente!',
          text: msg,
          showConfirmButton: true,
        }).then(_ => {
          this.router.navigate(['/desafíos'])
      })
      })
  }
  getDuration () {
    const finish: any = new Date()
    const elapsed: any = finish - this.start;
    return this.msToTime(elapsed)

  }
  msToTime(duration: any) {
    let milliseconds = Math.floor((duration % 1000) / 100)
    let seconds: any = Math.floor((duration / 1000) % 60)
    let minutes: any = Math.floor((duration / (1000 * 60)) % 60)
    let hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds
  }

}
