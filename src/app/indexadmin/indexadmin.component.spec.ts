import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexadminComponent } from './indexadmin.component';

describe('IndexadminComponent', () => {
  let component: IndexadminComponent;
  let fixture: ComponentFixture<IndexadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
