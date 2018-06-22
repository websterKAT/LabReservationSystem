import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetuserComponent } from './resetuser.component';

describe('ResetuserComponent', () => {
  let component: ResetuserComponent;
  let fixture: ComponentFixture<ResetuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
