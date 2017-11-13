import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedComponentComponent } from './advanced-component.component';

describe('AdnvancedComponentComponent', () => {
  let component: AdvancedComponentComponent;
  let fixture: ComponentFixture<AdvancedComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
