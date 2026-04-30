import { Component, inject, input } from '@angular/core';
import { ArticlesStorage } from '../../../services/articles-storage';
import { computeMsgId } from '@angular/compiler';

@Component({
  selector: 'app-paggination-button',
  imports: [],
  templateUrl: './paggination-button.html',
  styleUrl: './paggination-button.scss',
})
export class PagginationButton {
  private storage = inject(ArticlesStorage);
  public direction = input.required<boolean>();

  protected changePage() {
    const articleCount = this.storage.articleStorage().length;
    const currnetPage = this.storage.mainPage();
    if (this.direction()) {
      if (currnetPage < articleCount / 3) {
        this.storage.incrementMainPage();
      }
    } else {
      if (currnetPage > 0) {
        this.storage.decrementMainPage();
      }
    }
    console.log(this.storage.mainPage());
  }
}
