// Angular Dependencies
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// App Dependencies
import { ApiService } from '../../../../services/api.service';
import { Place } from '../../../../data/place';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  public places: Array<Place>;
  constructor(private api: ApiService, private router: Router) { }

  public openPlace(id: number): void {
    this.router.navigate(['/posts', 'places', id]);
  }

  ngOnInit() {
    this.api
      .getPlaces()
      .subscribe(
        (data: any) => {
          this.places = data.results;
        },
        (failure: any) => {
          console.error(failure);
        }
      );
  }
}
