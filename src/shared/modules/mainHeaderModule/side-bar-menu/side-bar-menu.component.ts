import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ModalService} from '../../modalModule/modal.service';
import {FavoriteSideBarComponent} from './side-bar-components/favorite-side-bar/favorite-side-bar.component';
import {FavoritesService} from '../favorites.service';
import {IModal, IModalConfig} from '../../../types/modal';

@Component({
  selector: 'app-side-bar-menu',
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideBarMenuComponent implements OnInit, AfterViewInit {
  favoriteOpen: string = 'assets/sicons/images/ico_favorites_peq.png';
  modalConfig: IModalConfig;
  hasFavoritesInList: boolean = false;
  loadModal: boolean = false;
  showOnlyFavoriteIcon: boolean = true;
  modal: IModal;

  constructor(private modalService: ModalService, public favoritesService: FavoritesService) {
  }

  @ViewChild('favoriteIcon') favoriteIcon: ElementRef;

  ngOnInit(): void {
    this.favoritesService.favoriteLoaded.subscribe(() => {
      if (this.loadModal && this.modal) {
        this.modal.componentWrapper.style.display = 'block';
      }
    });

    this.favoritesService.favoritesList.subscribe(results => {
      this.hasFavoritesInList = results && results.length > 0;
    });
    this.favoritesService.getFavorites();
  }

  ngAfterViewInit(): void {
  }


  openFavoriteModal(): void {
    const {x, y} = this.favoriteIcon.nativeElement.getBoundingClientRect();
    this.modalConfig = {
      modalClass: 'side-bar-modal',
      position: {
        x: x - 335, y: y + 25
      },
      closeModalCallback: () => {
        this.loadModal = false;
        setTimeout(() => {
          this.favoritesService.getFavorites();
        }, 500);
      }
    };
    this.loadModal = true;
    this.modal = this.modalService.open(FavoriteSideBarComponent, this.modalConfig);
    this.modal.componentWrapper.style.display = 'none';
  }


  favoriteSrc(): string {
    const filePath: string = 'assets/icons/images/';
    return this.hasFavoritesInList ? filePath + 'ico_favorites_on_peq.png' : filePath + 'ico_favorites_peq.png';
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (this.loadModal && this.favoriteIcon.nativeElement) {
    const {x, y} = this.favoriteIcon.nativeElement.getBoundingClientRect();
    this.modal.updateStyle({top: y + 25 + 'px', left: x - 335 + 'px'});
    }
  }
}
