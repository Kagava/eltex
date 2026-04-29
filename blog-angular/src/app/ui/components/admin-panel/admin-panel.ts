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

  public closeStat = input<boolean>(true);

  protected toogleForm() {
    if (this.formService.isFormOpen()) {
      this.formService.formClose();
    } else {
      this.formService.formOpen();
    }
  }

  protected openStat() {
    this.isStatOpen.emit(this.closeStat());
  }
}
