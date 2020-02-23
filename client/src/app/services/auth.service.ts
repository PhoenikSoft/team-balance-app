import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_API = `${environment.serverEndpoint}/api/auth/`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  loginEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  isLoggedIn(): boolean {
    return !!this.tokenService.getToken();
  }

  login(credentials): Observable<any> {
    return this.http.post(this.AUTH_API + 'login', {
      email: credentials.email,
      password: credentials.password
    }, this.httpOptions)
      .pipe(tap(_data => this.loginEvent.emit(true)));
  }

  logout() {
    this.tokenService.signOut();
    this.loginEvent.emit(false);
  }

  register(user): Observable<any> {
    return this.http.post(this.AUTH_API + 'register', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      phone: user.phone,
      rating: user.rating
    }, this.httpOptions);
  }
}
