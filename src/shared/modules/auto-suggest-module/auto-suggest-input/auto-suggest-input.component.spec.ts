import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSuggestInputComponent } from './auto-suggest-input.component';

describe('AutoSuggestInputComponent', () => {
  let component: AutoSuggestInputComponent;
  let fixture: ComponentFixture<AutoSuggestInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoSuggestInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoSuggestInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
