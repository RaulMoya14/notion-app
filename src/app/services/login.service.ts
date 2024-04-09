import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private httpclient:HttpClient) { }

  login(username:string, password:string): Observable<any> {

    const user = {
      username: username,
      password: password
    }
    const body = JSON.stringify(user);

    return this.httpclient.post<any>('http://localhost:3000/login', body, { headers: { 'Content-Type': 'application/json' } });

  }

}
