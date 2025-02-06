import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotlaneComponent } from './botlane.component';

describe('BotlaneComponent', () => {
  let component: BotlaneComponent;
  let fixture: ComponentFixture<BotlaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotlaneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotlaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
