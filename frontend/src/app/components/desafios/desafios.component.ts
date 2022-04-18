import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desafios',
  templateUrl: './desafios.component.html',
  styleUrls: ['./desafios.component.css']
})
export class DesafiosComponent implements OnInit {

  isNotApplicant:boolean = false
  constructor(private authService: AuthService) { }

  ngOnInit (): void {
    this.isNotApplicant = ['admin', 'recruiter'].includes(this.authService.getTypeUser())
  }

}
