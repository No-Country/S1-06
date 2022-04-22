import { ApplicantService } from './../../services/applicant.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio-desafio',
  templateUrl: './inicio-desafio.component.html',
  styleUrls: ['./inicio-desafio.component.css']
})
export class InicioDesafioComponent implements OnInit {

  isApplicant: boolean = false
  challenge_id:string = "0"

  constructor(
    private authService: AuthService,
    private _Activatedroute: ActivatedRoute,
    private applicanteService: ApplicantService,
    private router: Router
  ) { }
  ngOnInit (): void {
    this.isApplicant = this.authService.getTypeUser() === 'applicant' ? true : false;
    this._Activatedroute.paramMap.subscribe(params => {
      this.challenge_id = params.get('challenge_id') ?? "";
    });
  }
  goToChallenge () {
    this.applicanteService.verifyChallenge(this.challenge_id)
      .subscribe((data: any) => {
        if (data.exits) {
          this.swalError('Este desafio ya ha sido realizado')
        } else {
          this.router.navigate(['/jugar-desafio', this.challenge_id]);
        }
       });
  }
  swalError (text: string) {
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: text,
    })
  }
}
