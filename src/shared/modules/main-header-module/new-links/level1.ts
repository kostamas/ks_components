import {DISTRIBUTION_RULES_ID, SEARCH_SIMULATOR_ID} from '../main-header.const';
import {distributionRulesLevel2, searchSimulatorLevel2} from './level2';

export const searchSimulatorLevel1 = {
	name: 'Availability',
	id: SEARCH_SIMULATOR_ID,
	menus: [
		searchSimulatorLevel2
	]
};

export const distributionRulesLevel1 = {
	name: 'Distribution',
	id: DISTRIBUTION_RULES_ID,
	menus: [
		distributionRulesLevel2
	]
};