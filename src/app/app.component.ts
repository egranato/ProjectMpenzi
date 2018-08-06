import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const origin = window.location.origin;
    const path = window.location.pathname;
    if (origin.indexOf('https://') !== -1) {
      if (origin.indexOf('www.') === -1) {
        window.location.href = `https://www.projectmpenzi.com${path}`;
      }
    } else {
      window.location.href = `https://www.projectmpenzi.com${path}`;
    }
  }
}
