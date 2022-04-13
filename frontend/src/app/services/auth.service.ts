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

}
