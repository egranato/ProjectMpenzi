import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Post } from '../../../data/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: [
    './post.component.scss',
    '../../feed/feed.component.scss'
  ]
})
export class PostComponent implements OnInit {
  private id: string;
  public post: Post;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {
    this
      .route
      .params
      .subscribe(params => this.id = params.id);
  }

  public openDate(dateString: string): void {
    this.router.navigate(['/posts', 'dates', dateString]);
  }

  public openPlace(id: number): void {
    this.router.navigate(['/posts', 'places', id]);
  }

  ngOnInit() {
    this.api.getPost(this.id)
      .subscribe(
        (result: any) => {
          this.post = new Post(result);
        },
        (failure: any) => {
          console.error(failure);
        }
      );
  }

}
