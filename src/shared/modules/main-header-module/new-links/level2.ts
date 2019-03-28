import {DISTRIBUTION_RULES_ID, SEARCH_SIMULATOR_ID} from '../main-header.const';
import {distributionRulesLink, searchSimulatorLink} from './level3';

export const searchSimulatorLevel2 = {
	name: 'Search Simulator',
	id: SEARCH_SIMULATOR_ID,
	menus: [
		searchSimulatorLink
	]
};

export const distributionRulesLevel2 = {
	name: 'Distribution Business',
	id: DISTRIBUTION_RULES_ID,
	menus: [
		distributionRulesLink
	]
};
