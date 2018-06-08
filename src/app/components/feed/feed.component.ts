import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Post } from '../../data/post';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  public posts: Array<Post>;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.posts = [];
    this.api.getFeed()
      .subscribe(
        (data: any) => {
          data.results.forEach((post) => {
            this.posts.push(new Post(post));
          });
        },
        (failure: any) => {
          console.error(failure);
        }
      );
  }
}
