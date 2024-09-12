import { Status } from '../enums';
import { getEnumValueName } from './get-enum-value-name.util';

export function getStatusStringValue(status: Status): string {
  switch (status) {
    case Status.InProgress:
      return 'In Progress';

    case Status.PendingReview:
      return 'Pending Review';

    default:
      return getEnumValueName(Status, status) as string;
  }
}
