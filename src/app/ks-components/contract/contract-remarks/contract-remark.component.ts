import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {filter} from 'rxjs/operators';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {ContractRemarkService} from './contract-remark.service';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {IOneContractParams} from '../one-contract-object';
import {JsUtils} from '../../../utils/jsUtils';

@Component({
  selector: 'app-contract-remark',
  templateUrl: './contract-remark.component.html',
  styleUrls: ['./contract-remark.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractRemarkComponent implements OnInit, OnDestroy {
  public subscriptionsArray: any[] = [];
  public displayForm: boolean = false;
  public SVG_ICONS: ISvgIcons = SVG_ICONS;

  constructor(public contractRemarkService: ContractRemarkService, private changeDetector: ChangeDetectorRef,
              private oneContractStoreService: CreateOneContractStoreService) {
  }

  ngOnInit(): void {
    this.subscriptionsArray.push(
      this.oneContractStoreService.oneContract$
        .pipe(filter(contract => !contract || !contract.dontUpdateView))
        .subscribe((oneContract: IOneContractParams) => setTimeout(() => this.resetParameters(oneContract))));
  }

  resetParameters = (oneContract: IOneContractParams) => {
    this.contractRemarkService.resetParams();

    if (oneContract) {
      this.contractRemarkService.remarksParams = JsUtils.deepCopy(oneContract.remarks);
      this.displayForm = !!oneContract.remarks;
    }
    setTimeout(() => this.changeDetector.detectChanges());
  };

  hideOrDisplayForm(): void {
    this.displayForm = !this.displayForm;
  }

  ngOnDestroy(): void {
    this.subscriptionsArray.forEach((subscription: any) => subscription.unsubscribe());
    this.contractRemarkService.resetParams();
  }
}
