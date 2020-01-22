import {Routes} from '@angular/router';
import {ROUTES_NAMES} from '../../core/routes-names';
import {OneContractComponent} from './one-contract.component';
import {AuthGuardService} from '../../services/auth-guard.service';
import {CreateOneContractComponent} from './create/create-one-contract.component';
import {SearchOneContractComponent} from './search/search-one-contract.component';
import {OneContractService} from './one-contract-service';

export const oneContractRoutes: Routes = [
	{
		path: ROUTES_NAMES.oneContract,
		component: OneContractComponent,
		canActivate: [AuthGuardService],
		children: [
			{
				path: '',
				redirectTo: ROUTES_NAMES.searchOneContract,
				pathMatch: 'full'
			},
			{
				path: ROUTES_NAMES.searchOneContract,
				component: SearchOneContractComponent,
			},
			{
				path: ROUTES_NAMES.createOneContract,
				component: CreateOneContractComponent,
				canDeactivate: [OneContractService],
			},
			{
				path: ROUTES_NAMES.createOneContract + '/:oneContractId',
				component: CreateOneContractComponent,
				canDeactivate: [OneContractService],
				children: [
					{
						path: 'duplicate',
						component: CreateOneContractComponent
					}
				]
			},
		]
	},
];
