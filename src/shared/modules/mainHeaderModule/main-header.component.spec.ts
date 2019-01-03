import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {MainHeaderComponent} from './main-header.component';
import {EllipsisPipe} from '../../pips/ellipsis.pipe';
import {FilterPipe} from '../../pips/filter.pipe';
import {DatePipe} from '@angular/common';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MainHeaderModule} from './main-header.module';
import {SvgIconModule} from '../svgIconModule/svg-icon.module';
import {LoaderModule} from '../loader-module/loader..module';

const mockMenus = require('../../../../../test/mock/mockMenus');

describe('MainHeaderComponent', () => {
  let component: MainHeaderComponent;
  let fixture: ComponentFixture<MainHeaderComponent>;

  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EllipsisPipe,
        FilterPipe
      ],
      imports: [
        HttpClientTestingModule,
        MainHeaderModule,
        SvgIconModule,
        LoaderModule
      ],
      providers: [
        DatePipe
      ]
    })
      .compileComponents();

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const req1 = httpMock.expectOne(`http://localhost:3000/endpoints`);
    expect(req1.request.method).toBe('GET');
    req1.flush({menus: 'http://localhost:3000/menus'});

    const req2 = httpMock.expectOne(`http://localhost:3000/menus`);
    expect(req2.request.method).toBe('GET');
    req2.flush(mockMenus);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click on header tab should open menu and to update selectedHeaderTabElement selectedMenu ', () => {
    const headerTabElement = {};
    const headerTab: any = {};
    component.onHeaderTabClick(headerTabElement, headerTab);

    expect(component.isMenuItemOpen &&
      component.selectedHeaderTabElement === headerTabElement && component.selectedHeaderTab === headerTab).toBeTruthy();
  });

  it('test close header tab function', () => {
    component.closeMenu();
    expect(!component.isMenuItemOpen && component.selectedHeaderTabElement === null && component.selectedHeaderTab === null).toBeTruthy();
  });


  describe('favorite functionality', () => {
    it('mapped favorites', () => {


      component.favoritePages = [{
        id: 4042144,
        formCode: 'AT2MDMSP0013',
        path: undefined,
        name: 'HSI Profiles maintenance 2.0',
        isFavorite: true,
        link: undefined
      }];


      component.headerTabs = [
        {
          'name': 'Master Data',
          'icon': 'ico_master_data.png',
          'menus': [
            {
              'name': 'Distribution',
              'menus': [
                {
                  title: 'Exclusions maintenance 2.0',
                  'menus': [
                    {
                      'id': 4042307,
                      'name': 'Exclusions maintenance 2.0',
                      'formCode': 'AT2ACCDI0028',
                      isFavorite: false,
                      link: undefined
                    }
                  ],
                },
                {
                  'title': 'Set up',
                  'menus': [
                    {
                      'id': 4042229,
                      'name': 'Concept types maintenance 2.0',
                      'formCode': 'AT2MDMRM0016',
                      isFavorite: false,
                      link: undefined
                    },
                    {
                      'id': 4042166,
                      'name': 'Countries maintenance 2.0',
                      'formCode': 'AT2MDMDE0003',
                      isFavorite: false,
                      link: undefined
                    }
                  ]
                },
                {
                  'title': 'Hotelopia',
                  'menus': [
                    {
                      'id': 4042144,
                      'name': 'Promotions 2.0',
                      'formCode': 'AT2MDMRM0044',
                      isFavorite: false,
                      link: undefined
                    }
                  ]
                }
              ]
            }
          ]
        }];

      component.mapFavoritePages(component.favoritePages);
      const favoritePageInMenu = [];
      component.headerTabs.forEach(h => h.menus.forEach(m1 => m1.menus.forEach(m2 => m2.menus.forEach(m3 => {
        if (m3.id === component.favoritePages[0].id) {
          favoritePageInMenu.push(m3);
        }
      }))));
      expect(favoritePageInMenu.length).toEqual(1);
      expect(favoritePageInMenu[0].isFavorite).toBeTruthy();
      expect(favoritePageInMenu[0].id).toEqual(component.favoritePages[0].id);
    });


  });


});
