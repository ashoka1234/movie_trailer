import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Movie } from './movie';
import { MOVIES } from './mock-movies';

interface MovieItemsResponse {
  results: string[];
}


@Injectable()
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovies(mtype: string, count: number): Promise<Movie[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`/movies/${mtype}/${count}`, {observe: 'response'})
        .subscribe(
        	(results) => {
            console.log(`resolved ${results.body}`);
            resolve(results.body);
          },
          (err: HttpErrorResponse) => {
            console.log("rejected");
            reject(err);
          }
        );
      });
  }

  getMoviesMock(mtype: string): Promise<Movie[]> {
    return Promise.resolve(MOVIES.filter(
    (movie:Movie) => {
      if (mtype === 'recommended') {
        return true;
      } else {
        return movie.genre === mtype;
      }
    }));
  }
  getMoviesSlowlyMock(mtype: string): Promise<Movie[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getMoviesMock(mtype)), 2000);
    });
  }
}
