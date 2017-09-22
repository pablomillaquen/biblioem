import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmanualComponent } from './listmanual.component';

describe('ListmanualComponent', () => {
  let component: ListmanualComponent;
  let fixture: ComponentFixture<ListmanualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListmanualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmanualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
