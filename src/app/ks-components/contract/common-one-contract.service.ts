import {Injectable} from '@angular/core';
import {JsUtils, DATE_FORMAT} from 'shared-ui-components-lib';
import {IDateFromTo, IOneContractParams} from '../../types/one-contract-object';
import {IAllotmentSeasonParams} from '../../types/one-contract';
import {IRadioButton} from 'shared-ui-components-lib/types/buttons';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class CommonOneContractService {
	private sharedAllotmentOptions: IRadioButton[] = [{text: 'Yes', isSelected: true, id: true}, {text: 'No', id: false}];

	constructor() {
	}

	public getSharedAllotmentOptions(): IRadioButton[] {
		return JsUtils.deepCopy(this.sharedAllotmentOptions);
	}

	implementSeasonallyValue(seasonIndex: number, sectionParams: any, oneContract: IOneContractParams, obj: any): void {
		const season = JsUtils.numberToLatter(seasonIndex, true);
		if (sectionParams.wkdy > -1) {
			obj.push({seasonCode: season + ' WKDY', value: +sectionParams.wkdy});
		}
		if (sectionParams.wknd > -1) {
			obj.push({seasonCode: season + ' WKND', value: +sectionParams.wknd});
		}
		if (sectionParams.value > -1) {
			obj.push({seasonCode: season, value: +sectionParams.value});
		}
	}

	implementAllotmentSeasonallyValues(seasonIndex: number, sectionParams: IAllotmentSeasonParams, oneContract: IOneContractParams, obj: any): void {
		const season = JsUtils.numberToLatter(seasonIndex, true);
		if (sectionParams.unitsWkdy > -1 || sectionParams.releaseWkdy || sectionParams.ceilingWkdy) {
			obj.push({
				seasonCode: season + ' WKDY',
				units: sectionParams.unitsWkdy ? +sectionParams.unitsWkdy : null,
				nights: sectionParams.releaseWkdy ? +sectionParams.releaseWkdy : null,
				price: sectionParams.ceilingWkdy ? +sectionParams.ceilingWkdy : null
			});
		}
		if (sectionParams.unitsWknd > -1 || sectionParams.releaseWknd || sectionParams.ceilingWknd) {
			obj.push({
				seasonCode: season + ' WKND',
				units: sectionParams.unitsWknd ? +sectionParams.unitsWknd : null,
				nights: sectionParams.releaseWknd ? +sectionParams.releaseWknd : null,
				price: sectionParams.ceilingWknd ? +sectionParams.ceilingWknd : null
			});
		}
		if (sectionParams.unitsValue > -1 || sectionParams.releaseValue || sectionParams.ceilingValue) {
			obj.push({
				seasonCode: season,
				units: sectionParams.unitsValue ? +sectionParams.unitsValue : null,
				nights: sectionParams.releaseValue ? +sectionParams.releaseValue : null,
				price: sectionParams.ceilingValue ? +sectionParams.ceilingValue : null
			});
		}
	}

	onSelectBookingOrTravelDate(selectedRange: IDateFromTo, rowNumber: number, params: any, propName: string): void {
		if (selectedRange.dateFrom && selectedRange.dateTo) {
			const dateFrom = moment(selectedRange.dateFrom, DATE_FORMAT).format(DATE_FORMAT);
			const dateTo = moment(selectedRange.dateTo, DATE_FORMAT).format(DATE_FORMAT);
			params[rowNumber][propName] = {dateFrom, dateTo};
		} else {
			params[rowNumber][propName] = {dateFrom: null, dateTo: null};
		}
	}
}

