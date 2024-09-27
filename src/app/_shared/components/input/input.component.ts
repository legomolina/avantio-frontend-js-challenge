import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {noop} from "rxjs";
import {generateId} from "../../../_core/utils/generate-id";
import {InputType} from "./input.interface";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  /**
   * Determines if input must be disabled or not
   */
  @Input() set disabled(value: boolean) {
    this.setDisabledState(value);
  }
  /**
   * Input id for label match.
   * Defaults to random string.
   */
  @Input() id = generateId();
  /**
   * Determines if input is invalid
   */
  @Input() invalid: boolean = false;
  /**
   * Input name to work with html forms
   */
  @Input() name: string | undefined;
  /**
   * Input kind, defaults to text.
   */
  @Input() type: InputType = 'text';

  onChange: (value: string) => void = noop;
  onTouch: () => void = noop;

  isDisabled = false;
  value = '';

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(obj: string): void {
    this.value = obj;
  }
}
