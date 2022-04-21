import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio-desafio',
  templateUrl: './inicio-desafio.component.html',
  styleUrls: ['./inicio-desafio.component.css']
})
export class InicioDesafioComponent implements OnInit {

  isApplicant: boolean = false
  challenge_id:string = "0"

  constructor(private authService: AuthService, private _Activatedroute:ActivatedRoute) { }
  ngOnInit (): void {
    this.isApplicant = this.authService.getTypeUser() === 'applicant' ? true : false;
    this._Activatedroute.paramMap.subscribe(params => {
      this.challenge_id = params.get('challenge_id') ?? "";
    });
  }
}
