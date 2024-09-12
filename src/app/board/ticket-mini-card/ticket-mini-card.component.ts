import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

import { Ticket } from '../../models';
import { TicketType } from '../../enums';
import { getEnumValueName } from '../../utils';

@Component({
  selector: 'ticket-mini-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ticket-mini-card.component.html',
  styleUrl: './ticket-mini-card.component.css',
})
export class TicketMiniCardComponent {
  @Input()
  public ticket!: Ticket;

  public get type(): string {
    return getEnumValueName(TicketType, this.ticket.type) as string;
  }

  public get mainContainerFlagggedClasses(): Record<string, boolean> {
    return { 'border-red-300 shadow-red-300': this.ticket.isFlagged };
  }

  public get typeClasses(): Record<string, boolean> {
    return {
      'bg-red-500  border-red-600': this.ticket.type === TicketType.Bug,
      'bg-slate-500 border-slate-600':
        this.ticket.type === TicketType.Investigation,
      'bg-green-500 border-green-600': this.ticket.type === TicketType.Story,
      'bg-blue-500 border-blue-600': this.ticket.type === TicketType.Task,
    };
  }
}
