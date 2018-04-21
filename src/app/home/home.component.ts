import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {WindowRef} from "../core/window-ref.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class HomeComponent implements OnInit {

  public components;

  constructor(private windowRef: WindowRef) {
  }

  ngOnInit() {
    this.components = [
      {text: 'Backgammon', link: '/backgammon'},
      {text: 'Scheduler', link: '/scheduler'},
      {text: 'Chat', link: '/chat'},
      {text: 'Gallery', link: '/gallery'},
      {text: 'Image Expander', link: '/image-expander'},
      {text: 'Transparent Shape Modal', link: '/transparent-shape-modal'}
    ];
  }

  clickHandler(page) {
    if (page === 'image-expander') {
      this.windowRef.nativeWindow.scrollTo(0, 0);
    }
  }
}
