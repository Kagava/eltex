import { Component } from '@angular/core';
import { Career } from './career/career';
import { Hobby } from './hobby/hobby';

@Component({
  selector: 'app-information',
  imports: [Career, Hobby],
  templateUrl: './information.html',
  styleUrl: './information.scss',
})
export class Information {}
