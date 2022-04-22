import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiAuth = environment.api_url + "auth/token/"
  constructor(private http: HttpClient) {
  }

  login(email:string, password:string ):  Observable<any> {
    return this.http
      .post(this.apiAuth, { email, password }).pipe(map(payload => {
        return this.saveToken(payload);
      }));
  }
  private saveToken (payload: any): any {
    const {access, user, profile} = payload
    localStorage.setItem('token', access);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('profile', JSON.stringify(profile));
    return payload;
  }

  public logout (): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
  }

  public getTypeUser (): any{
    let user: any = localStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      if (user.is_superuser) {
        return 'admin'
      }
      if (user.is_recruiter) {
        return 'recruiter'
      }
      return 'applicant'
    }
  }
  public getCurrentUser (): any{
    let user: any = localStorage.getItem('user')
    let profile: any = localStorage.getItem('profile')
    if (user) {
      let userParse = JSON.parse(user)
      let profileParse = {}
      if (profile) {
        profileParse = JSON.parse(profile)
      }
      userParse['profile'] = profileParse
      return userParse
    }
    return null
  }
}
