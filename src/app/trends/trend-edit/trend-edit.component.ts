import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {urlValidator} from "../../_core/validators/url-validator";
import {providerValidator} from "../../_core/validators/provider-validator";
import {TrendProvider, trendProviders} from "../models/trend-provider.model";
import {Store} from "@ngrx/store";
import {updateTrend} from "../store/actions/trends-details-page.actions";
import {Trend} from "../models/trend.model";
import {TrendRequest} from "../models/trend-request.model";

@Component({
  selector: 'app-trend-edit',
  templateUrl: './trend-edit.component.html',
  styleUrls: ['./trend-edit.component.scss']
})
export class TrendEditComponent {
  private trend: Trend | null = null;

  @Input('trend') set trendEdit(value: Trend | null) {
    this.trend = value;

    if (value !== null) {
      this.formGroup.setValue({
        provider: value.provider,
        content: value.body.join('\n'),
        image: value.image,
        title: value.title,
        url: value.url,
      });
    }
  }
  @ViewChild('dialog', { static: true }) dialogEl!: ElementRef<HTMLDialogElement>;

  formGroup = new FormGroup({
    url: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, urlValidator()] }),
    image: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, urlValidator()] }),
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    provider: new FormControl<TrendProvider>('elmundo', { nonNullable: true, validators: [Validators.required, providerValidator(trendProviders)] }),
    content: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(private readonly store: Store) {
  }

  closeModal() {
    this.dialogEl.nativeElement.close();
  }

  openModal() {
    this.dialogEl.nativeElement.showModal();
  }

  onProviderChange(checked: boolean) {
    this.formGroup.controls.provider.setValue(checked ? 'elpais' : 'elmundo');
  }

  submitForm() {
    if (!this.formGroup.invalid) {
      // In this case, all formGroup.value.[controlname] has value because all fields are required
      // so we can safely use ! to use its value. If this wasn't true we could use ?? to assign a default value
      const trend: TrendRequest = {
        url: this.formGroup.value.url!,
        image: this.formGroup.value.image!,
        provider: this.formGroup.value.provider!,
        title: this.formGroup.value.title!,
        body: this.formGroup.value.content!,
      }
      // TODO check for this.trend === null to create or update.
      this.store.dispatch(updateTrend({ id: this.trend!.id, trend }));
    }
  }
}
