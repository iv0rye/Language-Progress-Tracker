import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '../../models/session';

const API_URL = "http://localhost:8080/api/session/";

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"}),
  withCredentials: true
}

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private http: HttpClient){}

  addSession(session: Session){
    return this.http.post(API_URL, session, httpOptions);
  }
}
