import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../../../data/post';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: [
    '../../../feed/feed.component.scss',
    './new-post.component.scss'
  ]
})
export class NewPostComponent implements OnInit {
  public post: Post;
  public imageupload: string;
  private error: boolean;
  constructor(
    private api: ApiService,
    private router: Router
  ) { }
  @ViewChild('image') image;
  ngOnInit() {
    this.api.checkToken();
    this.image.nativeElement.onchange = ($event) => {
      this.imageupload = null;
      this.api
        .sendImage($event.target.files[0])
        .then((result: any) => {
          this.post.image = result.url;
          this.imageupload = 'success';
        }).catch((error) => {
          console.error(error);
          this.imageupload = 'failure';
        });
    };
    this.post = {
      id: null,
      title: '',
      body: '',
      date: new Date(),
      place: '',
      placeId: null,
      image: ''
    };
  }
  public createPost() {
    this.api
      .post(this.post)
      .subscribe(
        (result: any) => {
          this.router.navigate(['/posts', result]);
        },
        (failure: any) => {
          if (failure.status === 401) {
            localStorage.removeItem('pmin-vl');
            this.router.navigate(['/admin']);
          } else {
            console.error(failure);
            this.showError();
          }
        }
      );
  }
  public hideError(): void {
    this.error = false;
  }
  private showError(): void {
    this.error = true;
  }
}
