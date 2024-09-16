import {
  Component,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { CheckboxComponent, NotificationComponent } from '../../components';
import { TicketService } from '../../services/ticket.service';
import { LabelValue, NotificationType, Ticket } from '../../models';
import { Status, TicketType } from '../../enums';
import { getEnumValueName, getStatusStringValue } from '../../utils';

@Component({
  selector: 'ticket',
  standalone: true,
  imports: [ReactiveFormsModule, CheckboxComponent, NotificationComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent implements OnInit, OnDestroy {
  public id: InputSignal<string> = input.required<string>();
  public types = signal<LabelValue<number>[]>([]);
  public statuses = signal<LabelValue<number>[]>([]);
  public message = signal<
    { message: string; type: NotificationType } | undefined
  >(undefined);
  public form!: FormGroup;

  private ticket = signal<Ticket | undefined>(undefined);
  private timer!: NodeJS.Timeout;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ticketService: TicketService
  ) {}

  public get isValid(): boolean {
    return this.form.dirty && this.form.valid;
  }

  public ngOnInit(): void {
    this.ticket.set(this.ticketService.getTicket(this.id()));

    this.init();
  }

  public onBack(): void {
    this.router.navigate(['/']);
  }

  public onNotificationClose(): void {
    this.message.set(undefined);
  }

  public onSave(): void {
    if (!this.isValid) {
      return;
    }

    let saved = false;
    let isUpdating = !!this.ticket();
    const newTicketChanges = { ...this.form.getRawValue() };
    newTicketChanges.type = +newTicketChanges.type;
    newTicketChanges.status = +newTicketChanges.status;

    if (isUpdating) {
      saved = this.ticketService.updateTicket({
        ...(this.ticket() as Ticket),
        ...newTicketChanges,
      });
    } else {
      saved = this.ticketService.addTicket({
        ...newTicketChanges,
        id: this.id(),
      });
    }

    this.form.reset(this.form.getRawValue());

    this.timer = setTimeout(() => {
      let msg = '';

      if (saved) {
        msg = `Successfully ${isUpdating ? 'updated' : 'created'} ticket`;
      } else {
        msg = `Failed ${isUpdating ? `updating` : 'creating'} ticket`;
      }

      this.message.set({ message: msg, type: saved ? 'success' : 'error' });
    }, 500);
  }

  public ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  private init(): void {
    this.initTypes();
    this.initStatuses();
    this.initForm();
  }

  private initTypes(): void {
    const values = Object.values(TicketType);
    const typeValues = values.slice(values.length / 2) as TicketType[];
    typeValues.forEach((val) => {
      const item = {
        label: getEnumValueName(TicketType, val) as string,
        value: val,
      };
      this.types.set([...this.types(), item]);
    });
  }

  private initStatuses(): void {
    const values = Object.values(Status);
    const statusValues = values.slice(values.length / 2) as Status[];

    statusValues.forEach((status) => {
      if (this.ticket()?.status === Status.Testing && status < Status.Testing) {
        return;
      }

      if (
        this.ticket()?.status === Status.Completed &&
        status < Status.Completed
      ) {
        return;
      }

      const item = {
        label: getStatusStringValue(status),
        value: status,
      };
      this.statuses.set([...this.statuses(), item]);
    });
  }

  private initForm(): void {
    const isFlagged = this.ticket() ? !!this.ticket()?.isFlagged : false;

    this.form = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      type: this.fb.control({ value: null, disabled: isFlagged }, [
        Validators.required,
      ]),
      status: this.fb.control(null, [Validators.required]),
      isFlagged: this.fb.control(false),
    });

    if (this.ticket && this.ticket()) {
      this.form.patchValue({ ...this.ticket() });
    }
  }
}
