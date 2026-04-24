import { Component, inject, input, output } from '@angular/core';

@Component({
  selector: 'app-dialog-stat',
  imports: [],
  templateUrl: './dialog-stat.html',
  styleUrl: './dialog-stat.scss',
})
export class DialogStat {
  public isHidden = input<boolean>();
  public isHiddenOut = output<boolean>();
  public articleCout = input<number>();
  protected changeVision() {
    console.log(this.isHidden());
    this.isHiddenOut.emit(true);
  }
}
