import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import {FormsModule} from "@angular/forms";
import { SwitchComponent } from './components/switch/switch.component';



@NgModule({
  declarations: [
    InputComponent,
    SwitchComponent
  ],
  exports: [
    InputComponent,
    SwitchComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
