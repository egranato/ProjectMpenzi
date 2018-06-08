import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Post } from '../../data/post';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  public posts: Array<Post>;
  constructor(private api: ApiService, private dataHandler: DataService, private router: Router) { }

  public goToPost(id: number): void {
    this.router.navigate(['/posts', id]);
  }

  ngOnInit() {
    this.posts = [];
    this.api.getFeed()
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
