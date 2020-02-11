import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractOverridesComponent } from './contract-overrides.component';

describe('ContractOverridesComponent', () => {
  let component: ContractOverridesComponent;
  let fixture: ComponentFixture<ContractOverridesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractOverridesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractOverridesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
