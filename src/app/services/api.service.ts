import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { catchError, retry, retryWhen } from 'rxjs/operators';
import 'rxjs/add/operator/retryWhen';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Post } from '../data/post';
declare const AzureStorage: any;

@Injectable()
export class ApiService {
  private blobService = AzureStorage.Blob
    .createBlobServiceWithSas(environment.blobUrl, environment.sasKey);
  constructor(private http: HttpClient, private router: Router) { }

  // Public

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

  // Admin
  public sendImage(image: any) {
    return this.uploadImageToAzure(image);
  }

  public post(prePost: Post) {
    const post = {
      title: prePost.title,
      body: prePost.body,
      image: prePost.image,
      place: prePost.place
    };
    return this.http
      .post<Response>(`${environment.apiUrl}/admin/post`, { post }, this.getAuthHeaders())
      .pipe(retry(3));
  }

  private uploadImageToAzure(image: any) {
    return new Promise((resolve, reject) => {
      const controller = this;
      this.blobService.listBlobsSegmented('prmp', null, function (error, results) {
        if (error) {
          reject(error);
        } else {
          const existingImages = results.entries;
          let fileNameEncoded = `${Math.random().toString().replace(/([^0-9])+/ig, '')}${image.name}`;
          for (let i = 0; i < existingImages.length; ++i) {
            if (existingImages[i].name === fileNameEncoded) {
              fileNameEncoded = `1${fileNameEncoded}`;
              break;
            }
          }
          const customBlockSize = image.size > 1024 * 1024 * 32 ? 2024 * 1024 * 4 : 1024 * 512;
          controller.blobService.singleBlobPutThresholdInBytes = customBlockSize;
          controller.blobService
            .createBlockBlobFromBrowserFile(
              'prmp',
              fileNameEncoded,
              image,
              { blockSize: customBlockSize },
              function (err, result, response) {
                if (err) {
                  reject(err);
                } else {
                  const url = controller.blobService.getUrl('prmp', fileNameEncoded);
                  resolve({ result, response, url: url.replace(environment.sasKey, '') });
                }
              });
        }
      });
    });
  }

  // Auth

  public login(user: { username: string, digest: string }) {
    return this.http
      .post<Response>(`${environment.apiUrl}/login`, user, this.getHeaders())
      .pipe(retry(3));
  }

  public setToken(token: string): void {
    localStorage.setItem('pmin-vl', token);
  }

  public checkToken(): void {
    if (localStorage.getItem('pmin-vl')) {
      return;
    } else {
      this.router.navigate(['/admin']);
    }
  }

  public loggedIn(): boolean {
    if (localStorage.getItem('pmin-vl')) {
      return true;
    } else {
      return false;
    }
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
  }

  private getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('pmin-vl'),
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      }),
      withCredentials: true
    };
  }
}
