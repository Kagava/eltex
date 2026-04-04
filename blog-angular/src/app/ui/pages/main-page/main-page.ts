import { Component } from '@angular/core';
import { About } from './parts/about/about';
import { Information } from './parts/information/information';

@Component({
  selector: 'app-main-page',
  imports: [About, Information],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {}
