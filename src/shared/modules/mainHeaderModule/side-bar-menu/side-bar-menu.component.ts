import {
  AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation,
  OnDestroy
} from '@angular/core';
import {ModalService} from '../../modalModule/modal.service';
import {FavoriteSideBarComponent} from './side-bar-components/favorite-side-bar/favorite-side-bar.component';
import {FavoritesService} from '../favorites.service';
import {IModal, IModalConfig} from '../../../types/modal';
import {MainHeaderService} from '../main-header.service';

@Component({
  selector: 'app-side-bar-menu',
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideBarMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  modalConfig: IModalConfig;
  hasFavoritesInList: boolean = false;
  loadModal: boolean = false;
  showOnlyFavoriteIcon: boolean = true;
  modal: IModal;
  sideBarClass: string = 'side-menu-container';
  unsubscribe: any[] = [];

  constructor(private modalService: ModalService, public favoritesService: FavoritesService, private mainHeaderService: MainHeaderService) {
  }

  @ViewChild('favoriteIcon') favoriteIcon: ElementRef;

  ngOnInit(): void {
    this.unsubscribe.push(this.favoritesService.favoriteLoaded.subscribe(() => {
      if (this.loadModal && this.modal) {
        this.modal.componentWrapper.style.display = 'block';
      }
    }));

    this.favoritesService.favoritesList.subscribe(results => {
      this.hasFavoritesInList = results && results.length > 0;
    });
    this.favoritesService.getFavorites();
  }

  ngAfterViewInit(): void {
  }


  openFavoriteModal(): void {
    const {x, y, left, top} = this.favoriteIcon.nativeElement.getBoundingClientRect();
    this.modalConfig = {
      modalClass: 'side-bar-modal',
      position: {
        x: (x || left) - 335, y: (y || top) + 25
      },
      closeModalCallback: () => {
        this.loadModal = false;
        setTimeout(() => {
          this.favoritesService.getFavorites();
        }, 500);
      }
    };
    this.loadModal = true;
    const modalData = {};
    this.modal = this.modalService.open(FavoriteSideBarComponent, this.modalConfig, modalData);
    this.modal.componentWrapper.style.display = 'none';
  }

  favoriteSrc(): string {
    const filePath: string = 'assets/icons/images/';
    return this.hasFavoritesInList ? filePath + 'ico_favorites_on_peq.png' : filePath + 'ico_favorites_peq.png';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    if (this.mainHeaderService && this.mainHeaderService.menusConfig && this.mainHeaderService.menusConfig.calcSideBarClass) {
      this.sideBarClass = this.mainHeaderService.menusConfig.calcSideBarClass(event)
    }

    if (this.loadModal && this.favoriteIcon.nativeElement) {
      const {x, y, left, top} = this.favoriteIcon.nativeElement.getBoundingClientRect();
      this.modal.updateStyle({top: (y || top) + 25 + 'px', left: (x || left) - 335 + 'px'});
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(subscription => subscription.unsubscribe());
  }
}
