import {Component, Input} from '@angular/core';
import {ButtonKind} from "./button.interface";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() kind: ButtonKind = 'primary';
}
