import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SubMenuItemComponent} from './sub-menu-item.component';
import {EllipsisPipe} from '../../../pips/ellipsis.pipe';
import {FilterPipe} from '../../../pips/filter.pipe';
import {MainHeaderComponent} from '../main-header.component';
import {MenuItemComponent} from '../menu-item/menu-item.component';
import {SvgIconModule} from '../../svg-icon-module/svg-icon.module';
import {LoaderModule} from '../../loader-module/loader..module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SubMenuItemComponent', () => {
  let component: SubMenuItemComponent;
  let fixture: ComponentFixture<SubMenuItemComponent>;

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
    fixture = TestBed.createComponent(SubMenuItemComponent);
    component = fixture.componentInstance;
    component.menuData = {
      name: 'Distribution',
      menus: [{
        title: 'Traditional sale contract',
        menus: [{
          id: 1,
          isFavorite: false,
          name: 'Create offer / unified contract',
          formCode: 'RE_FM_CO_CREAR_OFERT',
          link: 'http://pulse20.hotelbeds.com/webcenter/content/conn/WebCenterSpaces-ucm/path/WebCenterSpaces-Root/atlas2_0/Atlas%2011g%20Help/Accommodation/Create%20Offer%20Contracts.docx?rendition=Web'
        }]
      }]
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
