import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected isActiveBurger = false;
  protected openBurger() {
    this.isActiveBurger = !this.isActiveBurger;
  }
  protected closeBurger() {
    this.isActiveBurger = false;
  }
}
