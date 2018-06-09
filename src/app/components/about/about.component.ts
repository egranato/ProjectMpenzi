import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Author } from '../../data/author';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public author: Author;
  constructor(private api: ApiService) { }

  ngOnInit() {
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
