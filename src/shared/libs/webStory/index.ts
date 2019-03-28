const Left = 'left';
const Right = 'right';
const Top = 'top';
const Bottom = 'bottom';
const ToolTip = 1;
const Modal = 2;
const MAX_WIDTH = 400;

const welcomePageTemplate = `
	<div class="welcome-page">
		<div class="flex wp-container">
			<div class="up flex">
				<div class="up-content">
					<div class="header flex">
						<span>{{header}}</span>
						<div class="subHeader flex">{{subHeader}}</div>
					</div>
				</div>
			</div>
			<div class="down flex">
				<div class="flex start-section">
					<div class="start-story"><span>START TOUR</span></div>
				</div>
				<div class="flex bye-actions">
					<label>
						<input class="story-neverTell" type="checkbox">
						<span class="story-neverTell-label">Do not suggest tours for this page</span>
					</label>
					<a href="#" class="story-skip"><span>Skip Tour</span></a>
				</div>
			</div>
		</div>
	</div>`;

const purpleFlowerTemplate = `
	<div class="purple-flower">
		<div class="flex header">{{header}}</div>
		<div class="flex content"><span>{{content}}</span></div>
		<div flex class="story-actions">
			<span class="page-counter">{{currentPageNumber}}/{{totalPages}}</span>
			<button class="story-back flex-auto">
				<div class="btn-content-left">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
					<span>Back</span>
				</div>
			</button>
			<button class="story-next flex-auto">
				<div class="btn-content-right">
					<span>Next</span>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
				</div>
			</button>
		</div>
		<div class="seperator"></div>
		<div class="footer">
			<label>
				<input class="story-neverTell" type="checkbox" />
				<span>Do not suggest tours for this page</span>
			</label>
			<a href="#" class="story-skip"><span>Skip Tour</span></a>
		</div>
	</div>`;

const purpleFlowerLastPageTemplate = `
	<div class="purple-flower">
		<div class="flex header">{{header}}</div>
		<div class="flex content"><span>{{content}}</span></div>
		<div flex class="story-actions">
			<span class="page-counter">{{currentPageNumber}}/{{totalPages}}</span>
			<button class="story-back flex-auto">
				<div class="btn-content-left">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
					<span>Back</span>
				</div>
			</button>
			<button class="story-end flex-auto">
				<div class="btn-content-right">
					<span>End</span>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
				</div>
			</button>
		</div>
		<div class="seperator"></div>
		<div class="footer">
			<label>
				<input class="story-neverTell" type="checkbox" />
				<span>Do not suggest tours for this page</span>
			</label>
			<a href="#" class="story-skip"><span>Skip Tour</span></a>
		</div>
	</div>`;


function appendToBody(element, marginFromElement?) {
	if (document.body) {
		document.body.appendChild(element);
		if (marginFromElement) {
			setScrollPosition(element, marginFromElement);
		}
	}
}

function setScrollPosition(element, margin) {
	var elementRectInfo = element.getBoundingClientRect();
	var elementBottomPosition = element.style.top ? parseInt(element.style.top) : elementRectInfo.bottom;
	var elementRightPosition = element.style.left ? (parseInt(element.style.left) + elementRectInfo.width) : elementRectInfo.right;
	window.scrollTo(elementRightPosition - (margin * 2), elementBottomPosition - (margin * 2));
}

function setStyle(element, styleObj) {
	var keys = Object.keys(styleObj);
	for (var i = 0; i < keys.length; i++) {
		var styleName = keys[i];
		if (element.style[styleName] !== undefined && element.style[styleName] !== null) {
			element.style[styleName] = styleObj[styleName];
		}
	}
}

function getElementByHtmlTemplate(htmlTemplate) {
	const template = document.createElement('div');
	template.innerHTML = htmlTemplate;
	
	return template.firstChild;
}

function waitForElement(selector, timeout) {
	var timeToTryAgain = 100;
	return new Promise(function (resolve, reject) {
		var executeCount = 0;
		
		function start() {
			if (executeCount >= (timeout / timeToTryAgain)) {
				reject('element has not been found and the timeout is passed');
			}
			setTimeout(function () {
				var element = document.querySelector(selector);
				if (element) {
					resolve(element);
					return;
				}
				else {
					executeCount++;
					start();
				}
			}, timeToTryAgain);
		}
		
		start();
	});
}

