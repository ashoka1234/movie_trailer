import { Component } from '@angular/core';

@Component({
  selector: 'header-navbar',
  template:  `<nav class="navbar navbar-default">
                <div class="container-fluid">
                  <div class="container-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbarSupportedContent" aria-expanded="false">
                      <span class="sr-only">Toggle navigation</span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">m-ZONE</a>
                  </div>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul class="nav navbar-nav">
                        <li>
                          <a [routerLink]="['/movies','recommended']" routerLinkActive="active">Recommended<span class="sr-only">(current)</span></a>
                        </li>
                        <li>
                          <a [routerLink]="['/movies','animation']" routerLinkActive="active">Animation</a>
                        </li>
                        <li>
                          <a [routerLink]="['/movies','scifi']" routerLinkActive="active">SciFi</a>
                        </li>
                      </ul>
                  </div>
                </div>
              </nav>
              <router-outlet></router-outlet>
              <!-- Routed views go here -->`
})

export class HeaderNavbarComponent {

}
