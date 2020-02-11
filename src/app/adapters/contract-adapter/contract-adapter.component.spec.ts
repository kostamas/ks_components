import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAdapterComponent } from './contract-adapter.component';

describe('ContractAdapterComponent', () => {
  let component: ContractAdapterComponent;
  let fixture: ComponentFixture<ContractAdapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractAdapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
