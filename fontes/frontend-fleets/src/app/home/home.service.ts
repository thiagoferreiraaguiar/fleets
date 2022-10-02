import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url: string = "https://api.fleetsseguros.cf";

  constructor(private http: HttpClient) { }

}
