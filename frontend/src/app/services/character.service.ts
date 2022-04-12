import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private api_users = "http://127.0.0.1:8000/api/applicant/"
  private token: string | undefined

  constructor(private http: HttpClient) {
  }

  public post_usuario(data:any):Observable<any>{
    return this.http.post(this.api_users, data)
  }

  public set_token (token: string){
    this.token = token
  }

  public get_token (){
    return this.token
  }

  public set_id(id:number, data: any):Observable<any>{
    return this.http.patch(this.api_users +"/"+id , data)
  }

  public get_usuarioId(id:number):Observable<any>{
    return this.http.get(this.api_users+"/"+id)
  }

}
