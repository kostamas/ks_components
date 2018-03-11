"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var transparent_shape_modal_component_1 = require("./transparent-shape-modal.component");
var TransparentShapeModalService = (function () {
    function TransparentShapeModalService(componentFactoryResolver, appRef, injector) {
        var _this = this;
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
        this.closeModal = function () {
            if (_this.componentRef) {
                _this.appRef.detachView(_this.componentRef.hostView);
                _this.componentRef.destroy();
            }
        };
    }
    TransparentShapeModalService_1 = TransparentShapeModalService;
    TransparentShapeModalService.prototype.openTransparentShapeModal = function (position, radius, config) {
        var circleClickHandler = config.circleClickHandler, backgroundClickHandler = config.backgroundClickHandler;
        position.left -= radius / 2;
        position.top -= radius / 2;
        // good article by Carlos Roso - Angular Pro Tip: How to dynamically create components in <body>
        // https://medium.com/@caroso1222/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
        this.componentRef = this.componentFactoryResolver
            .resolveComponentFactory(transparent_shape_modal_component_1.TransparentShapeModalComponent)
            .create(this.injector);
        this.componentRef.instance.position = position;
        this.componentRef.instance.radius = radius;
        this.componentRef.instance.transparentShapeClickHandler = circleClickHandler || TransparentShapeModalService_1.noop;
        this.componentRef.instance.backgroundClickHandler = backgroundClickHandler || this.closeModal;
        this.componentRef.instance.shape = config.shape || 'circle';
        this.appRef.attachView(this.componentRef.hostView);
        var domElem = this.componentRef.hostView
            .rootNodes[0];
        document.body.appendChild(domElem);
    };
    TransparentShapeModalService.noop = function () {
    };
    TransparentShapeModalService = TransparentShapeModalService_1 = __decorate([
        core_1.Injectable()
    ], TransparentShapeModalService);
    return TransparentShapeModalService;
    var TransparentShapeModalService_1;
}());
exports.TransparentShapeModalService = TransparentShapeModalService;
