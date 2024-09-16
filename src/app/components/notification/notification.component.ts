import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { NgClass } from '@angular/common';

import { NotificationType } from '../../models';

@Component({
  selector: 'notification',
  standalone: true,
  imports: [NgClass],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  @Input({ required: true })
  public message!: string;

  @Input()
  public type!: NotificationType;

  @Output()
  public close: EventEmitter<void> = new EventEmitter<void>();

  public get notificationClasses(): Record<string, boolean> {
    return {
      [this.type]: !!this.type,
    };
  }

  public onClose(): void {
    this.close.emit();
  }
}
