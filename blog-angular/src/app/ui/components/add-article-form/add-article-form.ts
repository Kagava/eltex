import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-article-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-article-form.html',
  styleUrl: './add-article-form.scss',
})
export class AddArticleForm {
  public toggleForm = input<boolean>();
  protected isSelectOpen: boolean;
  private transform: number = 42;
  protected spanSelectValue: string = 'Tennis';
  public form = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    articleType: new FormControl('tennis-article'),
  });

  constructor() {
    this.isSelectOpen = false;
  }

  protected onSubmit(e: Event) {
    e.preventDefault();
    console.log(e, this.form.getRawValue(), this.form.value);
  }

  protected openCustomeSelect(event: Event) {
    const target = event.target;
    this.isSelectOpen = !this.isSelectOpen;
  }

  protected tennisChoice(event: Event) {
    event.stopPropagation();
    this.isSelectOpen = !this.isSelectOpen;
    this.spanSelectValue = 'Tennis';
    this.form.patchValue({ articleType: 'tennis-article' });
  }

  protected frontendChoice(event: Event) {
    event.stopPropagation();
    this.isSelectOpen = !this.isSelectOpen;
    this.spanSelectValue = 'Frontend';
    this.form.patchValue({ articleType: 'frontend-article' });
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
