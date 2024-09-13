import { Status, TicketType } from '../enums';

export interface Ticket {
  id?: string;
  title: string;
  description: string;
  status: Status;
  type: TicketType;
  isFlagged: boolean;
  createdOn?: Date;
  updatedOn?: Date;
}
