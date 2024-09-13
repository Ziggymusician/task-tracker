import { Component, input, InputSignal, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { TicketService } from '../../services/ticket.service';
import { LabelValue, Ticket } from '../../models';
import { Status, TicketType } from '../../enums';
import { getEnumValueName, getStatusStringValue } from '../../utils';

@Component({
  selector: 'ticket',
  standalone: true,
  imports: [ReactiveFormsModule, CheckboxComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent implements OnInit {
  public id: InputSignal<string> = input.required<string>();
  public types = signal<LabelValue<number>[]>([]);
  public statuses = signal<LabelValue<number>[]>([]);
  public form!: FormGroup;

  private ticket = signal<Ticket | undefined>(undefined);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ticketService: TicketService
  ) {}

  public ngOnInit(): void {
    this.ticket.set(this.ticketService.getTicket(this.id()));

    this.init();
  }

  public onBack(): void {
    this.router.navigate(['/']);
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
      const item = {
        label: getStatusStringValue(status),
        value: status,
      };
      this.statuses.set([...this.statuses(), item]);
    });
  }

  private initForm(): void {
    this.form = this.fb.group({
      title: this.fb.control(''),
      description: this.fb.control(''),
      type: this.fb.control(null),
      status: this.fb.control(null),
      isFlagged: this.fb.control(false),
    });

    if (this.ticket && this.ticket()) {
      this.form.patchValue({ ...this.ticket() });
    }
  }
}
