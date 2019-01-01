import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
 { path: '', redirectTo: 'restaurants', pathMatch: 'full' },

 { path: 'restaurants', component: HomeComponent },
 // { path: 'player/:id', component: PlayerDetailComponent },

 { path: 'feed', component: FeedComponent },
 // { path: 'team/:id', component: TeamDetailComponent },

 { path: 'profile', component: ProfileComponent },
];
