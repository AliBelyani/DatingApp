import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ValueTable } from './value-table';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  apiUrl = 'http://localhost:5000/api/home';
  constructor(private httpClient: HttpClient) { }

  getValues() {
    return this.httpClient.get<ValueTable[]>(this.apiUrl);
  }

  getValue(id: number) {
    return this.httpClient.get<ValueTable>(this.apiUrl + '/' + id);
  }
}
