import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + 'user/');
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + 'user/' + id);
  }

  updateUser(id: number, user: User) {
    return this.httpClient.put(this.baseUrl + 'user/' + id, user);
  }

  setMainPhoto(userId: number, Id: number) {
    return this.httpClient.post(this.baseUrl + 'photo/' + userId + '/' + Id + '/SetMain', null);
  }

  deletePhoto(id: number) {
   return this.httpClient.delete(this.baseUrl + 'photo/' + id);
  }

}
