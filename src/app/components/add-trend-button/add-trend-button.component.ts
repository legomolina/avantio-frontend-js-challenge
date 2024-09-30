import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {openEditTrend} from "../../store/actions/edit-trend.actions";

@Component({
  selector: 'app-add-trend-button',
  templateUrl: './add-trend-button.component.html',
  styleUrls: ['./add-trend-button.component.scss']
})
export class AddTrendButtonComponent {
  constructor(private readonly store: Store) {}

  createTrend() {
    this.store.dispatch(openEditTrend({ trend: null }));
  }
}
