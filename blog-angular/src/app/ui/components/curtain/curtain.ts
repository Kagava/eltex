import { Component, output, input } from '@angular/core';

@Component({
  selector: 'app-curtain',
  imports: [],
  templateUrl: './curtain.html',
  styleUrl: './curtain.scss',
})
export class Curtain {
  public isHidden = input<boolean>();
  public isHiddenOut = output<boolean>();

  protected changeVision() {
    this.isHiddenOut.emit(true);
  }
}
