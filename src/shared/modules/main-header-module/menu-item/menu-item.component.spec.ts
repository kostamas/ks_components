import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuItemComponent} from './menu-item.component';
import {EllipsisPipe} from '../../../pips/ellipsis.pipe';
import {FilterPipe} from '../../../pips/filter.pipe';
import {MainHeaderComponent} from '../main-header.component';
import {SubMenuItemComponent} from '../sub-menu-item/sub-menu-item.component';
import {SvgIconModule} from '../../svg-icon-module/svg-icon.module';
import {LoaderModule} from '../../loader-module/loader..module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SvgIconModule,
        LoaderModule,
        HttpClientTestingModule
      ],
      declarations: [
        EllipsisPipe,
        FilterPipe,
        MainHeaderComponent,
        MenuItemComponent,
        SubMenuItemComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;

    component.headerTabElement = document.createElement('div');
    component.mainHeaderElement = document.createElement('div');
    component.headerTabData = <any>{
      items: [
        {name: 'Hotels maintenance', link: ''},
        {name: 'Hotels maintenance 2.0', link: ''},
        {name: 'Hotels by office', link: ''},
        {name: 'Hotels by office 2.0', link: ''},
        {name: 'XML sendings (BMS) 2.0', link: ''},
      ],
      name: 'Hotel'
    };
    component.selectedMenu = <any>component.headerTabData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
