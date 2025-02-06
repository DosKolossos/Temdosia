import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToplaneComponent } from './toplane.component';

describe('ToplaneComponent', () => {
  let component: ToplaneComponent;
  let fixture: ComponentFixture<ToplaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToplaneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToplaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
