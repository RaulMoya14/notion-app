import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserCollectionComponent } from './view-user-collection.component';

describe('ViewUserCollectionComponent', () => {
  let component: ViewUserCollectionComponent;
  let fixture: ComponentFixture<ViewUserCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUserCollectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewUserCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
