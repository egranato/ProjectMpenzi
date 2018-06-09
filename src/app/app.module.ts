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
import { DatesComponent } from './components/posts/archive/dates/dates.component';
import { PlacesComponent } from './components/posts/archive/places/places.component';
import { PlaceFeedComponent } from './components/posts/archive/places/place-feed/place-feed.component';
import { DateFeedComponent } from './components/posts/archive/dates/date-feed/date-feed.component';
import { AboutComponent } from './components/about/about.component';
import { ApiService } from './services/api.service';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    PostsComponent,
    PostComponent,
    ArchiveComponent,
    DatesComponent,
    PlacesComponent,
    PlaceFeedComponent,
    DateFeedComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ApiService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
