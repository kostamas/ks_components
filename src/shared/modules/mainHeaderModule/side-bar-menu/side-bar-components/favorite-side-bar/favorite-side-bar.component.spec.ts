import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FavoriteSideBarComponent} from './favorite-side-bar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FavoritesService} from '../../../favorites.service';

describe('FavoriteSideBarComponent', () => {
  let component: FavoriteSideBarComponent;
  let fixture: ComponentFixture<FavoriteSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FavoriteSideBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});


describe('Favorite functionality', () => {
  let component: FavoriteSideBarComponent;
  let fixture: ComponentFixture<FavoriteSideBarComponent>;
  let obj: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FavoriteSideBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    const favoritesService = TestBed.get(FavoritesService);
    obj  = [
      {
        'id': 4042171,
        'formCode': 'AT2MDMOR0022',
        'path': ' Master Data -> Shared configurations -> Product -> Address book 2.0',
        'name': 'Address book 2.0'
      },
      {
        'id':
          4042084,
        'formCode':
          'AT2MDMRM0014',
        'path':
          ' Master Data -> Shared configurations -> Destination conf. -> Board maintenance 2.0',
        'name':
          'Board maintenance 2.0'
      }
      ,
      {
        'id':
          1000074,
        'formCode':
          'RE_FM_GE_REGIMEN',
        'path':
          ' Accommodation -> Set up Hotel -> Set up Hotel contract -> Board types',
        'name':
          'Board types'
      }
      ,
      {
        'id':
          1002235,
        'formCode':
          'AT2MDMCL0001',
        'path':
          ' Master Data -> Clients -> Client management -> Client management 2.0',
        'name':
          'Client management 2.0'
      }];


    spyOn(favoritesService, 'getFavorites').and.callFake(() => {
      favoritesService.favoritesList.next(obj);
    });


    fixture = TestBed.createComponent(FavoriteSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should load favorites to list', () => {
    const list: any = component.favoriteList;
    expect(list).toEqual(obj);
  });

  it('should add to favorite', () => {
    const link: IMenuLink = {
      id: 3,
      formCode: 'testCode',
      name: 'testLink',
      isFavorite: false,
      path: '',
      icon: '',
      menus: null,
      isLocked: false
  };
    component.favoriteClick(link);
    expect(link.isFavorite).toBeTruthy();
    component.favoriteClick(link);
    expect(link.isFavorite).toBeFalsy();
  });
});
