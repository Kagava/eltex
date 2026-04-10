import { Component, inject, input, computed } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  mainLink = input<string>();
  articlesLink = input<string>();
  private readonly router = inject(Router);
  routerUrl: string = '';
  isActive(path: string): boolean {
    this.routerUrl = this.router.url.split(/[,/#.;\s]+/)[1];
    return this.routerUrl === path;
  }
  protected isActiveBurger = false;
  protected openBurger() {
    this.isActiveBurger = !this.isActiveBurger;
  }
  protected closeBurger() {
    this.isActiveBurger = false;
  }
}
