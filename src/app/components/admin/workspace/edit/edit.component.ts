import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Author } from '../../../../data/author';
import { Router } from '@angular/router';

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
  public imageupload: string;
  private error: boolean;
  constructor(private api: ApiService, private router: Router) {
    this.author = new Author();
  }
  @ViewChild('image') image;
  public updateAuthor(): void {
    this.api
      .updateAuthor(this.author)
      .subscribe(
        (result: any) => {
          return;
        },
        (failure: any) => {
          if (failure.status === 401) {
            localStorage.removeItem('pmin-vl');
            this.router.navigate(['/admin']);
          } else {
            this.showError();
            console.error(failure);
          }
        }
      );
  }
  public hideError(): void {
    this.error = false;
  }
  private showError(): void {
    this.error = true;
  }
  ngOnInit() {
    this.api.checkToken();
    this.image.nativeElement.onchange = ($event) => {
      this.imageupload = null;
      this.api
        .sendImage($event.target.files[0])
        .then((result: any) => {
          this.author.image = result.url;
          this.imageupload = 'success';
        }).catch((error) => {
          console.error(error);
          this.imageupload = 'failure';
        });
    };
    this.api
      .getAuthor()
      .subscribe(
        (result: any) => {
          this.author = new Author(result);
        },
        (failure: any) => {
          if (failure.status === 401) {
            localStorage.removeItem('pmin-vl');
            this.router.navigate(['/admin']);
          } else {
            console.error(failure);
          }
        }
      );
  }
}
