import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { handleError } from '../../app/utils/handleError'


@Injectable({
  providedIn: 'root'
})
export class RecruiterService {
  private apiRecruiter = environment.api_url + "recruiter/"

  constructor(private http: HttpClient) {

  }
 public create(data:any):Observable<any>{
   return this.http
     .post(this.apiRecruiter, data)
     .pipe(catchError(handleError));

 }
  public getApplicants(){
    return this.http.get(this.apiRecruiter);
  }
}
