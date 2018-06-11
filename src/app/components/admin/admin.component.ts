import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  protected user: {
    username: string,
    digest: string
  };
  @ViewChild('digest') digest;
  constructor(private api: ApiService, private router: Router) { }
  ngOnInit() {
    if (this.api.loggedIn()) {
      this.router.navigate(['/workspace']);
    }
    this.user = {
      username: '',
      digest: ''
    };
  }
  public unKeydown(event: any): void {
    if (event.key === 'Enter') {
      this.digest.nativeElement.focus();
    }
  }
  public diKeydown(event: any): void {
    if (event.key === 'Enter') {
      this.login();
    }
  }
  protected login(): void {
    this.api
      .login(this.user)
      .subscribe(
        (result: any) => {
          this.api.setToken(result.token);
          this.router.navigate(['/workspace']);
        },
        (failure: any) => {
          console.error(failure);
        }
      );
  }
}
