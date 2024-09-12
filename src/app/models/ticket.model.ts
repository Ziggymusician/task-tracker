import { Status, TicketType } from '../enums';

export interface Ticket {
  id?: string;
  title: string;
  description: string;
  status: Status;
  type: TicketType;
  createdOn: Date;
  isFlagged: boolean;
}
