import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AFormData } from '../../../models/types/form-data';
import { FormService } from '../../../services/form-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-article-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-article-form.html',
  styleUrl: './add-article-form.scss',
})
export class AddArticleForm {
  readonly selectedFile = signal<File | null>(null);
  private readonly fb = inject(NonNullableFormBuilder);
  private transform: number = 42;
  private formService = inject(FormService);

  protected someBlob: File | undefined;
  protected isFormOpen = computed(() => this.formService.isFormOpen());
  protected formTitle = computed(() => {
    return this.formService.isEditMode() ? 'Редактировать статью' : 'Создать статью';
  });

  protected formButton = computed(() => {
    return this.formService.isEditMode() ? ' Редактировать' : 'Добавить';
  });
  protected isSelectOpen: boolean = false;
  protected spanSelectValue: string = 'Tennis';

  public editData = input.required<AFormData | null>();
  public dataOut = output<AFormData>();
  public dataOutEdit = output<AFormData>();
  public form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(25)]],
    description: ['', Validators.required],
    category: ['tennis-article', Validators.required],
    foto: new FormControl(),
  });

  protected titleError = this.form.get('title')?.errors;
  constructor(private http: HttpClient) {
    this.formService.formClose();
    this.editDataEffect();
  }

  protected onSubmit(e: Event) {
    e.preventDefault();
    if (this.formService.isEditMode()) {
      this.dataOutEdit.emit({ ...this.form.getRawValue(), id: this.editData()!.id });
    } else {
      this.dataOut.emit(this.form.getRawValue());
    }
    this.form.reset();
    this.resetForm();
  }

  protected onSelectFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.selectedFile.set(file);
      const blob: Blob = file;
      const url = URL.createObjectURL(file);
      console.log(url);
      console.log(file);
      this.someBlob = file;
      this.form.patchValue({
        foto: file,
      });
    }
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
        this.spanSelectValue = tempData.category === 'frontend-article' ? 'Fronted' : 'Tennis';
      } else {
        this.form.reset();
        this.spanSelectValue = 'Tennis';
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
