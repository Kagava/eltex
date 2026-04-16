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
  protected openForm() {
    console.log('form is open');
  }

  protected openStat() {
    this.isStatOpenFlag = !this.isStatOpenFlag;
    this.isStatOpen.emit(this.isStatOpenFlag);
    console.log('stat is open');
  }
}
