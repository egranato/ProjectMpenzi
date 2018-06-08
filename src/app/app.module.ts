import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FeedComponent } from './components/feed/feed.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/posts/post/post.component';
import { ArchiveComponent } from './components/posts/archive/archive.component';
import { ApiService } from './services/api.service';
import { DatesComponent } from './components/posts/archive/dates/dates.component';
import { PlacesComponent } from './components/posts/archive/places/places.component';


@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    PostsComponent,
    PostComponent,
    ArchiveComponent,
    DatesComponent,
    PlacesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
