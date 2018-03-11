"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var Rx_1 = require("rxjs/Rx");
var TransparentShapeModalAdapterComponent = (function () {
    function TransparentShapeModalAdapterComponent(transparentShapeModalService, document) {
        var _this = this;
        this.transparentShapeModalService = transparentShapeModalService;
        this.document = document;
        this.radius = 100;
        this.VIEW_STATES = {
            MODAL_CLOSED: 1,
            MODAL_OPENED: 2,
            MODAL_AND_STOP_BTN_OPENED: 3
        };
        this.currentViewState = this.VIEW_STATES.MODAL_CLOSED;
        this.selectedButton = '';
        this.shapes = ['circle', 'square', 'star'];
        this.selectedShape = this.shapes[0];
        this.noop = function () {
        };
        this.closeModal = function () {
            if (_this.interval || _this.interval === 0) {
                clearInterval(_this.interval);
            }
            _this.transparentShapeModalService.closeModal();
            _this.currentViewState = _this.VIEW_STATES.MODAL_CLOSED;
            _this.selectedButton = '';
        };
    }
    TransparentShapeModalAdapterComponent.prototype.ngOnInit = function () {
    };
    TransparentShapeModalAdapterComponent.prototype.openTransShapeModalByPos = function ($event) {
        if (this.currentViewState === this.VIEW_STATES.MODAL_CLOSED) {
            var position = { left: $event.clientX, top: $event.clientY };
            this.config = { backgroundClickHandler: this.closeModal, shape: this.selectedShape };
            this.transparentShapeModalService.openTransparentShapeModal(position, this.radius, this.config);
            this.currentViewState = this.VIEW_STATES.MODAL_AND_STOP_BTN_OPENED;
        }
    };
    TransparentShapeModalAdapterComponent.prototype.openTransShapeModal = function () {
        if (this.currentViewState === this.VIEW_STATES.MODAL_CLOSED) {
            var position = { left: 700, top: 300 };
            this.config = { backgroundClickHandler: this.closeModal, shape: this.selectedShape };
            this.transparentShapeModalService.openTransparentShapeModal(position, this.radius, this.config);
            this.currentViewState = this.VIEW_STATES.MODAL_AND_STOP_BTN_OPENED;
        }
    };
    TransparentShapeModalAdapterComponent.prototype.runModalInCircles = function () {
        var _this = this;
        if (this.currentViewState !== this.VIEW_STATES.MODAL_CLOSED) {
            return;
        }
        var x, y, degree = 0;
        var circleRadius = 150;
        this.currentViewState = this.VIEW_STATES.MODAL_AND_STOP_BTN_OPENED;
        this.interval = setInterval(function () {
            x = circleRadius * Math.cos((degree * Math.PI) / 180) + 600;
            y = circleRadius * Math.sin((degree * Math.PI) / 180) + 400;
            _this.config = { backgroundClickHandler: _this.noop, circleClickHandler: _this.noop, shape: _this.selectedShape };
            _this.transparentShapeModalService.closeModal();
            _this.transparentShapeModalService.openTransparentShapeModal({ left: x, top: y }, _this.radius, _this.config);
            degree += 10;
            degree = degree % 360;
        }, 30);
    };
    TransparentShapeModalAdapterComponent.prototype.playOnMouseEMove = function () {
        var _this = this;
        if (this.currentViewState !== this.VIEW_STATES.MODAL_CLOSED) {
            return;
        }
        var position;
        this.currentViewState = this.VIEW_STATES.MODAL_OPENED;
        this.selectedButton = 'on-mouse-move-selected';
        Rx_1.Observable.fromEvent(this.document.body, 'click')
            .skip(1)
            .switchMap(function (_a) {
            var clientX = _a.clientX, clientY = _a.clientY;
            _this.config = { shape: _this.selectedShape };
            position = { left: clientX, top: clientY };
            _this.transparentShapeModalService.openTransparentShapeModal(position, _this.radius, _this.config);
            return Rx_1.Observable.fromEvent(_this.document.body, 'mousemove');
        })
            .takeUntil(Rx_1.Observable.fromEvent(this.document.body, 'click').skip(2))
            .subscribe(function (_a) {
            var clientX = _a.clientX, clientY = _a.clientY;
            _this.closeModal();
            _this.config = { shape: _this.selectedShape };
            position = { left: clientX, top: clientY };
            _this.transparentShapeModalService.openTransparentShapeModal(position, _this.radius, _this.config);
        });
    };
    TransparentShapeModalAdapterComponent.prototype.ngOnDestroy = function () {
        if (this.currentViewState !== this.VIEW_STATES.MODAL_CLOSED) {
            this.closeModal();
        }
    };
    TransparentShapeModalAdapterComponent = __decorate([
        core_1.Component({
            selector: 'app-transparent-shape-modal-adapter',
            templateUrl: './transparent-shape-modal-adapter.component.html',
            styleUrls: ['./transparent-shape-modal-adapter.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(1, core_1.Inject(common_1.DOCUMENT))
    ], TransparentShapeModalAdapterComponent);
    return TransparentShapeModalAdapterComponent;
}());
exports.TransparentShapeModalAdapterComponent = TransparentShapeModalAdapterComponent;
