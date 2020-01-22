import {NgModule} from '@angular/core';
import {ButtonsModule} from './buttons-module';
import {CalendarModule} from '../ks-components/calendarModule/calendar.module';
import {EllipseModule} from './ellipse-module/ellipse.module';
import {EllipseDetectorDirective} from './ellipse-module/ellipse-detector.directive';
import {AutoSuggestInputModule} from './inputs/auto-suggest-module/auto-suggest.module';
import {AutoSuggestInputComponent} from './inputs/auto-suggest-module/auto-suggest-input/auto-suggest-input.component';
import {InputWithErrorModule} from './inputs/input-with-error/input-with-error.module';
import {InputWithSymbolModule} from './inputs/input-with-symbol-module/input-with-symbol.module';
import {SelectModule} from './inputs/select-module/select.module';
import {SevenDaysSelectorModule} from './inputs/seven-days-input-module/seven-days-selector.module';
import {LoaderModule} from './loader-module/loader.module';
import {ModalModule} from './modal-module/modal.module';
import {PopupModule} from './popup-module';
import {SvgIconModule} from './svg-icon-module/svg-icon.module';
import {ToastModule} from './toast-module/toast.module';
import {TooltipModule} from './tooltip-module/tooltip.module';


@NgModule({
  declarations: [
    EllipseDetectorDirective,
    AutoSuggestInputComponent,
  ],
  imports: [
    ButtonsModule,
    CalendarModule,
    EllipseModule,
    AutoSuggestInputModule,
    InputWithErrorModule,
    InputWithSymbolModule,
    SelectModule,
    SevenDaysSelectorModule,
    LoaderModule,
    ModalModule,
    PopupModule,
    SvgIconModule,
    ToastModule,
    TooltipModule
  ],
  providers: [],
})
export class AppModule {
}
