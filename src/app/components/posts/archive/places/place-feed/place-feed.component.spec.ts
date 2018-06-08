import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceFeedComponent } from './place-feed.component';

describe('PlaceFeedComponent', () => {
  let component: PlaceFeedComponent;
  let fixture: ComponentFixture<PlaceFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
