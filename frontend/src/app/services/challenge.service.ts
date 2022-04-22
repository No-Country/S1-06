import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { handleError } from '../../app/utils/handleError'
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private apiChallenge = environment.api_url + "challenges/"

  constructor(private http: HttpClient) { }

  public create (data: any): Observable<any> {
    return this.http
      .post(this.apiChallenge, data)
      .pipe(catchError(handleError));
  }

  public getById(id: string):Observable<any>{
    return this.http
      .get(`${this.apiChallenge}${id}/`)
      .pipe(catchError(handleError));
  }

  public addQuestions(data:any, challenge_id: number):Observable<any>{
    return this.http
      .post(`${this.apiChallenge}${challenge_id}/questions/`,data)
      .pipe(catchError(handleError));
  }

  public getQuestions(challenge_id: number):Observable<any>{
    return this.http
      .get(`${this.apiChallenge}${challenge_id}/questions/`)
      .pipe(catchError(handleError));
  }
  public getChallengeByCategory(category: string) {
    return this.http
      .get(`${this.apiChallenge}?category=${category}`)
      .pipe(catchError(handleError));
  }
  public getApplicants(challenge_id: number) {
    return this.http
      .get(`${this.apiChallenge}${challenge_id}/applicants/`)
      .pipe(catchError(handleError));  }
}
