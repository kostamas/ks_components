import {
	AfterViewInit, ChangeDetectorRef, Component, HostListener, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation
} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {DatePipe} from '@angular/common';
import {MainHeaderService} from './main-header.service';
import {filter, tap} from 'rxjs/operators';
import {UserDetails} from './user-details';
import {FavoritesService} from './favorites.service';
import {WrapperConnectorService} from '../../../services/wrapper-connector.service';
import {CommonService} from '../../services/common.service';
import {ACCOMMODATION_TAB_ID, BOOKING_TAB_ID,} from './main-header.const';
import {distributionRulesLevel1, searchSimulatorLevel1} from './new-links/level1';

@Component({
	selector: 'app-main-header',
	templateUrl: './main-header.component.html',
	styleUrls: ['./main-header.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MainHeaderComponent implements OnInit, AfterViewInit, OnDestroy {
	public headerTabs: IHeaderTab[];
	public favoritePages: IMenuLink[];
	public selectedHeaderTab: IHeaderTab;
	public userDetails: UserDetails = new UserDetails();
	public mainHeaderViewTypes: any = {expanded: 'expanded', collapsed: 'collapsed', collapsedIcons: 'collapsedIcons'};
	public mainHeaderView: string = this.mainHeaderViewTypes.expanded;
	public displayUserMenu: boolean = false;
	public selectedHeaderTabElement: any;
	public isAuthenticated: boolean = false;
	public isMenuItemOpen: boolean = false;
	public viewPointBreakLevel1: number = 0;
	public viewPointBreakLevel2: number = 0;
	public lockHeaderResize: boolean = false;
	public unsubscribeArr: any[] = [];

	private viewPointBreakOffset: number = 25;

	@ViewChild('currentDate') currentDate: any;
	@ViewChild('currentDateMobile') currentDateMobile: any;
	@ViewChild('mainHeaderLeftElement') mainHeaderLeftElement: any;
	@ViewChild('mainHeaderMobileRightSection') mainHeaderMobileRightSection: any;

	constructor(private cdRef: ChangeDetectorRef, public commonService: CommonService, private zone: NgZone,
							public authService: AuthService, private datePipe: DatePipe, private mainHeaderService: MainHeaderService,
							private favoritesService: FavoritesService, private wrapperConnectorService: WrapperConnectorService) {
	}

	ngOnInit(): void {
		const {authService, wrapperConnectorService, mainHeaderService, unsubscribeArr} = this;
		unsubscribeArr.push((wrapperConnectorService.officeName$.subscribe(officeName => this.userDetails.officeNumber = officeName)));
		unsubscribeArr.push((wrapperConnectorService.divisionName$.subscribe(divisionName => this.userDetails.division = divisionName)));
		unsubscribeArr.push((wrapperConnectorService.server$.subscribe(server => this.userDetails.ip = server)));
		unsubscribeArr.push((mainHeaderService.closeMenu$.subscribe(this.closeMenu)));
		unsubscribeArr.push((mainHeaderService.pageClick$.subscribe(this.closeMenu)));
		unsubscribeArr.push((authService.isAuthenticated$.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated)));
		unsubscribeArr.push(
			authService.isAuthenticated$.pipe(
				filter(isAuthenticated => !!isAuthenticated),
				tap((isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated)
			).subscribe(() => authService.getUserDetails(ud => this.userDetails = ud))
		);

		this.initMenus();
	}

	ngAfterViewInit(): void {
		this.resizeMainHeader();
		this.zone.runOutsideAngular(() => {
			setInterval(() => {
				if (this.currentDate) {
					this.currentDate.nativeElement.innerHTML = this.datePipe.transform(Date.now(), 'dd-LL-yyyy hh:mm:ss');
				}
				if (this.currentDateMobile) {
					this.currentDateMobile.nativeElement.innerHTML = this.datePipe.transform(Date.now(), 'dd-LL-yyyy hh:mm:ss');
				}
			}, 1000);
		});
		this.cdRef.detectChanges();
	}


	@HostListener('window:click', ['$event'])
	documentClickHandler = (event: any) => {
		const {mainHeaderLeftElement, mainHeaderMobileRightSection, favoritesService, displayUserMenu} = this;

		if (this.isMenuItemOpen && !mainHeaderLeftElement.nativeElement.contains(event.target)) {  // check if header tabs click
			this.closeMenu();
			if (this.mainHeaderService.mainHeaderConfig && this.mainHeaderService.mainHeaderConfig.isMainHeaderOpenHandler) {
				this.mainHeaderService.mainHeaderConfig.isMainHeaderOpenHandler(false);
			}
			setTimeout(favoritesService.getFavorites, 500);
		}

		if (!mainHeaderMobileRightSection.nativeElement.contains(event.target)) { // check if user details click
			if (displayUserMenu) {
				this.displayUserMenu = false;
				if (this.mainHeaderService.mainHeaderConfig && this.mainHeaderService.mainHeaderConfig.isMainHeaderOpenHandler) {
					this.mainHeaderService.mainHeaderConfig.isMainHeaderOpenHandler(false);
				}
			}
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(): void {
		if (!this.lockHeaderResize) {
			this.lockHeaderResize = true;
			setTimeout(() => {
				this.resizeMainHeader();
				this.lockHeaderResize = false;
			}, 500);
		}
	}

	initMenus(): void {
		this.mainHeaderService.getMenus(headerTabs => {
			this.headerTabs = headerTabs;
			this.headerTabs = this.addAngularLInks(this.headerTabs);
			this.mainHeaderView = this.mainHeaderViewTypes.expanded;
			this.favoritesService.favoritesList.subscribe(result => {
					if (result != null) {
						this.mapFavoritePages(result);
					}
					this.mainHeaderService.menuLoaded$.next(true);
				}
			);
			this.favoritesService.getFavorites();
			setTimeout(this.calcViewPortBreak.bind(this));
			this.buildPagePaths(headerTabs);
		});
	}

	buildPagePaths(headerTabs: IHeaderTab[]): void {
		const pagesPaths = {};
		headerTabs.forEach(level1 => {
			level1.menus.forEach(level2 => {
				level2.menus.forEach(level3 => {
					level3.menus.forEach(page => {
						pagesPaths[page.id] = {
							name: page.name,
							id: page.id,
							path: [
								{id: level1.id, name: level1.name},
								{id: level2.id, name: level2.name},
								{id: level3.id, name: level3.name},
							]
						};
					});
				});
			});
		});
		this.mainHeaderService.pagesPaths$.next(pagesPaths);
	}

	onHeaderTabClick(selectedHeaderTabElement: any, selectedHeaderTab: IHeaderTab): void {
		const isMenuItemClosed = this.selectedHeaderTabElement === null || this.selectedHeaderTabElement !== selectedHeaderTabElement;

		if (isMenuItemClosed) {
			this.favoritesService.getFavorites();
			this.selectedHeaderTabElement = selectedHeaderTabElement;
			this.selectedHeaderTab = selectedHeaderTab;
			this.displayUserMenu = false;
		} else {
			this.closeMenu();
		}
		this.isMenuItemOpen = isMenuItemClosed;

		if (this.mainHeaderService.mainHeaderConfig && this.mainHeaderService.mainHeaderConfig.isMainHeaderOpenHandler) {
			this.mainHeaderService.mainHeaderConfig.isMainHeaderOpenHandler(isMenuItemClosed);
		}
	}

	closeMenu = () => {
		this.selectedHeaderTabElement = null;
		this.selectedHeaderTab = null;
		this.isMenuItemOpen = false;
		if (this.mainHeaderService.mainHeaderConfig && this.mainHeaderService.mainHeaderConfig.isMainHeaderOpenHandler) {
			this.mainHeaderService.mainHeaderConfig.isMainHeaderOpenHandler(false);
		}
	}

	openUserMenu(): boolean {
		this.displayUserMenu = !this.displayUserMenu;
		if (this.displayUserMenu) {
			this.closeMenu();
		}
		if (this.mainHeaderService.mainHeaderConfig && this.mainHeaderService.mainHeaderConfig.isMainHeaderOpenHandler) {
			this.mainHeaderService.mainHeaderConfig.isMainHeaderOpenHandler(this.displayUserMenu);
		}
		return this.displayUserMenu;
	}

	resizeMainHeader(): void {
		const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		if (viewportWidth < this.viewPointBreakLevel2 + this.viewPointBreakOffset) {
			this.mainHeaderView = this.mainHeaderViewTypes.collapsedIcons;
			return;
		}

		if (viewportWidth < this.viewPointBreakLevel1 + this.viewPointBreakOffset) {
			this.mainHeaderView = this.mainHeaderViewTypes.collapsed;
			return;
		}
		this.calcViewPortBreak();
	}

	calcViewPortBreak(): void {
		const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		this.viewPointBreakLevel1 = this.calcLeftRightSectionsDiff();
		if (viewportWidth < this.viewPointBreakLevel1 + this.viewPointBreakOffset) {
			this.mainHeaderView = this.mainHeaderViewTypes.collapsed;
			this.cdRef.detectChanges();        // render new view and test view point break level 2
			this.viewPointBreakLevel2 = this.calcLeftRightSectionsDiff();
			if (viewportWidth < this.viewPointBreakLevel2 + this.viewPointBreakOffset) {
				this.mainHeaderView = this.mainHeaderViewTypes.collapsedIcons;
				this.viewPointBreakLevel1 = null;
			}

		} else {
			this.mainHeaderView = this.mainHeaderViewTypes.expanded;
			this.viewPointBreakLevel1 = null;
		}
	}

	calcLeftRightSectionsDiff(): number {
		const leftSection = document.getElementsByClassName('main-header-left-section')[0].getBoundingClientRect();
		const rightSection = document.getElementsByClassName('main-header-right-section')[0].getBoundingClientRect();
		return rightSection.width + leftSection.left + leftSection.width;
	}

	public mapFavoritePages(favorites: IMenuLink[]): void {
		this.favoritePages = favorites;
		const favoriteIds: number[] = this.favoritePages.map(f => f.id);
		this.headerTabs.forEach(headers => {
			headers.menus.forEach(subHeaders => {
				subHeaders.menus.forEach(subItems => {
					subItems.menus.forEach(subMenus => {
						subMenus.isFavorite = favoriteIds.includes(subMenus.id);
					});
				});
			});
		});
	}

	addAngularLInks = (tabs: any[]) => {
		tabs.forEach(level1 => {
			this.addNewLevel1(level1);
		});
		return tabs;
	}

	addNewLevel1(level1: any): void {
		switch (level1.id) {
			case BOOKING_TAB_ID:
				level1.menus.push(searchSimulatorLevel1);
				break;
			case ACCOMMODATION_TAB_ID:
				level1.menus.push(distributionRulesLevel1);
				break;
		}
	}

	logoutClick(): void {
		this.authService.logout();
	}

	showOfficeData(): boolean {
		return this.authService.authConfig && this.authService.authConfig.showOfficeData;
	}

	ngOnDestroy(): void {
		this.unsubscribeArr.forEach(subscription => subscription.unsubscribe());
	}
}
