import {SelectRegularOptionsComponent} from '../modules/inputs/select-module/options/select-regular-options/select-regular-options.component';
import {MultiSelectColorfulOptionsComponent} from '../modules/inputs/select-module/options/multi-select-colorful-options/multi-select-colorful-options.component';
import {ISelectOptionsComponentsTypes} from '../types/ISelect';

export const OPTIONS_TYPES: ISelectOptionsComponentsTypes = {
	regular: 'regular',
	multiSelection: 'multiSelection'
}

export const OPTIONS_TYPES_COMPONENTS = {
	[OPTIONS_TYPES.regular]: SelectRegularOptionsComponent,
	[OPTIONS_TYPES.multiSelection]: MultiSelectColorfulOptionsComponent
}

export const ALL_OPTION = {name: 'All', id: 'All'};
