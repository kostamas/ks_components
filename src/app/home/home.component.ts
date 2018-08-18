import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class HomeComponent {
  public things = ['Rock', 'Paper', 'Scissor', 'book',
    'orem ipsum nothing show bla bla', './home.component.html HomeComponent ViewEncapsulation', 'export class HomeComponent '];

  public arr;

  constructor() {
    this.arr = [];

    setTimeout(() => {
      for (let i = 0; i < 10000; i++) {
        this.arr.push(
          {
            hotelName: this.things[Math.floor(Math.random() * this.things.length)],
            hotelCode: this.things[Math.floor(Math.random() * this.things.length)],
            city: this.things[Math.floor(Math.random() * this.things.length)],
            country: this.things[Math.floor(Math.random() * this.things.length)],
            numberOfStories: this.things[Math.floor(Math.random() * this.things.length)],
            visitorsPerYear: Math.floor(Math.random() * 10),
            operation: this.things[Math.floor(Math.random() * this.things.length)]
          }
        );
      }
    });
  }
}
