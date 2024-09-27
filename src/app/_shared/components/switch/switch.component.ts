import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {noop} from "rxjs";

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    }
  ]
})
export class SwitchComponent implements ControlValueAccessor {
  /**
   * Determines checked state of switch
   */
  @Input('checked') set isChecked(value: boolean) {
    this.writeValue(value);
  }
  /**
   * Determines if input must be disabled or not
   */
  @Input() set disabled(value: boolean) {
    this.setDisabledState(value);
  }
  /**
   * Input name to work with html forms
   */
  @Input() name: string | undefined;

  /**
   * Emits when checked value changes
   */
  @Output() change = new EventEmitter<boolean>();

  onChange: (value: boolean) => void = noop;
  onTouch: () => void = noop;

  checked = false;
  isDisabled = false;

  toggleSwitch() {
    if (this.isDisabled) {
      return;
    }

    this.checked = !this.checked;
    this.onChange(this.checked);
    this.change.emit(this.checked);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(obj: boolean): void {
    this.checked = obj;
  }
}
