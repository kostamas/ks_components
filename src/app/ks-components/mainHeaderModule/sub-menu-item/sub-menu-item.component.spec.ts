import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SubMenuItemComponent} from './sub-menu-item.component';
import {MainHeaderComponent} from '../main-header.component';
import {MenuItemComponent} from '../menu-item/menu-item.component';

describe('SubMenuItemComponent', () => {
  let component: SubMenuItemComponent;
  let fixture: ComponentFixture<SubMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EllipsisPipe,
        FilterPipe,
        MainHeaderComponent,
        MenuItemComponent,
        SubMenuItemComponent,
        AdfWrapperComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubMenuItemComponent);
    component = fixture.componentInstance;
    component.menuData = {
      items: [
        {title: 'Hotels maintenance', items: []},
        {title: 'Hotels maintenance 2.0', items: []},
        {title: 'Hotels by office', items: []},
        {title: 'Hotels by office 2.0', items: []},
        {title: 'XML sendings (BMS) 2.0', items: []},
      ],
      name: 'Hotel'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
