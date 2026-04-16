import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dialog-stat',
  imports: [],
  templateUrl: './dialog-stat.html',
  styleUrl: './dialog-stat.scss',
})
export class DialogStat {
  public isHidden = input<boolean>();
  public isHiddenOut = output<boolean>();

  protected changeVision() {
    this.isHiddenOut.emit(true);
  }
}
