import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFeedComponent } from './date-feed.component';

describe('DateFeedComponent', () => {
  let component: DateFeedComponent;
  let fixture: ComponentFixture<DateFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
