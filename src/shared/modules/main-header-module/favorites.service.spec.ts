import {inject, TestBed} from '@angular/core/testing';

import {FavoritesService} from './favorites.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FavoritesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FavoritesService]
    });
  });

  it('should be created', inject([FavoritesService], (service: FavoritesService) => {
    expect(service).toBeTruthy();
  }));


  describe('favorite images', () => {
    let link: IMenuLink;
    beforeEach(() => {
      link = {
        id: 1,
        path: '',
        isFavorite: true,
        formCode: undefined,
        name: 'favoriteTest',
        icon: 'fake link',
        menus: null,
        isLocked: false
      };
    });

    it('favorite on image', inject([FavoritesService], (service: FavoritesService) => {
      link.isFavorite = true;
        expect(service.favoriteImgSrc(link.isFavorite)).toContain('favorites_on.jpg');
    }));

    it('favorite off image', inject([FavoritesService], (service: FavoritesService) => {
      link.isFavorite = false;
      expect(service.favoriteImgSrc(link.isFavorite)).toContain('favorites_off.jpg');
    }));
  });
});

