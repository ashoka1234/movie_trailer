import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MoviePosterComponent } from './movie-poster.component';
import { HeaderNavbarComponent } from './header-navbar.component';
import { MoviesViewComponent } from './movies-view.component';
import { MoviePlayerComponent } from './movie-player.component';
import { PageNotFoundComponent } from './page-not-found.component';

const appRoutes: Routes = [
  { path: 'movies/:type', component: MoviesViewComponent },
  { path: '', redirectTo: '/movies/recommended', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MoviePosterComponent,
    HeaderNavbarComponent,
    MoviesViewComponent,
    MoviePlayerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
