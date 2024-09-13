import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMiniCardComponent } from './ticket-mini-card.component';

describe('TicketMiniCardComponent', () => {
  let component: TicketMiniCardComponent;
  let fixture: ComponentFixture<TicketMiniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketMiniCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketMiniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
