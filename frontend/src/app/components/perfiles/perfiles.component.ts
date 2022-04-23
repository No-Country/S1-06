import { AppComponent } from './../../app.component';
import { ApplicantService } from 'src/app/services/applicant.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {
  profiles: Array<any> = []
  constructor(private applicantService: ApplicantService) { }

  ngOnInit (): void {
    this.applicantService.getApplicants().subscribe((res: any) => {
      this.profiles = res
    })
  }

}
