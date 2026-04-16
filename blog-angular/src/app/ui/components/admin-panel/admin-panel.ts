import { Component, output } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  imports: [],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.scss',
})
export class AdminPanel {
  protected isStatOpen = output<boolean>();
  private isStatOpenFlag = true;
  protected isFormOpen = output<boolean>();
  private isFormOpenFlag = false;
  protected openForm() {
    this.isFormOpenFlag = !this.isFormOpenFlag;
    this.isFormOpen.emit(this.isFormOpenFlag);
  }

  protected openStat() {
    this.isStatOpenFlag = !this.isStatOpenFlag;
    this.isStatOpen.emit(this.isStatOpenFlag);
  }
}
