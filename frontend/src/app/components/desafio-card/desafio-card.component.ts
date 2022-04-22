import { AuthService } from 'src/app/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-desafio-card',
  templateUrl: './desafio-card.component.html',
  styleUrls: ['./desafio-card.component.css']
})
export class DesafioCardComponent implements OnInit {
  @Input()data:any;
  constructor(private authService: AuthService) { }

  ngOnInit (): void {
  }

  getCreatedBy (): string {
    return this.data.created_by.profile.name ?? "Admin"
  }
  isApplicant (): Boolean {
    return this.authService.getTypeUser() === 'applicant' ? true : false;
  }
}
