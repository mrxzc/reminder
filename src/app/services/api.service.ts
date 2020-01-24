import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  APIURL = "http://172.10.0.49:8000/api/v1.0/"
  Token = "api_token"

  constructor() { }
}
