import { Injectable } from '@angular/core';

import { Status, TicketType } from '../enums';
import { Ticket } from '../models';

const TICKETS: Ticket[] = [
  {
    id: 'Ticket-1',
    title: '[GamePlay] Game crashes when only one enemy remains',
    description:
      'As a game player, I want to be able to play against the last enemy and once I defeat the enemy I can continue to the next step/level.',
    status: Status.InProgress,
    type: TicketType.Bug,
    isFlagged: false,
    createdOn: new Date(),
    updatedOn: new Date(),
  },
  {
    id: 'Ticket-2',
    title: '[HUD] Add score points',
    description:
      'As a game player, I want to see my score points visible on the screen.',
    status: Status.Ready,
    type: TicketType.Story,
    isFlagged: true,
    createdOn: new Date(),
    updatedOn: new Date(),
  },
];

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private tickets = TICKETS;

  constructor() {}

  public getTickets(): Ticket[] {
    return this.tickets;
  }

  public getTicket(id: string): Ticket | undefined {
    const results = this.tickets.filter((ticket) => ticket.id === id);

    if (results.length === 1) {
      return results[0];
    }

    return undefined;
  }

  public addTicket(ticket: Ticket): void {
    // TODO
  }

  public updateTicket(ticket: Ticket): void {
    let ticketToUpdate = this.tickets.find((t) => t.id === ticket.id);

    if (!ticketToUpdate) {
      return;
    }
    const index = this.tickets.indexOf(ticketToUpdate);
    this.tickets[index] = { ...ticketToUpdate, ...ticket };
  }
}
