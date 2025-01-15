import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemtemDetailComponent } from './temtem-detail.component';

describe('TemtemDetailComponent', () => {
  let component: TemtemDetailComponent;
  let fixture: ComponentFixture<TemtemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemtemDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemtemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
