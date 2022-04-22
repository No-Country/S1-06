import { AuthService } from 'src/app/services/auth.service';
import { RecruiterService } from './../../services/recruiter.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  constructor(private recruiterService: RecruiterService, private authService: AuthService) { }
  recruiters: Array<any> = []
  typeUser: String = ''

  ngOnInit (): void {
    this.typeUser = this.authService.getTypeUser()
    this.recruiterService.getApplicants().subscribe((res: any) => {
      this.recruiters = res;
    })
  }
  isAdmin () {
    return this.typeUser === 'admin' ? true : false
  }

}
