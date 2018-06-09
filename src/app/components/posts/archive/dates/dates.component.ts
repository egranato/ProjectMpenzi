import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { BlogDate } from '../../../../data/date';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss']
})
export class DatesComponent implements OnInit {
  public dates: Array<BlogDate>;
  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  public openDate(dateString: string): void {
    this.router.navigate(['/posts', 'dates', dateString]);
  }

  public getHeight() {
    if (this.dates) {
      if (window.innerWidth < 750) {
        return { 'height.px': this.dates.length * 100 };
      } else {
        return { 'height.px': this.dates.length * 200 };
      }
    }
  }

  ngOnInit() {
    this.api
      .getDates()
      .subscribe(
        (data: any) => {
          this.dates = data.results;
        },
        (failure: any) => {
          console.error(failure);
        }
      );
  }
}
