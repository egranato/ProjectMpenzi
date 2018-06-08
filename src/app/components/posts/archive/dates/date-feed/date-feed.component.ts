// Angular Dependencies
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// App Dependencies
import { ApiService } from '../../../../../services/api.service';
import { DataService } from '../../../../../services/data.service';
import { Post } from '../../../../../data/post';

@Component({
  selector: 'app-date-feed',
  templateUrl: '../../../../feed/feed.component.html',
  styleUrls: ['../../../../feed/feed.component.scss']
})
export class DateFeedComponent implements OnInit {
  private date: string;
  public posts: Array<Post>;
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private dataHandler: DataService
  ) {
    this
      .route
      .params
      .subscribe(params => this.date = params.date);
  }

  ngOnInit() {
    this.posts = [];
    this.api
      .getDatePosts(this.date)
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
