import {Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MainHeaderService} from '../main-header.service';
import {newLevels1} from '../main-header.const';

@Component({
	selector: 'app-menu-item',
	templateUrl: './menu-item.component.html',
	styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit, OnChanges, OnDestroy {

	public triangleLeftPosition: string;
	public selectedMenu: IMenu;
	public menuItemWidth: string;
	public menuItemTopStyle: string;
	public menuWidthBreakPoint: number = 1600;
	public menuLoaded: boolean = false;
	public newLevels1: number[] = newLevels1;
	public unsubscribe: any[] = [];

	@Input() headerTabElement: any;
	@Input() mainHeaderElement: any;
	@Input() headerTabData: IHeaderTab;

	constructor(public mainHeaderService: MainHeaderService) {
	}

	ngOnInit(): void {
		this.setMenuPosition();
		this.unsubscribe.push(this.mainHeaderService.menuLoaded$.subscribe(c => this.menuLoaded = c));
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.headerTabElement && this.mainHeaderElement) {
			this.animateMenuCursor(this.headerTabElement, this.mainHeaderElement);
		}
		if (changes.headerTabData) {
			this.selectedMenu = changes.headerTabData.currentValue.menus[0];
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(): void {
		this.setMenuPosition();
		this.animateMenuCursor(this.headerTabElement, this.mainHeaderElement);
	}

	setMenuPosition(): void {
		const {left, height} = this.mainHeaderElement.getBoundingClientRect();
		const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		this.menuItemWidth = `calc(90vw - ${left}px)`;
		this.menuItemTopStyle = `${height + 1}px`;
	}

	animateMenuCursor(headerTabElement: any, mainHeaderElement: any): any {
		const headerTabElementWidth = headerTabElement.clientWidth;
		const mainHeaderLeftPosition = mainHeaderElement.getBoundingClientRect().left;
		const headerTabLeftPosition = headerTabElement.getBoundingClientRect().left;
		const cursorWidth = 32;
		this.triangleLeftPosition = `${(headerTabLeftPosition + headerTabElementWidth / 2) - (cursorWidth / 2 + mainHeaderLeftPosition)}px`;
	}

	onSelectMenu(menuItem: IMenu): void {
		this.selectedMenu = menuItem;
	}

	getMenuItemClass(): string {
		return this.menuLoaded ? 'menu-item' : 'menu-item hidden';
	}

	getIcon(iconName: string): string {
		return `assets/icons/images/${iconName}`;
	}

	ngOnDestroy() {
		this.unsubscribe.forEach(subscription => subscription.unsubscribe())
	}
}
