import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarMenuComponent } from './side-bar-menu.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SideBarMenuComponent', () => {
  let component: SideBarMenuComponent;
  let fixture: ComponentFixture<SideBarMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ SideBarMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
