import { ApplicantService } from './../../services/applicant.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-profile-user',
  templateUrl: './public-profile-user.component.html',
  styleUrls: ['./public-profile-user.component.css']
})
export class PublicProfileUserComponent implements OnInit {


  user_id:any = "0"
  email: string = "";
  name: string = '';
  location: string = '';
  code: string = '';
  city: string = '';
  country: string = '';
  province: string = '';
  phone: string = "";
  challengesApplicant: Array<any> = []

  constructor(
    private _Activatedroute: ActivatedRoute,
    private applicantService: ApplicantService,
  ) { }
  ngOnInit (): void {
    this._Activatedroute.paramMap.subscribe(params => {
      this.user_id = params.get('user_id') ?? "";
      this.applicantService.getById(this.user_id).subscribe((res: any) => {
        const user = res
      this.email = user.email ?? ''
      this.name = user.applicant_profile.first_name + ' ' + user.applicant_profile.last_name
      this.phone = user.applicant_profile.phone
      this.setLocation(user.applicant_profile.location)
      this.applicantService.getChallenges(user.id).subscribe((res: any) => {
        this.challengesApplicant = res
      })
      })
    });
  }

  setLocation (location: any) {
    this.code = location.postal_code
    this.province = location.province
    this.city = location.city
    this.country = location.country
  }
  getCreatedBy (data: any) {
    return data.profile.name ?? "admin"
  }
}
