import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Post } from '../../data/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  public posts: Array<Post>;
  constructor(private api: ApiService, private router: Router) { }

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
          for (let i = 0; i < this.posts.length; ++i) {
            const temp = this.posts[i];
            let j = i - 1;
            while (j >= 0 && this.posts[j].date > temp.date) {
              this.posts[j + 1] = this.posts[j];
              --j;
            }
            this.posts[j + 1] = temp;
          }
        },
        (failure: any) => {
          console.error(failure);
        }
      );
  }
}
