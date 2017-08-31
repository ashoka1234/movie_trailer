import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

// import { Movie } from './movie';

@Component({
  selector: 'movie-player',
  template: `<div id="trailer" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div id="trailer-video-container">
          <iframe id='trailer-video'
              type='text-html'
              width="640" height="360"
              [src]=movieUrl
              frameborder=0 allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>
  </div>`,
  styleUrls: ['./movie-player.component.css']
})

export class MoviePlayerComponent {
  constructor(private sanitizer: DomSanitizer) {}
  @Input() movieUrl: SafeResourceUrl | string;

}
