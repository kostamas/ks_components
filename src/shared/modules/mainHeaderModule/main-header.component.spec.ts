import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {MainHeaderComponent} from './main-header.component';
import {EllipsisPipe} from '../../pips/ellipsis.pipe';
import {FilterPipe} from '../../pips/filter.pipe';
import {DatePipe} from '@angular/common';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MainHeaderModule} from './main-header.module';

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
        MainHeaderModule
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

  it('test main header responsive', (done) => {
    const _window: any = window;

    if (_window.isCopiedWindow) {
      component.headerTabs = mockMenus;
      component.lockHeaderResize = true;
      fixture.detectChanges();
      component.calcViewPortBreak();
      testMainHeaderClass(_window, component.mainHeaderViewTypes.collapsedIcons)
        .then(() => {
          // component.headerTabs = mockMenus.filter((item, index) => index < 5);
          // if there is some issues with the resize action it can be replaced with mockMenus.filter.
          _window.resizeTo(700, 500);
          return testMainHeaderClass(_window, component.mainHeaderViewTypes.collapsed);
        })
        .then(() => {
          // component.headerTabs = mockMenus.filter((item, index) => index < 2);
          // if there is some issues with the resize action it can be replaced with mockMenus.filter.
          _window.resizeTo(1500, 500);
          return testMainHeaderClass(_window, component.mainHeaderViewTypes.expanded);
        })
        .then(_window.testPass);

    } else {
      const newWindow: any = window.open('http://localhost:9876/debug.html', '', 'width=900, height=800');
      newWindow.isCopiedWindow = true;
      newWindow.testPass = () => {
        component.lockHeaderResize = false;
        expect(true).toBeTruthy();
        newWindow.close();
        done();
      };

      newWindow.testFail = function () {
        component.lockHeaderResize = true;
        expect(false).toBeTruthy();
        newWindow.close();
        done();
      };
    }
  }, 15000);

  const testMainHeaderClass = (_window, expectedClass) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        component.mainHeaderView = component.mainHeaderViewTypes.expanded;
        fixture.detectChanges();
        component.calcViewPortBreak();
        setTimeout(() => {
          fixture.detectChanges();
          setTimeout(() => {
            const mainHeaderElement = _window.document.querySelector('.main-header');
            if (!mainHeaderElement.classList.contains(expectedClass)) {
              _window.testFail();
              reject();
            }
            resolve();
          });
        });
      }, 500);
    });
  };
});
