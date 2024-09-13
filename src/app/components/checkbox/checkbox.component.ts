import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'checkbox',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent implements AfterViewInit {
  @Input({ required: true })
  public form!: FormGroup;

  @Input({ required: true })
  public name!: string;

  @Input({ required: true })
  public id!: string;

  @Input()
  public checkedCSSColor: string = '#68d391';

  @ViewChild('checkbox')
  private inputRef!: ElementRef;

  @ViewChild('checkboxLabel')
  private labelRef!: ElementRef;

  public ngAfterViewInit(): void {
    this.onToggleCheck();
  }

  public onToggleCheck(): void {
    if (!this.inputRef || !this.labelRef) return;

    const input = <HTMLInputElement>this.inputRef.nativeElement;
    const label = <HTMLLabelElement>this.labelRef.nativeElement;

    if (input.checked) {
      label.style.backgroundColor = this.checkedCSSColor;
      input.style.borderColor = this.checkedCSSColor;
    } else {
      label.style.removeProperty('background-color');
      input.style.removeProperty('border-color');
    }
  }
}
