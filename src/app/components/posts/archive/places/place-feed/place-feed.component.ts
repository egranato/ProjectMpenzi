// Angular Dependencies
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// App Dependencies
import { ApiService } from '../../../../../services/api.service';
import { DataService } from '../../../../../services/data.service';
import { Post } from '../../../../../data/post';

@Component({
  selector: 'app-place-feed',
  templateUrl: '../../../../feed/feed.component.html',
  styleUrls: ['../../../../feed/feed.component.scss']
})
export class PlaceFeedComponent implements OnInit {
  private id: number;
  public posts: Array<Post>;
  constructor(private route: ActivatedRoute, private api: ApiService, private dataHandler: DataService) {
    this
      .route
      .params
      .subscribe(params => this.id = params.id);
  }

  ngOnInit() {
    this.posts = [];
    this.api
      .getPlacePosts(this.id)
      .subscribe(
        (data: any) => {
          data.results.forEach((post) => {
            this.posts.push(new Post(post));
          });
          this.posts = this.dataHandler.sortPostsByDate(this.posts);
        },
        (failure: any) => {
          console.error(failure);
        }
      );
  }
}
