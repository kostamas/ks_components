import {Injectable} from '@angular/core';
import {IAnalytics} from '../types/analytics';

@Injectable()
export class AnalyticsService implements IAnalytics {
	constructor(public analytics: any, public events: any) {
	}

	report(event: string, data: any): void {
		this.analytics.report(event, data);
	}
}
