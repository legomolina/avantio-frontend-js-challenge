import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import {FormsModule} from "@angular/forms";
import { SwitchComponent } from './components/switch/switch.component';
import { TextareaComponent } from './components/textarea/textarea.component';



@NgModule({
  declarations: [
    InputComponent,
    SwitchComponent,
    TextareaComponent
  ],
  exports: [
    InputComponent,
    SwitchComponent,
    TextareaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
