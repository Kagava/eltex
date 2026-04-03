import { Component } from '@angular/core';
import { Career } from './career/career';
import { Hobby } from './hobby/hobby';
import { Articles } from './articles/articles';

@Component({
  selector: 'app-information',
  imports: [Career, Hobby, Articles],
  templateUrl: './information.html',
  styleUrl: './information.scss',
})
export class Information {}
