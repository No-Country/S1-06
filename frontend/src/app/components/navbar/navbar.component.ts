import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name:string = ''

  constructor(private authService: AuthService,  private router: Router) { }

  ngOnInit (): void {
    const typeUser = this.authService.getTypeUser()
    const currentUser = this.authService.getCurrentUser()
    this.name = this.getUserName(currentUser)[typeUser]() ?? 'Usuario'
  }

  cerrarsesion(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }
  getUserName (user: any): any {
    return {
      recruiter () {
        return user.profile.name
      },
      applicant () {
        return `${user.profile.first_name} ${user.profile.last_name}`
      },
      admin () {
        return 'admin'
      }
    }
  }
}
