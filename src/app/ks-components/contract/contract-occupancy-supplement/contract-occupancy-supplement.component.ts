import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {CreateOneContractService} from '../create-one-contract.service';
import {ContractOccupancySupplementService} from './contract-occupancy-supplement.service';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {filter} from 'rxjs/operators';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {JsUtils} from '../../../utils/jsUtils';
import {IOneContractParams} from '../one-contract-object';

@Component({
  selector: 'app-contract-occupancy-supplement',
  templateUrl: './contract-occupancy-supplement.component.html',
  styleUrls: ['./contract-occupancy-supplement.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractOccupancySupplementComponent implements OnInit, OnDestroy {
  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public displayForm: boolean = false;
  private subscriptionsArray: any[] = [];

  constructor(public oneContractService: CreateOneContractService,
              public contractOccupancySupplementService: ContractOccupancySupplementService,
              private oneContractStoreService: CreateOneContractStoreService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscriptionsArray.push(
      this.oneContractStoreService.oneContract$
        .pipe(filter(contract => !contract || !contract.dontUpdateView))
        .subscribe((oneContract: IOneContractParams) => {
          if (oneContract && oneContract.contractData && oneContract.contractData.generalSupplements.occupancySupplements) {
            const occupancySupplement = oneContract.contractData.generalSupplements.occupancySupplements;
            this.displayForm = occupancySupplement.length > 0;
            setTimeout(() => this.changeDetector.detectChanges());
          }
        }));
  }

  getRowsFromContract(oneContract: IOneContractParams): any[] {
    if (oneContract.contractData && oneContract.contractData.generalSupplements.occupancySupplements) {
      return JsUtils.deepCopy(oneContract.contractData.generalSupplements.occupancySupplements);
    } else {
      return [];
    }
  }

  ngOnDestroy(): void {
    this.subscriptionsArray.forEach(subscription => subscription.unsubscribe());
  }
}
