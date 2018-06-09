import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api
      .getAuthor()
      .subscibe(
        (result: any) => {
          console.log(result);
        },
        (failure: any) => {
          console.error(failure);
        }
      );
  }
}
