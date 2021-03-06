import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {CreateOneContractService} from '../create-one-contract.service';
import {ContractDiscountPolicyService} from './contract-discount-policy.service';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {filter} from 'rxjs/operators';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {IOneContractParams} from '../one-contract-object';
import {DISCOUNTS_TYPES} from '../one-contract.const';
import {JsUtils} from '../../../utils/jsUtils';

@Component({
  selector: 'app-contract-discount-policy',
  templateUrl: './contract-discount-policy.component.html',
  styleUrls: ['./contract-discount-policy.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractDiscountPolicyComponent implements OnInit, OnDestroy {
  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public displayForm: boolean = false;
  private subscriptionsArray: any[] = [];

  constructor(public oneContractService: CreateOneContractService, private changeDetector: ChangeDetectorRef,
              public contractDiscountPolicyService: ContractDiscountPolicyService,
              private oneContractStoreService: CreateOneContractStoreService) {
  }

  ngOnInit(): void {
    this.subscriptionsArray.push(
      this.oneContractStoreService.oneContract$
        .pipe(filter(contract => !contract || !contract.dontUpdateView))
        .subscribe((oneContract: IOneContractParams) => {
          if (oneContract && oneContract.contractData && oneContract.contractData.generalSupplements) {
            const discountPolicies = oneContract.contractData.generalSupplements[DISCOUNTS_TYPES.discount];
            this.displayForm = discountPolicies.length > 0;
          } else {
            this.displayForm = false;
          }
          setTimeout(() => this.changeDetector.detectChanges());
        }));
  }

  getRowsFromContract = (oneContract: IOneContractParams): any[] => {
    if (oneContract && oneContract.contractData && oneContract.contractData.generalSupplements) {
      return JsUtils.deepCopy(oneContract.contractData.generalSupplements[DISCOUNTS_TYPES.discount]) || [];
    } else {
      return [];
    }
  };

  ngOnDestroy(): void {
    this.subscriptionsArray.forEach(subscription => subscription.unsubscribe());
  }
}
