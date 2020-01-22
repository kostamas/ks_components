import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractBoardSupplementComponent } from './contract-board-supplement.component';

describe('ContractBoardSupplementComponent', () => {
  let component: ContractBoardSupplementComponent;
  let fixture: ComponentFixture<ContractBoardSupplementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractBoardSupplementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractBoardSupplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
