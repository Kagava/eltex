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
  protected articleCout: number = 0;
  protected changeVision() {
    console.log(this.isHidden);
    this.isHiddenOut.emit(true);
  }

  ngDoCheck() {
    this.articleCout = document.querySelectorAll('.article').length;
  }
}
