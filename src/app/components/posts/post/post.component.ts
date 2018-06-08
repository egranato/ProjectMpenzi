import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({ selector: 'app-post', templateUrl: './post.component.html', styleUrls: ['./post.component.scss'] })
export class PostComponent implements OnInit {
  private id: string;
  constructor(private route: ActivatedRoute, private api: ApiService) {
    this
      .route
      .params
      .subscribe(params => this.id = params.id);
  }

  ngOnInit() {
    this.api.getPost(this.id)
      .subscribe(
        (result: any) => {
          console.log(result);
        },
        (failure: any) => {
          console.error(failure);
        }
      );
  }

}
