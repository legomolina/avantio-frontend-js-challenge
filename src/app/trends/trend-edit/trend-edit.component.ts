import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {urlValidator} from "../../_core/validators/url-validator";
import {providerValidator} from "../../_core/validators/provider-validator";
import {trendProviders} from "../models/trend-provider.model";

@Component({
  selector: 'app-trend-edit',
  templateUrl: './trend-edit.component.html',
  styleUrls: ['./trend-edit.component.scss']
})
export class TrendEditComponent implements OnInit {
  @ViewChild('dialog', { static: true }) dialogEl!: ElementRef<HTMLDialogElement>;

  formGroup = new FormGroup({
    url: new FormControl('', [Validators.required, urlValidator()]),
    image: new FormControl('', [Validators.required, urlValidator()]),
    title: new FormControl('', [Validators.required]),
    provider: new FormControl('elmundo', [Validators.required, providerValidator(trendProviders)]),
    content: new FormControl('', [Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {
    this.dialogEl.nativeElement.showModal();
  }

  onProviderChange(checked: boolean) {
    console.log(checked);
    this.formGroup.controls.provider.setValue(checked ? 'elpais' : 'elmundo');
  }

  submitForm() {
    console.log(this.formGroup.value);
  }

}
