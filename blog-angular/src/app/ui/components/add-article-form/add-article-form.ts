import { Component, input } from '@angular/core';

@Component({
  selector: 'app-add-article-form',
  imports: [],
  templateUrl: './add-article-form.html',
  styleUrl: './add-article-form.scss',
})
export class AddArticleForm {
  public toggleForm = input<boolean>();
  protected isSelectOpen: boolean;
  private transform: number = 42;
  protected spanSelectValue: string = 'Tennis';
  constructor() {
    this.isSelectOpen = false;
  }

  protected onSubmit(e: Event) {
    e.preventDefault();
    console.log(e);
  }

  protected openCustomeSelect(event: Event) {
    const target = event.target;
    this.isSelectOpen = !this.isSelectOpen;
  }

  protected tennisChoice(event: Event) {
    event.stopPropagation();
    this.isSelectOpen = !this.isSelectOpen;
    this.spanSelectValue = 'Tennis';
  }

  protected frontendChoice(event: Event) {
    event.stopPropagation();
    this.isSelectOpen = !this.isSelectOpen;
    this.spanSelectValue = 'Frontend';
  }

  protected transformString(value: number) {
    if (this.isSelectOpen) {
      return `translateY(${value * 100 + this.transform}%)`;
    } else {
      return `translateY(-75%)`;
    }
  }

  protected checkDefault(value: string) {
    return value === this.spanSelectValue;
  }
}