function getFullDateFormated() {
	function getTime(timeDigit) {
		return timeDigit < 9 ? '0' + timeDigit : timeDigit;
	}
	
	var date = new Date();
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + getTime(date.getHours() + 1) + ':' + getTime(date.getMinutes() + 1);
}

function isFunction(obj) {
	return typeof obj === 'function';
}

function isNull(obj) {
	return obj === null;
}

function isBoolean(obj) {
	return typeof obj === 'boolean';
}

function isString(obj) {
	return typeof obj === 'string';
}

function getTemplate(htmlTemplate) {
	
	const token = '{{key}}';
	
	return function (data) {
		var keys = Object.keys(data);
		for (var i = 0; i < keys.length; i++) {
			var reg = new RegExp(token.replace('key', keys[i]), 'g');
			htmlTemplate = htmlTemplate.replace(reg, data[keys[i]]);
		}
		return htmlTemplate;
	};
}

function addEvent(selector, eventName, callback) {
	const element = isString(selector) ? document.querySelector(selector) : selector;
	
	if (element) {
		element.addEventListener(eventName, callback);
	}
}

function removeEvent(selector, eventName, callback) {
	const element = isString(selector) ? document.querySelector(selector) : selector;
	
	if (element) {
		element.removeEventListener(eventName, callback);
	}
}


const StorageContainer = (function () {
	function StorageContainer(itemList, isFirstCount) {
		this.isFirstCount = isFirstCount;
		this.items = itemList;
		this.currentIndex = -1;
	}
	
	StorageContainer.prototype.moveNext = function () {
		if ((this.currentIndex + 1) >= this.items.length) {
			return null;
		}
		//handle case first time then isDone only in case there is less or equal then 1 item in the itemList
		this.currentIndex++;
		return {
			isLast: this.currentIndex >= (this.items.length - 1),
			data: this.items[this.currentIndex]
		};
	};
	StorageContainer.prototype.moveBack = function () {
		if (this.currentIndex <= 0) {
			return null;
		}
		this.currentIndex--;
		return {
			isLast: this.isFirstCount ? this.currentIndex === 1 : this.currentIndex === 0,
			data: this.items[this.currentIndex]
		};
	};
	return StorageContainer;
}());

