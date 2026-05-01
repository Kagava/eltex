import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  #isFormOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly isFormOpen = this.#isFormOpen.asReadonly();

  #isEditMode: WritableSignal<boolean> = signal<boolean>(false);
  public readonly isEditMode = this.#isEditMode.asReadonly();

  public formClose() {
    this.#isFormOpen.set(false);
  }

  public formOpen() {
    this.#isFormOpen.set(true);
  }

  public formEdit() {
    this.#isEditMode.set(true);
  }

  public formNotEdit() {
    this.#isEditMode.set(false);
  }
}
