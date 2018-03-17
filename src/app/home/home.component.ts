import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class HomeComponent implements OnInit {

  public components;

  constructor() {
  }

  ngOnInit() {
    this.components = [
      {text: 'Scheduler', link: '/scheduler'},
      {text: 'Chat', link: '/chat'},
      {text: 'Gallery', link: '/gallery'},
      {text: 'Backgammon', link: '/backgammon'},
      {text: 'Image Expander', link: '/image-expander'},
      {text: 'Transparent Shape Modal', link: '/transparent-shape-modal'}
    ];
  }

  clickHandler(page) {
    if (page === 'image-expander') {
      window.scrollTo(0, 0);
    }
  }
}
