import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsIslandsComponent } from './locations-islands.component';

describe('LocationsIslandsComponent', () => {
  let component: LocationsIslandsComponent;
  let fixture: ComponentFixture<LocationsIslandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationsIslandsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationsIslandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
