import { JwtAutenticationRequest } from './../model/jwt-autentication-request';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ResponseEntity } from '../model/response-entity';
import { CurrentUser } from '../model/current-user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public efetuarLogin(jwtAutenticationRequest: JwtAutenticationRequest): Observable<CurrentUser> {
    return this.http.post<CurrentUser>(this.url + '/auth', jwtAutenticationRequest);
  }
}
