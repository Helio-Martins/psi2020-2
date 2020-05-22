import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessReservaComponent } from './process-reserva.component';

describe('ProcessReservaComponent', () => {
  let component: ProcessReservaComponent;
  let fixture: ComponentFixture<ProcessReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
