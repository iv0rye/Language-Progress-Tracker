import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';

const API_URL = "http://localhost:8080/api/auth";

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"})
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient){}

  signUp(user: User){
    return this.http.post(API_URL + "/register", user, httpOptions);
  }

  logIn(user: User){
    return this.http.post(API_URL + "/log-in", user, { withCredentials: true });
  }

  getCurrentUser(){
    return this.http.get(API_URL + "/me", { withCredentials: true });
  }
}
