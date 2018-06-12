import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Author } from '../../../../data/author';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: [
    './edit.component.scss',
    '../new-post/new-post.component.scss'
  ]
})
export class EditComponent implements OnInit {
  public author: Author;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.checkToken();
    this.api
      .getAuthor()
      .subscribe(
        (result: any) => {
          this.author = new Author(result);
        },
        (failure: any) => {
          console.error(failure);
        }
      );
  }
}
