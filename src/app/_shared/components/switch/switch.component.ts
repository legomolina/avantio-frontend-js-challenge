import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {generateId} from "../../../_core/utils/generate-id";
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
export class SwitchComponent implements OnInit, ControlValueAccessor {
  @Input('checked') set isChecked(value: boolean) {
    this.writeValue(value);
  }

  @Input() set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  @Input() name: string | undefined;

  @Output() change = new EventEmitter<boolean>();

  onChange: (value: boolean) => void = noop;
  onTouch: () => void = noop;

  checked = false;
  isDisabled = false;

  constructor() { }

  ngOnInit(): void {
  }

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
