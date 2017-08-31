import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { Movie } from './movie';
import { MovieService } from './movie.service'

@Component({
  selector: 'movies-view',
  providers: [MovieService],
  template: `
  <ul class="movies">
    <li *ngFor="let movie of movies"
      [class.selected]="movie === selectedMovie"
      (click)="onSelect(movie)"
      class="movielist" data-toggle="modal" data-target="#trailer">
      <movie-poster [movie]=movie></movie-poster>
    </li>
  </ul>
  <div>
    <movie-player [movieUrl]=selectedMovieUrl></movie-player>
  </div>`,
  styleUrls: ['./movies-view.component.css']
})

export class MoviesViewComponent implements OnInit {
  movies: Movie[];
  selectedMovieUrl: SafeResourceUrl | string;
  currentGenre = '';
  private subs: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
    ) {}

  ngOnInit() {
    this.subs = this.route.params.subscribe((param) => {
      let newGenre = param['type'];
      if (newGenre != this.currentGenre) {
        this.movieService.getMovies(newGenre,2).then((movies) => {
          this.movies = movies;
          this.currentGenre = newGenre;
        });
      }
    });
  }

  onSelect(movie: Movie): void {
    let re = /(?:v=)[^&#]+/;
    let youtube_id_match = movie.youtube_url.match(re);
    let youtube_id =  youtube_id_match[0].replace(/^v=/,"");
    let youtubeurl = `https://www.youtube.com/embed/${youtube_id}?autoplay=1&html5=1`;
    this.selectedMovieUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeurl);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
