import { ChallengeService } from './../../services/challenge.service';
import { RecruiterService } from './../../services/recruiter.service';
import { ApplicantService } from './../../services/applicant.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  typeUser: string = 'applicant';
  currentUser!: any;
  user_id: any;
  email: string = "";
  name: string = '';
  description: string = '';
  location: string = '';
  code: string = '';
  city: string = '';
  country: string = '';
  province: string = '';
  phone: string = "";
  loader: boolean = true;
  challengesApplicant: Array<any> = []
  challengesRecruiter: Array<any> = []
  modalData: any = []

  constructor(
    private authService: AuthService,
    private applicantService: ApplicantService,
    private recruiterService: RecruiterService,
    private challengeService: ChallengeService,
    private _Activatedroute: ActivatedRoute,

  ) { }

  ngOnInit (): void {
    // this._Activatedroute.paramMap.subscribe(params => {
    //   this.user_id = params.get('company_id') ?? "";
    //   this.applicantService.getById(this.user_id).subscribe((res: any) => {
    //     const user = res
    //   this.email = user.email ?? ''
    //   this.name = user.applicant_profile.first_name + ' ' + user.applicant_profile.last_name
    //   this.phone = user.applicant_profile.phone
    //   this.setLocation(user.applicant_profile.location)
    //   this.applicantService.getChallenges(user.id).subscribe((res: any) => {
    //     this.challengesApplicant = res
    //   })
    //   })
    // });
    this.typeUser = this.authService.getTypeUser()
    this.currentUser = this.authService.getCurrentUser()
    this.email = this.currentUser.email ?? ''
    if (this.typeUser === 'applicant') {
      this.name = this.currentUser.profile.first_name + ' ' + this.currentUser.profile.last_name
      this.phone = this.currentUser.profile.phone
      this.setLocation(this.currentUser.profile.location)
      this.applicantService.getChallenges(this.currentUser.id).subscribe((res: any) => {
        this.challengesApplicant = res
      })
    }
    if (this.typeUser === 'recruiter') {
      this.name = this.currentUser.profile.name;
      this.phone = this.currentUser.profile.phone
      this.description = this.currentUser.profile.description ?? 'asdas'
      this.setLocation(this.currentUser.profile.location)
      this.recruiterService.getChallenges(this.currentUser.id).subscribe((res: any) => {
        this.challengesRecruiter = res
      })

    }
    if (this.typeUser === 'admin') {
      this.name = 'admin';
    }
  }
  descriptionExits () {
    return this.description.length > 0 ? true : false
  }

  setLocation (location: any) {
    this.code = location.postal_code
    this.province = location.province
    this.city = location.city
    this.country = location.country
  }
  isNotAdmin () {
    return this.typeUser !== 'admin' ? true : false
  }
  isApplicant () {
    return this.typeUser === 'applicant' ? true : false
  }
  isRecruiter () {
    return this.typeUser === 'recruiter' ? true : false
  }
  showResults (challenge_id: any) {
    this.loader = true
    this.challengeService.getApplicants(challenge_id).subscribe((res: any) => {
      this.loader = false;
      this.modalData = res
    })
  }
  hasResults () {
    return this.modalData.length > 0 ? true : false
  }
  redirect (id: any) {
    window.location.href = '/perfil/user/' + id
  }
  getCreatedBy (data: any) {
    return data.profile.name ?? "admin"
  }
  redirectResult (user_id: any, challenge_id: any) {
    window.location.href = `/desafio/${challenge_id}/user/${user_id}`
  }
  redirectEditarChallenge (challenge_id: any) {
     window.location.href =`desafio/${challenge_id}/editar`
  }
}
