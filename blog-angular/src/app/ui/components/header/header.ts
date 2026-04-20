import { Component, inject, input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  mainLink = input<string>();
  articlesLink = input<string>();
  private readonly router = inject(Router);
  protected routerUrl = (): string => {
    return this.router.url.split(/[,/#.;\s]+/).join('');
  };

  protected isActiveBurger = false;
  protected openBurger() {
    this.isActiveBurger = !this.isActiveBurger;
  }
  protected closeBurger() {
    this.isActiveBurger = false;
  }
}
