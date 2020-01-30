import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {ContractOtherSupplementService} from './contract-other-supplement.service';
import {CreateOneContractService} from '../create-one-contract.service';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {filter} from 'rxjs/operators';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {IOneContractParams} from '../one-contract-object';
import {JsUtils} from '../../../utils/jsUtils';

@Component({
  selector: 'app-contract-other-supplement',
  templateUrl: './contract-other-supplement.component.html',
  styleUrls: ['./contract-other-supplement.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractOtherSupplementComponent implements OnInit, OnDestroy {
  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public displayForm: boolean = false;
  private subscriptionsArray: any[] = [];

  constructor(public oneContractService: CreateOneContractService, private changeDetector: ChangeDetectorRef,
              public contractOtherSupplementService: ContractOtherSupplementService,
              private oneContractStoreService: CreateOneContractStoreService) {
  }

  ngOnInit(): void {
    this.subscriptionsArray.push(
      this.oneContractStoreService.oneContract$
        .pipe(filter(contract => !contract || !contract.dontUpdateView))
        .subscribe((oneContract: IOneContractParams) => {
          if (oneContract && oneContract.contractData && oneContract.contractData.generalSupplements.otherSupplements) {
            const occupancySupplement = oneContract.contractData.generalSupplements.otherSupplements;
            this.displayForm = occupancySupplement.length > 0;
            setTimeout(() => this.changeDetector.detectChanges());
          }
        }));
  }

  getRowsFromContract(oneContract: IOneContractParams): any[] {
    if (oneContract.contractData && oneContract.contractData.generalSupplements.otherSupplements) {
      return JsUtils.deepCopy(oneContract.contractData.generalSupplements.otherSupplements);
    } else {
      return [];
    }
  }

  ngOnDestroy(): void {
    this.subscriptionsArray.forEach(subscription => subscription.unsubscribe());
  }
}
