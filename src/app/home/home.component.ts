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
      {text: 'Image Expander', link: '/image-expander'},
      {text: 'Backgammon', link: '/backgammon'},
      {text: 'Transparent Shape Modal', link: '/transparent-shape-modal'},
      {text: 'Gallery', link: '/gallery'}
    ];
  }
}
