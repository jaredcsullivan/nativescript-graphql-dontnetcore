import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

// Apollo
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';
import { routes } from './app.routes';
import { ProfileComponent } from './profile/profile.component';
import { environment } from '../environments/environment';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

// GraphiQL: https://launchpad.graphql.com/0vw9j9w0l5

// const uri = 'https://dog-graphql-api.glitch.me/graphql';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedComponent,
    ProfileComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    HttpClientModule,
    HttpLinkModule,
    ApolloModule,
    NativeScriptCommonModule,
    NativeScriptUIListViewModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    apollo.create({
      link: httpLink.create({
        uri: environment.apiUri,
        method: 'POST',
        withCredentials: false,
      }),
      cache: new InMemoryCache()
    });
  }
}
