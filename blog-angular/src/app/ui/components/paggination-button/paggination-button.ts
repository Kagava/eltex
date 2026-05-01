import { Component, computed, inject, input, output } from '@angular/core';
import { ArticlesStorage } from '../../../services/articles-storage';

@Component({
  selector: 'app-paggination-button',
  imports: [],
  templateUrl: './paggination-button.html',
  styleUrl: './paggination-button.scss',
})
export class PagginationButton {
  private storage = inject(ArticlesStorage);

  protected pageChange = output<boolean>();

  public disabledButtonLeft = input<boolean>(false);
  public disabledButtonRight = input<boolean>(false);
  public direction = input.required<boolean>();

  protected changePage() {
    this.pageChange.emit(this.direction());
  }
}