const StoryTooltip = (function () {
	function StoryTooltip(template, timeout, isAutoScrolling?) {
		this.marginFromContainer = 25;
		this.containerClass = 'story-tool-tip-container ';
		this.timeout = timeout ? timeout : 5000;
		this.htmlTemaplte = this.setTooltipTemplate(template);
		this.isAutoScrolling = isBoolean(isAutoScrolling) ? isAutoScrolling : true;
		
		this.element = getElementByHtmlTemplate(this.htmlTemaplte);
	}
	
	StoryTooltip.prototype.setTooltip = function (selector, position) {
		return new Promise((resolve, reject) => {
			this.calculateElementLocationAndSizes(selector).then((elementData) => {
				var tooltipLocation = this.getTooltipLocation(elementData, position);
				if (tooltipLocation !== null) {
					this.appendTooltip(tooltipLocation, position);
					resolve(ToolTip);
				}
			}, function (error) {
				reject(error);
			});
		});
	};
	StoryTooltip.prototype.resetTooltip = function (selector, position) {
		this.removeTooltip();
		return this.setTooltip(selector, position);
	};
	StoryTooltip.prototype.removeTooltip = function () {
		let element = this.element;
		
		element && element.parentNode && element.parentNode.removeChild(element);
		
	};
	StoryTooltip.prototype.destroy = function () {
		this.removeTooltip();
	};
	//locations and size(calculation)
	StoryTooltip.prototype.calculateElementLocationAndSizes = function (selector) {
		return new Promise((resolve, reject) => {
			waitForElement(selector, this.timeout).then((element) => {
				resolve({
					location: this.calculateElementLocation(element),
					size: this.calculateElementSize(element)
				});
			}, function (error) {
				reject(error);
			});
		});
	};
	StoryTooltip.prototype.calculateElementLocation = function (element) {
		if (element) {
			const rect = element.getBoundingClientRect();
			const scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
			const scrollLeft = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
			const elementTop = rect.top + scrollTop;
			const elementLeft = rect.left + scrollLeft;
			
			return {
				left: elementLeft,
				top: elementTop
			};
		}
		return (null);
	};
	StoryTooltip.prototype.calculateElementSize = function (element) {
		if (element) {
			var rect = element.getBoundingClientRect();
			return {
				height: rect.height,
				width: rect.width
			};
		}
	};
	StoryTooltip.prototype.getTooltipLocation = function (containerData, position) {
		var tooltipSize = this.measureSize(this.htmlTemaplte);
		if (tooltipSize !== null) {
			switch (position) {
				case Right:
					return {
						top: containerData.location.top - ((tooltipSize.height - containerData.size.height) / 2),
						left: containerData.location.left + (containerData.size.width + this.marginFromContainer)
					};
				case Left:
					return {
						top: containerData.location.top - ((tooltipSize.height - containerData.size.height) / 2),
						left: containerData.location.left - (tooltipSize.width + this.marginFromContainer)
					};
				case Top:
					return {
						top: containerData.location.top - (tooltipSize.height + this.marginFromContainer),
						left: this.getPercentage(containerData.size.width, tooltipSize.width) < 6 ? containerData.location.left - (tooltipSize.width * 0.05) : containerData.location.left
					};
				case Bottom:
					return {
						top: containerData.location.top + (containerData.size.height + this.marginFromContainer),
						left: this.getPercentage(containerData.size.width, tooltipSize.width) < 6 ? containerData.location.left - (tooltipSize.width * 0.05) : containerData.location.left
					};
				default:
					return null;
			}
		}
		return null;
	};
	StoryTooltip.prototype.getPercentage = function (small, big) {
		return Math.abs(small / big) * 100;
	};
	StoryTooltip.prototype.measureSize = function (template) {
		if (template === null) {
			return null;
		}
		const element: any = getElementByHtmlTemplate(template);
		element.style.position = 'absolute';
		if (element) {
			appendToBody(element);
			const rectInfo = document.getElementsByClassName(this.containerClass)[0].getBoundingClientRect();
			const size = {
				height: rectInfo.height,
				width: rectInfo.width > MAX_WIDTH ? MAX_WIDTH : rectInfo.width
			};
			//element.remove();
			element.parentNode.removeChild(element);
			return size;
		}
	};
	//others
	StoryTooltip.prototype.setTooltipTemplate = function (tooltipContentTemplate) {
		return `<div class="${this.containerClass}">${tooltipContentTemplate}</div>`;
	};
	//DOM Manipulation
	StoryTooltip.prototype.appendTooltip = function (tooltipLocation, position) {
		const element = this.element;
		
		setStyle(element, {
			left: `${tooltipLocation.left}px`,
			top: `${tooltipLocation.top}px`
		});
		element.classList.add(position);
		
		appendToBody(element, this.isAutoScrolling ? this.marginFromContainer : null);
	};
	
	return StoryTooltip;
}());

const StoryModalCreator = (function () {
	function StoryModalCreator(htmlTemplate) {
		this.containerMaskClass = 'story-modal-container-mask';
		this.containerContentClass = 'story-modal-container';
		this.currentModelId = this.generateId();
		this.modelTemplate = this.setTemplate(htmlTemplate);
	}
	
	StoryModalCreator.prototype.showModal = function () {
		const modal = getElementByHtmlTemplate(this.modelTemplate);
		appendToBody(modal);
		return new Promise(function (resolve, reject) {
			resolve(Modal);
		});
	};
	StoryModalCreator.prototype.removeModal = function () {
		//document.getElementById(this.currentModelId).remove();
		const element = document.getElementById(this.currentModelId);
		element.parentNode.removeChild(element);
	};
	StoryModalCreator.prototype.setTemplate = function (modalContentTemplate) {
		return `<div id="${this.currentModelId}" class="${this.containerMaskClass}"><div class="${this.containerContentClass}">${modalContentTemplate}</div></div>`;
	};
	StoryModalCreator.prototype.generateId = function () {
		return 'story-modal-' + getFullDateFormated();
	};
	return StoryModalCreator;
}());

