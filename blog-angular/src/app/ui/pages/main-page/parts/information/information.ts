import { Component } from '@angular/core';
import { Career } from './career/career';

@Component({
  selector: 'app-information',
  imports: [Career],
  templateUrl: './information.html',
  styleUrl: './information.scss',
})
export class Information {}
