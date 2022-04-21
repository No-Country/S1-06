import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { handleError } from '../../app/utils/handleError'


@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
  private apiApplicant = environment.api_url + "applicant/"

  constructor(private http: HttpClient) {

  }
 public create(data:any):Observable<any>{
   return this.http
     .post(this.apiApplicant, data)
     .pipe(catchError(handleError));
 }
  public getApplicants(){
    return this.http.get(this.apiApplicant);
  }

  public completeChallenge (data: any, user_id: any, challenge_id: any) {
   return this.http
     .post(`${this.apiApplicant}${user_id}/challenge/${challenge_id}/`, data)
     .pipe(catchError(handleError));
  }

  public verifyChallenge ( challenge_id: any) {
    return this.http
     .get(`${this.apiApplicant}/challenge/${challenge_id}/verify`)
     .pipe(catchError(handleError));
  }
}
