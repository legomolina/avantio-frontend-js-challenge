import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import {FormsModule} from "@angular/forms";
import { SwitchComponent } from './components/switch/switch.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { ButtonComponent } from './components/button/button.component';



@NgModule({
  declarations: [
    InputComponent,
    SwitchComponent,
    TextareaComponent,
    ButtonComponent
  ],
  exports: [
    InputComponent,
    SwitchComponent,
    TextareaComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
