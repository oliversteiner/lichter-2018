import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LichtComponent } from './licht.component';

describe('LichtComponent', () => {
  let component: LichtComponent;
  let fixture: ComponentFixture<LichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
