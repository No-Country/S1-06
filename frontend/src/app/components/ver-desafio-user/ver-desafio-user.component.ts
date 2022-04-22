import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicantService } from 'src/app/services/applicant.service';
import { ChallengeService } from 'src/app/services/challenge.service';

@Component({
  selector: 'app-ver-desafio-user',
  templateUrl: './ver-desafio-user.component.html',
  styleUrls: ['./ver-desafio-user.component.css']
})
export class VerDesafioUserComponent implements OnInit {


  challenge_id: string = "0"
  user_id: string = "0"
  challenge: any = { questions: [] }
  selected: any = []
  title: string = ""
  answers: any = [];

  constructor(
    private _Activatedroute: ActivatedRoute,
    private challengeService: ChallengeService,
    private applicantService: ApplicantService,

    // private questionService: QuestionService,
    // private authService: AuthService,
    // private router: Router
  ) { }
  ngOnInit (): void {
    this._Activatedroute.paramMap.subscribe((params: any) => {
      this.challenge_id = params.get('challenge_id') ?? "";
      this.user_id = params.get('user_id') ?? "";

      if (this.challenge_id) {
        this.challengeService.getById(this.challenge_id).subscribe((res: any) => {
          this.challenge = res
          this.title = this.challenge.title
          this.applicantService.getAnswersChallenge(this.user_id, this.challenge_id).subscribe((res: any) => {
            this.selected = this.getChoiceUser(res)
          })
        })
      }
    });
  }
  getChoiceUser (data: any) {
    return data.map((item: any) => item.choice)
  }
}
