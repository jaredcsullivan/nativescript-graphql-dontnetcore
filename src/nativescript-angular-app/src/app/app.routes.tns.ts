import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/(restaurantsTab:restaurants//feedTab:feed//profileTab:profile)', pathMatch: 'full' },

  { path: 'restaurants', component: HomeComponent, outlet: 'restaurantsTab' },
  // { path: 'player/:id', component: PlayerDetailComponent },

  { path: 'feed', component: FeedComponent, outlet: 'feedTab'},
  // { path: 'team/:id', component: TeamDetailComponent },

  { path: 'profile', component: ProfileComponent, outlet: 'profileTab'},
];
