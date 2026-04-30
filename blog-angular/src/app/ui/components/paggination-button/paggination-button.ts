import { Component, input } from '@angular/core';

@Component({
  selector: 'app-paggination-button',
  imports: [],
  templateUrl: './paggination-button.html',
  styleUrl: './paggination-button.scss',
})
export class PagginationButton {
  public direction = input.required<string>();
}
