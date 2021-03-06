import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserSearchParam } from './user.model';
import { PaginatedResult } from '../shared/paginatedResult';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getUsers(page?: any, itemsPerPage?: any, userParam?: UserSearchParam): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let reqParams = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      reqParams = reqParams.append('pageNumber', page);
      reqParams = reqParams.append('pageSize', itemsPerPage);
    }

    if (userParam !== undefined) {
      console.log(userParam);
      reqParams = reqParams.append('gender', userParam.gender !== undefined ? userParam.gender : '');
      reqParams = reqParams.append('minAge', userParam.minAge !== undefined ? userParam.minAge.toString() : '0');
      reqParams = reqParams.append('maxAge', userParam.maxAge !== undefined ? userParam.maxAge.toString() : '100');
      reqParams = reqParams.append('orderBy', userParam.orderBy);
      reqParams = reqParams.append('like', userParam.like === true ? 'true' : 'false');
      console.log(reqParams);
    }

    return this.httpClient.get<User[]>(this.baseUrl + 'user/', { observe: 'response', params: reqParams }).pipe(
      map(
        response => {
          paginatedResult.result = response.body;
          if (response.headers.get('pagination') !== null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
          }
          return paginatedResult;
        }
      )
    );
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

  sendLike(userId: number, likeeId: number) {
    return this.httpClient.post(this.baseUrl + 'user/' + userId + '/' + likeeId, null);
  }

}
