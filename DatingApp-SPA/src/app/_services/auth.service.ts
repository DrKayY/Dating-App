import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.url;
  baseUrl = 'http://localhost:5000/api/auth/';

constructor(private http: HttpClient) { }

login(model: any) {
  return this.http.post(`${this.baseURL}/api/auth/login`, model)
  .pipe(map((response: any) => {
    const user = response;
    if (user) {
      localStorage.setItem('token', user.token);
    }
  })
  );
}

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model);
}
}
