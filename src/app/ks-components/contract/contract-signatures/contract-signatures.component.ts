import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import {ICheckboxItem} from 'shared-ui-components-lib/types/buttons';
import {IOneContractParams} from '../../../../types/one-contract-object';
import {CreateOneContractService} from '../create-one-contract.service';
import {ContractSignaturesService} from './contract-signatures.service';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {filter} from 'rxjs/operators';
import {JsUtils} from 'shared-ui-components-lib';

@Component({
	selector: 'app-contract-signatures',
	templateUrl: './contract-signatures.component.html',
	styleUrls: ['./contract-signatures.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractSignaturesComponent implements OnInit, OnDestroy {
	public subscriptionArr: any[] = [];
	public signItem: ICheckboxItem = {value: 'sign', isSelected: false};

	constructor(public oneContractService: CreateOneContractService, private changeDetector: ChangeDetectorRef,
							public contractSignaturesService: ContractSignaturesService,
							private oneContractStoreService: CreateOneContractStoreService) {
	}

	ngOnInit(): void {
		this.contractSignaturesService.contractSignatureParams.freeSaleControl = this.signItem.isSelected;
		this.subscriptionArr.push(
			this.oneContractStoreService.oneContract$
				.pipe(filter(contract => !contract || !contract.dontUpdateView))
				.subscribe(this.resetParams));
	}

	resetParams = (oneContract: IOneContractParams): void => {
		this.contractSignaturesService.resetParams();
		if (oneContract) {
			this.contractSignaturesService.contractSignatureParams = JsUtils.deepCopy(oneContract.signatures);
			this.signItem.isSelected = this.contractSignaturesService.contractSignatureParams.freeSaleControl;
		}
		setTimeout(() => this.changeDetector.detectChanges());
	}

	signCheck($event: any): void {
		this.signItem.isSelected = !this.signItem.isSelected;
		this.contractSignaturesService.contractSignatureParams.freeSaleControl = this.signItem.isSelected;
	}

	onSelectDate($event: string, hotelKey: string, dateKey: string): void {
		this.contractSignaturesService.contractSignatureParams[hotelKey][dateKey] = $event;
		setTimeout(() => this.changeDetector.detectChanges());
	}

	ngOnDestroy(): void {
		this.subscriptionArr.forEach((subscription: any) => subscription.unsubscribe());
		this.contractSignaturesService.resetParams();
	}

}
