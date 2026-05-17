import {
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ArticleFormData } from '../../../models/types/form-data';
import { FormService } from '../../../services/form-service';
import { ENV_CONFIG } from '../../../tokens/enviroments-token';
import { HttpClient } from '@angular/common/http';
import { debounceTime, defer, distinctUntilChanged, fromEvent, map, switchMap, tap } from 'rxjs';
import { CategoriesBack } from '../../../models/types/category';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-article-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-article-form.html',
  styleUrl: './add-article-form.scss',
})
export class AddArticleForm {
  private searchCategoryInput = viewChild.required<ElementRef<HTMLInputElement>>('searchInput');
  private destroyRef = inject(DestroyRef);
  private readonly fb = inject(NonNullableFormBuilder);
  private transform: number = 42;
  private formService = inject(FormService);
  private env = inject(ENV_CONFIG);
  readonly selectedFile = signal<File | null>(null);

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
  protected autoCompleteSignal = signal<string[]>([]);

  public editData = input.required<ArticleFormData | null>();
  public dataOut = output<ArticleFormData>();
  public dataOutEdit = output<ArticleFormData>();
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
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
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

  protected onInputCategory(e: KeyboardEvent) {
    if (!this.env.useLcService) {
    } else {
    }
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

  ngAfterViewInit() {
    fromEvent(this.searchCategoryInput().nativeElement, 'input')
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
        map((event) => (event.target as HTMLInputElement).value),
        switchMap((inputString: string) => {
          return this.http.get('/api/categories').pipe(
            map((item) => item as CategoriesBack[]),
            map((categories: CategoriesBack[]) => {
              return this.findMatchCategoryies(categories, inputString);
            }),
          );
        }),
      )
      .subscribe((matchedCategories: string[]) => this.autoCompleteSignal.set(matchedCategories));
  }

  private findMatchCategoryies(categories: CategoriesBack[], matchToString: string): string[] {
    const result: string[] = [];
    for (let category of categories) {
      const tempCategorryName = category.name;
      if (tempCategorryName.includes(matchToString)) {
        result.push(tempCategorryName);
      }
    }
    return result;
  }
}
