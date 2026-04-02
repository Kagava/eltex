import { Component } from '@angular/core';
import { About } from './parts/about/about';

@Component({
  selector: 'app-main-page',
  imports: [About],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {}
