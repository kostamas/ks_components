import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractLoadingInformationComponent } from './contract-loading-information.component';

describe('ContractLoadingInformationComponent', () => {
  let component: ContractLoadingInformationComponent;
  let fixture: ComponentFixture<ContractLoadingInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractLoadingInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractLoadingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
