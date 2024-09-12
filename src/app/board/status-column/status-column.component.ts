import {
  Component,
  computed,
  EventEmitter,
  input,
  Output,
} from '@angular/core';

import { TicketMiniCardComponent } from '../ticket-mini-card/ticket-mini-card.component';
import { FilterTicketsPipe } from '../../pipes';
import { getStatusStringValue } from '../../utils';
import { Status } from '../../enums';
import { Ticket } from '../../models';

@Component({
  selector: 'status-column',
  standalone: true,
  imports: [TicketMiniCardComponent, FilterTicketsPipe],
  templateUrl: './status-column.component.html',
  styleUrl: './status-column.component.css',
})
export class StatusColumnComponent {
  @Output()
  public updateTicket: EventEmitter<Ticket> = new EventEmitter<Ticket>();

  public tickets = input<Ticket[]>([]);
  public status = input.required<Status>();
  public heading = computed(() => {
    return getStatusStringValue(this.status());
  });

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    const ticketId = event.dataTransfer?.getData('text');
    const ticket = this.tickets().find((ticket) => ticket.id === ticketId);

    if (!ticket || ticket.isFlagged) return;

    // const nextStatus = (event.target as HTMLDivElement).dataset['status'];
    const nextStatus = (event.target as HTMLDivElement).getAttribute(
      'data-status'
    );

    if (!nextStatus) return;

    if (
      (ticket.status === Status.Testing && +nextStatus < Status.Testing) ||
      ticket.status === Status.Completed
    ) {
      return;
    }

    // ticket.status = +nextStatus;
    this.updateTicket.emit({ ...ticket, status: +nextStatus });
  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  public onDragStart(ticket: Ticket, event: DragEvent): void {
    event.dataTransfer?.setData('text', ticket.id || '');
  }
}
