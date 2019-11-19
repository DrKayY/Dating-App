import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.url;
  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;

constructor(private http: HttpClient) { }

login(model: any) {
  return this.http.post(`${this.baseURL}/api/auth/login`, model)
  .pipe(map((response: any) => {
    const user = response;
    if (user) {
      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user.user));
      this.decodedToken = this.jwtHelper.decodeToken(user.token);
      this.currentUser = user.user;
      console.log(this.decodedToken);
    }
  })
  );
}

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}
}
