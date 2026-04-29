import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  #isFormOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly isFormOpen = this.#isFormOpen.asReadonly();

  #isFormEdit: WritableSignal<boolean> = signal<boolean>(false);
  public readonly isFormEdit = this.#isFormEdit.asReadonly();

  public formClose() {
    this.#isFormOpen.set(false);
  }

  public formOpen() {
    this.#isFormOpen.set(true);
  }

  public formEdit() {
    this.#isFormEdit.set(true);
  }

  public formNotEdit() {
    this.#isFormEdit.set(false);
  }
}
