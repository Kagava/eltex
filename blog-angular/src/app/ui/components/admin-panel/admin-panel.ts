import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  imports: [],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.scss',
})
export class AdminPanel {
  private isFormOpenFlag = false;

  protected isStatOpen = output<boolean>();
  protected isFormOpen = output<boolean>();

  public isEditForm = input<boolean>();
  public closeStat = input<boolean>(true);

  protected openForm() {
    if (this.isEditForm()) {
      this.isFormOpenFlag = false;
    } else {
      this.isFormOpenFlag = !this.isFormOpenFlag;
    }
    this.isFormOpen.emit(this.isFormOpenFlag);
  }

  protected openStat() {
    this.isStatOpen.emit(this.closeStat());
  }
}
