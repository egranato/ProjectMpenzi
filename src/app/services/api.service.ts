import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { catchError, retry, retryWhen } from 'rxjs/operators';
import 'rxjs/add/operator/retryWhen';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  public getFeed() {
    return this.http
      .get<Response>(`${environment.apiUrl}/posts`, this.getHeaders())
      .pipe(retry(3));
  }

  public getPost(id: string) {
    return this.http
      .get<Response>(`${environment.apiUrl}/posts/${id}`, this.getHeaders())
      .pipe(retry(3));
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
  }
}
