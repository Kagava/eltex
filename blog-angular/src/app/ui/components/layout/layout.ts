import { Component, ElementRef, viewChild } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  public mainLink: string = 'main';
  public articlesLink: string = 'articles';

  // Сигнальный запрос элемента. required() гарантирует наличие после инициализации
  private footerEl = viewChild.required<ElementRef<HTMLElement>>('footerEl');

  scrollToFooter(): void {
    const el = this.footerEl().nativeElement;

    // Плавный скролл к началу элемента
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
