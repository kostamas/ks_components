import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractMinStayComponent } from './contract-min-stay.component';

describe('ContractMinStayComponent', () => {
  let component: ContractMinStayComponent;
  let fixture: ComponentFixture<ContractMinStayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractMinStayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractMinStayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
