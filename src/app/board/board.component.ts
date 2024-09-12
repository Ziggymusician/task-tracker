import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  signal,
} from '@angular/core';

import { StatusColumnComponent } from './status-column/status-column.component';
import { TicketService } from '../services/ticket.service';
import { Status } from '../enums';
import { Ticket } from '../models';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [StatusColumnComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  public statuses = signal<Status[]>(
    Object.values(Status).filter((val: any) => !isNaN(val)) as Status[]
  ).asReadonly();
  public tickets = signal<Ticket[]>([]);

  constructor(private ticketService: TicketService) {}

  public ngOnInit(): void {
    this.tickets.set(this.ticketService.getTickets());
  }

  public onUpdateTicket(ticket: Ticket): void {
    this.ticketService.updateTicket(ticket);
  }
}
