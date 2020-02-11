import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CreateOneContractService} from '../create-one-contract.service';
import {ContractOverridesService} from './contract-overrides.service';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {filter} from 'rxjs/operators';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {InputUtils} from '../../../utils/input-utils';
import {IOneContractParams} from '../one-contract-object';
import {JsUtils} from '../../../utils/jsUtils';

@Component({
  selector: 'app-contract-overrides',
  templateUrl: './contract-overrides.component.html',
  styleUrls: ['./contract-overrides.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractOverridesComponent implements OnInit, OnDestroy {
  public tableHeader: string[] = ['Scale From', 'Scale To', '% of Total Sales', ''];
  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public displayForm: boolean = false;
  private subscriptionsArray: any[] = [];
  public preventPasteValue: any = InputUtils.preventPasteValue;
  public isRangeValue: any = InputUtils.isRangeValue;

  constructor(public oneContractService: CreateOneContractService, public contractOverridesService: ContractOverridesService,
              private oneContractStoreService: CreateOneContractStoreService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscriptionsArray.push(
      this.oneContractStoreService.oneContract$
        .pipe(filter(contract => !contract || !contract.dontUpdateView))
        .subscribe(oneContract => {
          setTimeout(() => this.resetParams(oneContract));
        }));
  }

  resetParams(oneContract: IOneContractParams): void {
    this.contractOverridesService.resetParams();
    this.displayForm = false;
    
    if (oneContract) {
      this.contractOverridesService.contractOverridesParams = JsUtils.deepCopy(oneContract.contractData.overrides);
      const {contractOverridesParams} = this.contractOverridesService;
      if (contractOverridesParams.length > 0) {
        this.displayForm = true;
      }
    }
    setTimeout(() => this.changeDetector.detectChanges());
  }

  addRow(): void {
    this.contractOverridesService.contractOverridesParams.push({
      scale: {from: null, to: null},
      totalSalesPercentage: null
    });
  }

  deleteRow(rowNumber: number): void {
    this.contractOverridesService.contractOverridesParams.splice(rowNumber, 1);
  }

  isInputInvalid(scale: number, rowIndex: number, isFromScale: boolean = true): boolean {
    let isInvalid: boolean = false;
    if (JsUtils.isDefineAndNotNull(scale)) {
      const scaleNun: number = parseFloat(scale.toString());
      if (isNaN(scaleNun)) {
        isInvalid = true;
      }
      for (let ind = 0; ind < this.contractOverridesService.contractOverridesParams.length && !isInvalid; ind++) {
        const from: number = JsUtils.isDefineAndNotNull(this.contractOverridesService.contractOverridesParams[ind].scale.from) ? parseFloat(this.contractOverridesService.contractOverridesParams[ind].scale.from.toString()) : null;
        const to: number = JsUtils.isDefineAndNotNull(this.contractOverridesService.contractOverridesParams[ind].scale.to) ? parseFloat(this.contractOverridesService.contractOverridesParams[ind].scale.to.toString()) : null;
        if (rowIndex !== ind) {
          if (JsUtils.isDefineAndNotNull(from) && !isNaN(from) && scaleNun >= from && JsUtils.isDefineAndNotNull(to) && !isNaN(to) && scaleNun <= to) {
            isInvalid = true;
          }
        } else {
          if (isFromScale) {
            if (scale > to) {
              isInvalid = true;
            }
          } else {
            if (scale < from) {
              isInvalid = true;
            }
          }
        }
      }
    }
    return isInvalid;
  }

  ngOnDestroy(): void {
    this.subscriptionsArray.forEach(subscription => subscription.unsubscribe());
    this.contractOverridesService.resetParams();
  }
}
