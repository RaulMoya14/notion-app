import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private httpclient:HttpClient) { }

  login(username:string, password:string): Observable<any> {

    return this.httpclient.post<any>('http://localhost:3000/auth/login', {username: username, password: password});

  }

}
