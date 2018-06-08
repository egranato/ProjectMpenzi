import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/posts/post/post.component';
import { ArchiveComponent } from './components/posts/archive/archive.component';
import { DatesComponent } from './components/posts/archive/dates/dates.component';
import { PlacesComponent } from './components/posts/archive/places/places.component';
import { PlaceFeedComponent } from './components/posts/archive/places/place-feed/place-feed.component';
import { DateFeedComponent } from './components/posts/archive/dates/date-feed/date-feed.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/feed',
    pathMatch: 'full'
  },
  {
    path: 'feed',
    component: FeedComponent
  }, {
    path: 'posts',
    component: PostsComponent,
    children: [
      {
        path: '',
        component: ArchiveComponent,
        children: [
          {
            path: '',
            redirectTo: 'places',
            pathMatch: 'full'
          },
          {
            path: 'places',
            component: PlacesComponent
          },
          {
            path: 'dates',
            component: DatesComponent
          },
          {
            path: 'places/:id',
            component: PlaceFeedComponent
          },
          {
            path: 'dates/:date',
            component: DateFeedComponent
          }
        ]
      }, {
        path: ':id',
        component: PostComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/feed',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }