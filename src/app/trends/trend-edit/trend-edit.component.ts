import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {urlValidator} from "../../_core/validators/url-validator";
import {providerValidator} from "../../_core/validators/provider-validator";
import {trendProviders} from "../models/trend-provider.model";
import {Trend} from "../models/trend.model";

@Component({
  selector: 'app-trend-edit',
  templateUrl: './trend-edit.component.html',
  styleUrls: ['./trend-edit.component.scss']
})
export class TrendEditComponent {
  private trend: Trend | null = null;

  @ViewChild('dialog', { static: true }) dialogEl!: ElementRef<HTMLDialogElement>;

  @Input('trend') set trendInput(value: Trend | null) {
    console.log(value?.provider);
    this.trend = value;

    if (value) {
      this.formGroup.setValue({
        provider: value.provider,
        content: value.body.join('\n'),
        image: value.image,
        title: value.title,
        url: value.url,
      });
    }
  }

  formGroup = new FormGroup({
    url: new FormControl('', [Validators.required, urlValidator()]),
    image: new FormControl('', [Validators.required, urlValidator()]),
    title: new FormControl('', [Validators.required]),
    provider: new FormControl('elmundo', [Validators.required, providerValidator(trendProviders)]),
    content: new FormControl('', [Validators.required]),
  });

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
    console.log(this.formGroup.value);
  }
}
