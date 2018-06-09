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

  public getPlaces() {
    return this.http
      .get<Response>(`${environment.apiUrl}/places`, this.getHeaders())
      .pipe(retry(3));
  }

  public getPlacePosts(id: number) {
    return this.http
      .get<Response>(`${environment.apiUrl}/places/${id}`, this.getHeaders())
      .pipe(retry(3));
  }

  public getDates() {
    return this.http
      .get<Response>(`${environment.apiUrl}/posts/dates`, this.getHeaders())
      .pipe(retry(3));
  }

  public getDatePosts(dateString: string) {
    return this.http
      .get<Response>(`${environment.apiUrl}/posts/dateposts?datestring=${dateString}`, this.getHeaders())
      .pipe(retry(3));
  }

  public getAuthor() {
    return this.http
      .get<Response>(`${environment.apiUrl}/author`, this.getHeaders())
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
