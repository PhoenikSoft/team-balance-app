import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private beEndpoint = `${environment.serverEndpoint}/api`;

  constructor(private http: HttpClient) { }

  fetch(id: number) {
    return this.http.get<UserProjection>(`${this.beEndpoint}/users/${id}`);
  }

  update(user: UserProjection) {
    return this.http.put<UserProjection>(`${this.beEndpoint}/users/${user.id}`, user)
  }

}

export interface UserProjection {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  rating: number;
}

