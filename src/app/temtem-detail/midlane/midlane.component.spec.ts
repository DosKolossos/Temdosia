import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidlaneComponent } from './midlane.component';

describe('MidlaneComponent', () => {
  let component: MidlaneComponent;
  let fixture: ComponentFixture<MidlaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MidlaneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MidlaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
