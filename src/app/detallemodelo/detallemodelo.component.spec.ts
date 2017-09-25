import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallemodeloComponent } from './detallemodelo.component';

describe('DetallemodeloComponent', () => {
  let component: DetallemodeloComponent;
  let fixture: ComponentFixture<DetallemodeloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallemodeloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallemodeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
