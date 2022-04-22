import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChallengeService } from 'src/app/services/challenge.service';
import { RecruiterService } from 'src/app/services/recruiter.service';

@Component({
  selector: 'app-public-profile-company',
  templateUrl: './public-profile-company.component.html',
  styleUrls: ['./public-profile-company.component.css']
})
export class PublicProfileCompanyComponent implements OnInit {

  user_id: string = "0"
  typeUser: string = 'admin';
  currentUser: any;
  email: string = "";
  name: string = 'admin';
  description: string = '';
  location: string = '';
  code: string = '';
  city: string = '';
  country: string = '';
  province: string = '';
  phone: string = "";
  challengesRecruiter: Array<any> = []

  constructor(
    private recruiterService: RecruiterService,
    private challengeService: ChallengeService,
    private _Activatedroute: ActivatedRoute,
    private authService: AuthService

  ) { }

  ngOnInit (): void {
    this._Activatedroute.paramMap.subscribe(params => {
      this.user_id = params.get('company_id') ?? "";
      this.recruiterService.getById(this.user_id).subscribe((res: any) => {
      const user = res
      this.typeUser = 'recruiter'
      this.email = user.email ?? ''
      this.name = user.recruiter_profile.name
      this.phone = user.recruiter_profile.phone
      this.description = user.recruiter_profile.description ?? ''
      this.setLocation(user.recruiter_profile.location)
      this.recruiterService.getChallenges(user.id).subscribe((res: any) => {
        this.challengesRecruiter = res
      })
      })
    });
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
  getCreatedBy (data: any) {
    return data.profile.name ?? "admin"
  }
  userLoggedIsApplicant (): Boolean {
    return this.authService.getTypeUser() ? true : false
  }
}
