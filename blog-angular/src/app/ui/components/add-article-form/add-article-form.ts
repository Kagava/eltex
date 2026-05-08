import { Component, computed, effect, inject, input, output } from '@angular/core';
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
  private formService = inject(FormService);

  protected isFormOpen = this.formService.isFormOpen();
  protected formTitle = computed(() => {
    return this.formService.isEditMode() ? 'Редактировать статью' : 'Создать статью';
  });

  protected formButton = computed(() => {
    return this.formService.isEditMode() ? ' Редактировать' : 'Добавить';
  });
  protected isSelectOpen: boolean = false;
  protected spanSelectValue = computed(() => {
    return this.editData()?.category === 'frontend-article' ? 'Frontend' : 'Tennis';
  });

  public editData = input.required<FormData | null>();
  public dataOut = output<FormData>();
  public dataOutEdit = output<FormData>();
  public form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(25)]],
    description: ['', Validators.required],
    category: ['tennis-article', Validators.required],
  });

  protected titleError = this.form.get('title')?.errors;
  constructor() {
    this.formService.formClose();
    this.editDataEffect();
  }

  protected onSubmit(e: Event) {
    e.preventDefault();
    if (this.formService.isEditMode()) {
      this.dataOutEdit.emit({ ...this.form.getRawValue(), id: this.editData()!.id });
    } else {
      console.log(this.form.getRawValue());
      this.dataOut.emit(this.form.getRawValue());
    }
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
    this.form.patchValue({ category: 'tennis-article' });
  }

  protected frontendChoice(event: Event) {
    event.stopPropagation();
    this.isSelectOpen = !this.isSelectOpen;
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
    return value === this.spanSelectValue();
  }

  protected resetForm() {
    this.formService.formClose();
  }


  private editDataEffect() {
    effect(() => {
      const tempData = this.editData();
      if (tempData && tempData.title !== '') {
        this.formService.formEdit();
        this.form.reset({
          title: tempData.title,
          description: tempData.description,
          category: tempData.category,
        });
      } else {
        this.form.reset();
      }
    });
  }


  protected hasError(controlName: string) {
    const control = this.form.get(controlName);
    const isValid = control?.invalid && control.touched;
    return Boolean(isValid);
  }

  protected getControlErrors(controlName: string) {
    const control = this.form.get(controlName);
    const errors: Record<string, unknown> | null = control?.errors ?? null;
    if (errors) {
      const errorsArray: string[] = [];
      Object.entries(errors).forEach(([errorType, errorValue]) => {
        errorsArray.push(this.errorMassege(errorType, errorValue));
      });
      return errorsArray;
    }
    return [];
  }
  private errorMassege(errorType: string, errorValue: unknown) {
    switch (errorType) {
      case 'required':
        return 'Поле обязательно для заполнения';
      case 'minlength':
        const { requiredLength, actualLength } = errorValue as {
          requiredLength: number;
          actualLength: number;
        };
        return `Нужно еще ${requiredLength - actualLength} символов`;
      default:
        return 'Ошибка заполнение поля';
    }
  }
}
