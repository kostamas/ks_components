import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContractCancellationPolicyComponent} from './contract-cancellation-policy.component';

describe('ContractCancellationPolicyComponent', () => {
	let component: ContractCancellationPolicyComponent;
	let fixture: ComponentFixture<ContractCancellationPolicyComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ContractCancellationPolicyComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ContractCancellationPolicyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