const StoryViewer = (function () {
	function StoryViewer(renderTimeout, isAutoScrolling) {
		this.renderTimeout = renderTimeout;
		this.isAutoScrolling = isAutoScrolling;
		this.renderTimeout = renderTimeout;
		this.isAutoScrolling = isAutoScrolling;
	}
	
	StoryViewer.prototype.setPage = function (page) {
		//remove old tool tip is has any
		if (this.tooltip) {
			this.destroyTooltipInstance();
		}
		if (this.modalCreator) {
			this.destroyModal();
		}
		if (page) {
			if (page.pageContainer) {
				//tooltip
				const fullHtmlTemplate = this.createTemplate(page.data, page.template);
				if (fullHtmlTemplate) {
					this.tooltip = new StoryTooltip(fullHtmlTemplate, this.renderTimeout);
					this.currentPage = page;
					return this.tooltip.setTooltip(page.pageContainer.cssSelector, page.pageContainer.position);
				}
			}
			else {
				//modal
				const fullHtmlTemplate = this.createTemplate(page.data, page.template);
				if (fullHtmlTemplate) {
					this.modalCreator = new StoryModalCreator(fullHtmlTemplate);
					return this.modalCreator.showModal();
				}
			}
		}
	};
	StoryViewer.prototype.resetPage = function () {
		
		return this.tooltip.resetTooltip(this.currentPage.pageContainer.cssSelector, this.currentPage.pageContainer.position);
		
	};
	StoryViewer.prototype.destroyTooltipInstance = function () {
		this.tooltip.destroy();
		this.tooltip = undefined;
	};
	StoryViewer.prototype.destroyModal = function () {
		this.modalCreator.removeModal();
		this.modalCreator = undefined;
	};
	StoryViewer.prototype.createTemplate = function (data, htmlTemplate) {
		try {
			return getTemplate(htmlTemplate)(data);
		}
		catch (error) {
			console.error('cant create template the data and the template is not suitable');
			return null;
		}
	};
	return StoryViewer;
}());

const StoryContainer = (function () {
	function StoryContainer(pages, renderTimeout, isAutoScrolling) {
		this.isHasModal = this.setPageDataWithCurrentPageNumber(pages);
		this.storage = new StorageContainer(pages, this.isHasModal);
		this.viewer = new StoryViewer(renderTimeout, isAutoScrolling);
	}
	
	StoryContainer.prototype.moveNext = function () {
		const currentPage = this.storage.moveNext();
		return this.viewer.setPage(currentPage.data).then(function (viewType) {
			return {
				viewType: viewType,
				isLast: currentPage.isLast,
				isDefault: currentPage.data.isDefault
			};
		});
	};
	StoryContainer.prototype.resetPage = function () {
		return this.viewer.resetPage();
	};
	StoryContainer.prototype.moveBack = function () {
		const currentPage = this.storage.moveBack();
		return this.viewer.setPage(currentPage.data).then(function (viewType) {
			return {
				viewType: viewType,
				isLast: currentPage.isLast,
				isDefault: currentPage.data.isDefault
			};
		});
	};
	StoryContainer.prototype.skipStory = function () {
		this.endStory();
	};
	StoryContainer.prototype.endStory = function () {
		this.storage = undefined;
		this.viewer.setPage(null);
		//this.viewer = undefined;
	};
	StoryContainer.prototype.setPageDataWithCurrentPageNumber = function (pages) {
		let isHasModal = false;
		for (let i = 0; i < pages.length; i++) {
			if (!pages[i].pageContainer) {
				isHasModal = true;
				break;
			}
			pages[i].data.currentPageNumber = i + 1;
			pages[i].data.totalPages = pages.length;
		}
		if (isHasModal) {
			for (let i = 1; i < pages.length; i++) {
				pages[i].data.currentPageNumber = i;
				pages[i].data.totalPages = pages.length - 1;
			}
		}
		return isHasModal;
	};
	return StoryContainer;
}());

