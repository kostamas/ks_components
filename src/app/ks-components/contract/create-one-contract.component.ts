import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {CreateOneContractService} from './create-one-contract.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {CreateOneContractStoreService} from './create-one-contract-store.service';
import {AllOneContractService} from './all-one-contract.service';
import {take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ISvgIcons, SVG_ICONS} from '../../shared/svg-icon-module/svg-icons.const';
import {OneContractService} from './one-contract-service';
import {ModalService} from '../../shared/modal-module/modal.service';
import {PopupService} from '../../shared/popup-module/popup.service';
import {JsUtils} from '../../utils/jsUtils';
import {contractToShow} from './one-contract.const';

@Component({
  selector: 'app-one-contract',
  templateUrl: './create-one-contract.component.html',
  styleUrls: ['./create-one-contract.component.scss', './one-contract-shared.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateOneContractComponent implements OnInit, AfterViewInit, OnDestroy {
  public subscriptionsArray: any[] = [];
  public leftWrapperHasScroll: boolean = false;
  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public contractHotelNameText: string;
  public scrollDistance: number = 0;
  public auditName: string = '';
  public modificationDate: string = '';
  public hotelName: string = '';
  public selectedOption: any;
  public auditDetails: any;
  public selectedSectionIndex: number = 0;
  public sectionsToValidateWhenFocusedOut: number[] = [5];
  public sectionsDomElements: HTMLElement[];
  public skipScrollHandling: boolean = false;
  public isViewMode: boolean;
  public isSaved: boolean;

  public contractSections: any[] = [
    {name: 'Section 1', isSelected: true}, {name: 'Section2', isSelected: false},
    {name: 'Section 3', isSelected: false}, {name: 'Section4', isSelected: ''},
    {name: 'Section 5', isSelected: ''}, {name: 'Section 6', isSelected: ''},
    {name: 'Section 7', isSelected: ''}, {name: 'Section 8', isSelected: ''},
    {name: 'Section 9', isSelected: ''}, {name: 'Section 10', isSelected: ''},
    {name: 'Section 11', isSelected: ''}, {name: 'Section 12', isSelected: ''},
    {name: 'Section 13', isSelected: ''}, {name: 'Section 14', isSelected: ''},
    {name: 'Section 15', isSelected: ''}, {name: 'Section 16', isSelected: ''},
    {name: 'Section 17', isSelected: ''}, {name: 'Section 18', isSelected: ''},
    {name: 'Section 19', isSelected: ''}, {name: 'Section 20', isSelected: ''},
    {name: 'Section 21', isSelected: ''}, {name: 'Section 22', isSelected: ''},
    {name: 'Section 23', isSelected: ''},
  ];

  @ViewChild('oneContractContent') contractContent: ElementRef;
  @ViewChild('oneContractLeft') oneContractLeftWrapper: ElementRef;
  @ViewChild('saveButton') saveButton: ElementRef;

  constructor(public createOneContractService: CreateOneContractService,
              private activatedRoute: ActivatedRoute, private router: Router,
              private allOneContractService: AllOneContractService, private oneContractService: OneContractService,
              private modalService: ModalService, private popupService: PopupService, private httpClient: HttpClient,
              private route: ActivatedRoute, public  createOneContractStoreService: CreateOneContractStoreService) {
  }

  ngOnInit(): void {
    this.createOneContractService.oneContractId = null;
    this.createOneContractStoreService.oneContract$.next(null);
    this.createOneContractStoreService.isOneContractViewMode$.next(false);
    this.scrollDistance = this.contractContent.nativeElement.getClientRects()[0].top + 50;
    this.selectedOption = this.contractSections.filter(n => n.isSelected)[0];
    this.createOneContractService.allOneContractService.allServices.forEach((s, ind) => {
      this.subscriptionsArray.push(s.validation.subscribe(v => this.contractSections[ind].isInvalid = v && !v.isValid));
    });
    this.subscriptionsArray.push(this.createOneContractStoreService.contractHotelName$.subscribe(hotel => this.contractHotelNameText = hotel));
    this.subscriptionsArray.push(this.createOneContractStoreService.oneContract$.subscribe(this.oneContractHandler));
    this.subscriptionsArray.push(this.createOneContractStoreService.isOneContractViewMode$.subscribe(isViewMode => {
      this.isViewMode = isViewMode;
      if (isViewMode) {
        document.addEventListener('keydown', this.disableKeyDownEvent, true);
      } else {
        document.removeEventListener('keydown', this.disableKeyDownEvent, true);
      }
    }));

    this.route.params.subscribe(params => {
      if (params && params.oneContractId) {
        const contractFromStorage = localStorage.getItem('contract');
        if (contractFromStorage) {
          setTimeout(() => this.createOneContractStoreService.oneContract$.next(JSON.parse(contractFromStorage)));
        }
      }
    });

    setTimeout(this.setEmptyOneContract);
  }

  private setEmptyOneContract = () => {
    this.createOneContractStoreService.contractSeasons$.pipe(take(1)).subscribe(seasons => {
      const oneContract = this.allOneContractService.buildOneContract();
      this.createOneContractService.addSeasonAndTravelWindowToOneContract(oneContract, seasons);
      this.oneContractService.emptyOneContract = JsUtils.deepCopy(oneContract);
    });
  };

  newContract() {
    this.createOneContractStoreService.oneContract$.next(null);
    this.allOneContractService.allServices.forEach(srv => {
      srv.validation.next({isValid: true, message: ''});
    });
    setTimeout(() => this.router.navigate(['contract']));
  }

  disableKeyDownEvent(e: any): void {
    e.stopPropagation();
    e.preventDefault();
  }

  ngAfterViewInit(): void {
    this.resizeHandler();
  }

  save(): Observable<boolean> {
    const saveDone$: Subject<boolean> = new Subject<boolean>();
    setTimeout(() => saveDone$.next(true));
    return saveDone$;
  }

  updateAuditDetails = (oneContract: any) => {
    if (oneContract && oneContract.audit) {
      this.auditDetails = {};
      this.auditDetails.modificationDate = oneContract.audit.updateDate || oneContract.audit.creationDate || '';
      this.auditDetails.auditName = oneContract.audit.updateUser || oneContract.audit.creationUser || '';
      if (this.auditDetails.modificationDate) {
        const utcDate = moment.utc(this.auditDetails.modificationDate, 'YYYY-MM-DD[T]HH:mm:ss');
        this.auditDetails.modificationDate = moment(utcDate.toDate()).format('DD/MM/YYYY HH:mm:ss');
      }
    }
    this.calcSaveButtonPosition();
  };

  @HostListener('window:scroll', ['$event'])
  scrollHandler($event: any): void {
    if (this.skipScrollHandling) {
      return;
    }

    if (!this.sectionsDomElements) {
      this.sectionsDomElements = this.contractContent.nativeElement.querySelectorAll('.page-section');
    }

    let nextSelectedSectionIndex = -1;
    this.sectionsDomElements.forEach((c, index) => {
      const elmTRects: any = c.getClientRects()[0];
      if (elmTRects.top <= this.scrollDistance) {
        nextSelectedSectionIndex = index;
      }
    });
    if (nextSelectedSectionIndex > -1) {
      this.updateSelectedSection(nextSelectedSectionIndex);
      this.calcSaveButtonPosition();
    }
  }

  updateSelectedSection(index: number): void {
    this.selectedOption.isSelected = false;
    this.selectedOption = this.contractSections[index];
    this.selectedOption.isSelected = true;

    if (this.selectedSectionIndex !== index && this.sectionsToValidateWhenFocusedOut.indexOf(this.selectedSectionIndex) > -1) {
      this.allOneContractService.focusedOutSection(this.selectedSectionIndex);
    }
    this.selectedSectionIndex = index;
  }

  calcSaveButtonPosition(): void {
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (viewportWidth <= 1540) {
      let calcedTop: number = this.contractContent.nativeElement.getClientRects()[0].y - this.contractContent.nativeElement.offsetTop;
      if (calcedTop < 0) {
        calcedTop = calcedTop * -1;
      }
      calcedTop += 20;
      this.saveButton.nativeElement.style.top = calcedTop + 'px';
    } else {
      this.saveButton.nativeElement.style.top = (this.auditDetails ? 147 : 136) + 'px';
    }
  }

  @HostListener('window:resize', ['$event'])
  resizeHandler(): void {
    const elementsHeight: number = document.getElementsByClassName('contract-section-item')[0].getClientRects()[0].height * this.contractSections.length;
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    setTimeout(() => {
      this.leftWrapperHasScroll = elementsHeight > (viewportHeight * 0.8);
      this.calcSaveButtonPosition();
    }, 0);
  }

  scrollToSection(ind: number): void {
    if (!this.sectionsDomElements) {
      this.sectionsDomElements = this.contractContent.nativeElement.querySelectorAll('.page-section');
    }

    const selectedElement: any = this.sectionsDomElements[ind];

    if (JsUtils.isDefined(selectedElement)) {
      this.skipScrollHandling = true;
      const calculatedScroll: number = this.sectionsDomElements[ind].offsetTop - 13.5;
      this.contractContent.nativeElement.parentElement.parentElement.scrollTo(0, calculatedScroll);
      this.updateSelectedSection(ind);
      setTimeout(() => this.skipScrollHandling = false);
    }
  }

  saveOneContract = () => {
    this.isSaved = true;
    return <any>this.createOneContractService.saveOneContract(this.updateAuditDetails);
  };

  loadContract() {
    this.router.navigate(['contract']);
    this.createOneContractStoreService.oneContract$.next(contractToShow);
  }

  private oneContractHandler = (oneContract: any) => {
    this.updateAuditDetails(oneContract);
    if (oneContract && oneContract.publishedDate) {
      this.createOneContractStoreService.isOneContractViewMode$.next(true);
    } else {
      this.createOneContractStoreService.isOneContractViewMode$.next(false);
    }
  };

  ngOnDestroy(): void {
    this.subscriptionsArray.forEach((subscription: any) => subscription.unsubscribe());
    this.createOneContractService.oneContractId = null;
    this.createOneContractStoreService.oneContract$.next(null);
    this.createOneContractStoreService.isOneContractViewMode$.next(false);
    document.removeEventListener('keydown', this.disableKeyDownEvent, true);
  }
}
