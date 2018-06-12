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
  constructor(private api: ApiService, private router: Router) { }
  @ViewChild('image') image;
  ngOnInit() {
    this.api.checkToken();
    this.image.nativeElement.onchange = ($event) => {
      this.api
        .sendImage($event.target.files[0])
        .then((result: any) => {
          this.post.image = result.url;
        }).catch((error) => {
          console.error(error);
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
          console.error(failure);
        }
      );
  }
}