const WebStory = (function () {
	function WebStory(settings) {
		const _this = this;
		this.initialized = false;
		this.started = false;
		this.neverTell = false;
		this.startStoryCallCount = 0;
		this.moveNextStoryCallCount = 0;
		this.getCurrentPageName = settings.getCurrentPageName;
		this.lifeStyleCallbacks = settings.lifeStyleCallbacks || {};
		this.configuration = settings.configuration || {
			isAutoScrolling: null,
			renderTimeout: null
		};
		
		this.startStory = function () {
			
			if (!_this.isNeverTell()) {
				_this.startStoryCallCount++;
				_this.initialized = true;
				if (_this.moveNextStoryCallCount === 0 && _this.startStoryCallCount <= 1) {
					return _this.storyContainer.moveNext().then(function (pageInfo) {
						
						if (pageInfo.viewType === Modal) {
							addEvent('.start-story', 'click', _this.startFirstPage);
							addEvent('.story-skip', 'click', _this.skip);
							addEvent('.story-neverTell', 'change', _this.setNeverTell);
						}
					});
				}
				else {
					console.error('you calling moveNext before start or you called startStory already');
				}
			}
		};
		
		this.endStory = function (event) {
			if (event) {
				event.preventDefault();
			}
			
			if (_this.initialized) {
				if (_this.lifeStyleCallbacks && isFunction(_this.lifeStyleCallbacks.afterEnding)) {
					_this.lifeStyleCallbacks.afterEnding();
				}
				_this.storyContainer.endStory();
				removeEvent(window, 'resize', _this.onResize);
				_this.removeAllStoryAction();
				
				if (_this.neverTell) {
					localStorage.setItem(_this.getNeverTellId(), 'never');
				}
			}
		};
		
		this.startFirstPage = function () {
			
			_this.started = true;
			
			return _this.storyContainer.moveNext().then(function (pageInfo) {
				
				const checkbox = document.querySelector('.story-neverTell') as HTMLInputElement;
				
				checkbox.checked = _this.neverTell;
				_this.isLastPage = pageInfo.isLast;
				_this.setStoryActions(_this.isLastPage);
				_this.disableByClassName('story-back');
				
			});
		};
		this.moveNext = function (event) {
			event.preventDefault();
			if (_this.lifeStyleCallbacks && isFunction(_this.lifeStyleCallbacks.preMoveNext)) {
				_this.lifeStyleCallbacks.preMoveNext();
			}
			if (!_this.isLastPage) {
				_this.moveNextStoryCallCount++;
				_this.removeOldStoryAction();
				_this.storyContainer.moveNext().then(function (pageInfo) {
					
					const checkbox = document.querySelector('.story-neverTell') as HTMLInputElement;
					
					checkbox.checked = _this.neverTell;
					_this.isLastPage = pageInfo.isLast;
					_this.isFirstPage = false;
					_this.setStoryActions(_this.isLastPage);
				});
			}
		};
		this.moveBack = function (event) {
			event.preventDefault();
			if (_this.lifeStyleCallbacks && isFunction(_this.lifeStyleCallbacks.preMoveBack)) {
				_this.lifeStyleCallbacks.preMoveBack();
			}
			if (!_this.isFirstPage) {
				_this.storyContainer.moveBack().then(function (pageInfo) {
					
					const checkbox = document.querySelector('.story-neverTell') as HTMLInputElement;
					
					checkbox.checked = _this.neverTell;
					_this.isFirstPage = pageInfo.isLast;
					_this.isLastPage = false;
					_this.setStoryActions();
					_this.isFirstPage && _this.disableByClassName('story-back');
				});
			}
		};
		
		this.skip = function (event) {
			event.preventDefault();
			
			if (_this.lifeStyleCallbacks && isFunction(_this.lifeStyleCallbacks.preSkip)) {
				_this.lifeStyleCallbacks.preSkip();
			}
			_this.storyContainer.skipStory();
			
			if (_this.neverTell) {
				localStorage.setItem(_this.getNeverTellId(), 'never');
			}
		};
		
		this.setNeverTell = function (event) {
			
			_this.neverTell = event.target.checked;
		};
		
		this.getNeverTellId = function () {
			const pageName = _this.getCurrentPageName();
			if (pageName) {
				return 'story-never-tell-' + pageName;
			}
			return null;
		};
		
		this.onResize = function () {
			
			if (_this.started && !_this.isNeverTell()) {
				if (_this.storyContainer && isFunction(_this.storyContainer.resetPage)) {
					
					_this.storyContainer.resetPage().then(function () {
						if (_this.isLastPage) {
							addEvent('.story-end', 'click', _this.endStory);
							_this.setStoryActions(true);
						}
						else if (_this.isFirstPage) {
							_this.setStoryActions();
							_this.disableByClassName('story-back');
						}
						else {
							_this.setStoryActions();
						}
					});
				}
			}
		};
		
		if (!isFunction(this.getCurrentPageName)) {
			throw new Error('Please provide page name by setting the getCurrentPageName function in the settings');
		}
		
		
		addEvent(window, 'resize', this.onResize);
		this.storyContainer = new StoryContainer(this.setPagesWithDefaultTemplate(settings.pages), this.configuration.renderTimeout, this.configuration.isAutoScrolling);
	}
	
	WebStory.prototype.isNeverTell = function () {
		const neverTellId = this.getNeverTellId();
		if (neverTellId) {
			return localStorage.getItem(neverTellId);
		}
		else {
			console.error('cant start get page name please fill getCurrentPageName function');
		}
		return null;
	};
	WebStory.prototype.disableByClassName = function (className) {
		const elements = document.getElementsByClassName(className);
		if (elements[0]) {
			elements[0].attributes.setNamedItem(document.createAttribute('disabled'));
		}
	};
	
	WebStory.prototype.setStoryActions = function (isEnd = false) {
		
		if (isEnd) {
			addEvent('.story-end', 'click', this.endStory);
		}
		else {
			addEvent('.story-next', 'click', this.moveNext);
		}
		addEvent('.story-back', 'click', this.moveBack);
		addEvent('.story-skip', 'click', this.skip);
		addEvent('.story-neverTell', 'change', this.setNeverTell);
	};
	
	WebStory.prototype.removeOldStoryAction = function () {
		removeEvent('.story-next', 'click', this.moveNext);
		removeEvent('.story-back', 'click', this.moveBack);
		removeEvent('.story-skip', 'click', this.skip);
		removeEvent('.story-neverTell', 'change', this.setNeverTell);
	};
	
	WebStory.prototype.removeAllStoryAction = function () {
		removeEvent('.story-next', 'click', this.moveNext);
		removeEvent('.story-back', 'click', this.moveBack);
		removeEvent('.story-skip', 'click', this.skip);
		removeEvent('.story-neverTell', 'change', this.setNeverTell);
		removeEvent('.story-end', 'click', this.endStory);
	};
	
	WebStory.prototype.setPagesWithDefaultTemplate = function (pages) {
		const newPages = [];
		let isModalDefiend = false;
		for (let i = 0; i < pages.length; i++) {
			if (!pages[i].pageContainer) {
				isModalDefiend = true;
				if (!pages[i].data.header) {
					pages[i].data.header = 'Welcome to ' + this.getCurrentPageName() + ' Tour!';
				}
				if (!pages[i].data.subHeader) {
					pages[i].data.subHeader = '';
				}
				if (!pages[i].template) {
					pages[i].template = welcomePageTemplate;
					pages[i].isDefault = true;
				}
				else {
					pages[i].isDefault = false;
				}
			}
			newPages.push({
				data: pages[i].data,
				pageContainer: pages[i].pageContainer,
				template: pages[i].template ? pages[i].template : this.getDefaultTemplate(i == (pages.length - 1)),
				isDefault: !pages[i].template
			});
		}
		if (!isModalDefiend) {
			newPages.unshift({
				data: {
					header: 'Welcome to ' + this.getCurrentPageName() + ' Tour!',
					subHeader: ''
				},
				pageContainer: null,
				template: welcomePageTemplate
			});
		}
		return newPages;
	};
	
	WebStory.prototype.getDefaultTemplate = function (isLastPage) {
		if (isLastPage) {
			return purpleFlowerLastPageTemplate;
		}
		return purpleFlowerTemplate;
	};
	
	return WebStory;
}());

export {WebStory};
