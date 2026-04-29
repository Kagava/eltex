import { Component, computed, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormData } from '../../../models/types/form-data';
import { FormService } from '../../../services/form-service';

@Component({
  selector: 'app-add-article-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-article-form.html',
  styleUrl: './add-article-form.scss',
})
export class AddArticleForm {
  private readonly fb = inject(NonNullableFormBuilder);
  private transform: number = 42;

  protected formService = inject(FormService);
  protected formTitle = computed(() => {
    return this.formService.isEditMode() ? 'Редактировать статью' : 'Создать статью';
  });

  protected formButton = computed(() => {
    return this.formService.isEditMode() ? ' Редактировать' : 'Добавить';
  });
  protected isSelectOpen: boolean = false;
  protected spanSelectValue: string = 'Tennis';

  public toggleForm = input<boolean>();
  public editData = input<FormData>();
  public editId = input<string>();
  public dataOut = output<FormData>();
  public editClose = output<boolean>();
  public form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(25)]],
    description: ['', Validators.required],
    category: ['tennis-article', Validators.required],
  });

  protected titleError = this.form.get('title')?.errors;
  constructor() {
    this.formService.formClose();
  }

  protected onSubmit(e: Event) {
    e.preventDefault();
    if (this.formService.isEditMode()) {
      this.dataOut.emit({ ...this.form.getRawValue(), id: this.editId()! });
    } else {
      this.dataOut.emit(this.form.getRawValue());
    }
    // this.formService.formClose();
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
    this.editClose.emit(true);
    this.spanSelectValue = 'Tennis';
  }

  ngOnChanges() {
    const tempData = this.editData();
    if (tempData && tempData.title !== '') {
      this.formService.formEdit();
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
      this.formService.formNotEdit();
      this.form.setValue({
        title: '',
        description: '',
        category: 'Tennis',
      });
      this.spanSelectValue = 'Tennis';
    }
  }
}
