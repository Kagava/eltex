import { Component, inject, input, output } from '@angular/core';
import { FormService } from '../../../services/form-service';

@Component({
  selector: 'app-admin-panel',
  imports: [],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.scss',
})
export class AdminPanel {
  private formService = inject(FormService);

  protected isStatOpen = output<boolean>();
  protected isOpenForm = output();

  public closeStat = input<boolean>(true);

  protected toogleForm() {
    if (this.formService.isFormOpen()) {
      this.formService.formClose();
    } else {
      this.formService.formNotEdit();
      this.formService.formOpen();
      this.isOpenForm.emit();
    }
  }

  protected openStat() {
    this.isStatOpen.emit(this.closeStat());
  }
}
