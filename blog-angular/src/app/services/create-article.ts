import { Injectable } from '@angular/core';
import { FormData } from '../models/types/form-data';
import { Article } from '../models/types/articles';

@Injectable({
  providedIn: 'root',
})
export class CreateArticle {
  private article: Article = {
    title: '',
    id: '',
    date: '',
    dateFormatted: '',
    description: '',
    category: '',
    image: '../assets/article-foto.png',
  };
  constructor() {}

  findData() {
    if (this.article.date !== '') {
      return;
    }
    const justDate = new Date();
    const currentDate = justDate.getDate();
    const currentMonth = this.findMonth(justDate.getMonth());
    const currentYear = justDate.getFullYear();
    this.article.date = `${currentYear}-${(justDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.toString().padStart(2, '0')}`;
    this.article.dateFormatted = `${currentDate} ${currentMonth} ${currentYear}`;
  }

  private monthArray = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  private findMonth(monthNumber: number) {
    return this.monthArray[monthNumber];
  }

  public set(data: FormData) {
    this.article.title = data.title;
    this.article.category = data.category;
    this.article.description = data.description;
    this.article.id = crypto.randomUUID();
    this.findData();
  }

  public get() {
    return this.article;
  }
}
