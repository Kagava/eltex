import { Component, inject, input, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormData } from '../../../models/types/form-data';

@Component({
  selector: 'app-add-article-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-article-form.html',
  styleUrl: './add-article-form.scss',
})
export class AddArticleForm {
  private readonly fb = inject(NonNullableFormBuilder);
  public toggleForm = input<boolean>();
  protected isSelectOpen: boolean = false;
  private transform: number = 42;
  protected spanSelectValue: string = 'Tennis';
  public dataOut = output<FormData>();
  public form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(25)]],
    description: ['', Validators.required],
    category: ['tennis-article', Validators.required],
  });

  protected titleError = this.form.get('title')?.errors;
  constructor() {}

  protected onSubmit(e: Event) {
    e.preventDefault();
    this.dataOut.emit(this.form.getRawValue());

    this.form.reset();
    this.resetForm();
  }

  protected openCustomeSelect(event: Event) {
    const target = event.target;
    this.isSelectOpen = !this.isSelectOpen;
  }

  protected tennisChoice(event: Event) {
    event.stopPropagation();
    this.isSelectOpen = !this.isSelectOpen;
    this.spanSelectValue = 'Tennis';
    this.form.patchValue({ category: 'tennis-article' });
  }

  protected frontendChoice(event: Event) {
    event.stopPropagation();
    this.isSelectOpen = !this.isSelectOpen;
    this.spanSelectValue = 'Frontend';
    this.form.patchValue({ category: 'frontend-article' });
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

  protected resetForm() {
    console.log('eowaijaw');
    this.spanSelectValue = 'Tennis';
  }
}
