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
  private transform: number = 42;

  protected isSelectOpen: boolean = false;
  protected spanSelectValue: string = 'Tennis';
  protected flagEdit: boolean = false;
  public toggleForm = input<boolean>();
  public editData = input<FormData>();
  public editId = input<string>();
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
    console.log(this.editData(), this.form.getRawValue());
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
    this.spanSelectValue = 'Tennis';
  }

  ngOnChanges() {
    console.log(this.editData());
    const tempData = this.editData();
    if (tempData && tempData.title !== '') {
      this.flagEdit = true;
      this.form.setValue({
        title: tempData.title,
        description: tempData.description,
        category: tempData.category,
      });
      if (tempData.category === 'frontend-article') {
        this.spanSelectValue = 'Fontend';
      } else {
        this.spanSelectValue = 'Tennis';
      }
    } else {
      this.flagEdit = false;
      this.form.setValue({
        title: '',
        description: '',
        category: 'Tennis',
      });
      this.spanSelectValue = 'Tennis';
    }
  }
}
