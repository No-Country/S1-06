import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-desafios',
  templateUrl: './desafios.component.html',
  styleUrls: ['./desafios.component.css']
})
export class DesafiosComponent implements OnInit {

  isNotApplicant: boolean = false
  challenge_id:string = "0"
  constructor(private authService: AuthService, private _Activatedroute:ActivatedRoute) { }

  ngOnInit (): void {
    this.isNotApplicant = ['admin', 'recruiter'].includes(this.authService.getTypeUser())
    console.log(this.isNotApplicant)
    this._Activatedroute.paramMap.subscribe(params => {
      this.challenge_id = params.get('challenge_id') ?? "";
    });
  }

}
