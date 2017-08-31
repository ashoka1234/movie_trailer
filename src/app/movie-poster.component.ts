import { Component, Input, OnInit} from '@angular/core';
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';

import { Movie } from './movie';

@Component({
  selector: 'movie-poster',
  template: `<div>
               <img class="css-movie-image" src={{movie.poster_image_url}}>
               <h4 class="css-movie-text">{{movie.title}}</h4>
             </div>`,
  styleUrls: ['./movie-poster.component.css']
})

export class MoviePosterComponent implements OnInit {
  @Input() movie: Movie;
  imageUrl: SafeUrl | string;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    /*
    var request = new XMLHttpRequest();
    request.open('GET', this.movie.poster_image_url, true);
    request.responseType = 'blob';

    //cross browser
    // window.URL = window.URL;

    request.onload = () => {
      if (request.status == 200) {
        let blob = new Blob([request.response], {type: 'image/jpg'});
        let imageUrl = URL.createObjectURL(request.response);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      } else {
        console.log(Error('Image didn\'t load successfully; error code:' + request.statusText));
      }
    };

    request.onerror = function() {
      console.log(Error('There was a network error.'));
    };

    // Send the request
    request.send();
    */
  }
}
