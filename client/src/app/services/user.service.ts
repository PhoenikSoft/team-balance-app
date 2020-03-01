import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { UserProjection } from './dto/user.dto';

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
