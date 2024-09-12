import { Pipe, PipeTransform } from '@angular/core';

import { Ticket } from '../models';
import { Status } from '../enums';

@Pipe({
  name: 'filterByStatus',
  standalone: true,
  pure: false,
})
export class FilterTicketsPipe implements PipeTransform {
  constructor() {}

  public transform(tickets: Ticket[], status: Status): Ticket[] {
    return tickets.filter((ticket) => ticket.status === status);
  }
}
