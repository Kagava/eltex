import { Injectable } from '@angular/core';
import { FormData } from '../models/types/form-data';

@Injectable({
  providedIn: 'root',
})
export class CreateArticle {
  constructor() {}

  public findShortData() {
    return this.findData()[0];
  }

  findData(): string[] {
    const justDate = new Date();
    const currentDate = justDate.getDate();
    const currentMonth = this.findMonth(justDate.getMonth());
    const currentYear = justDate.getFullYear();
    return [
      `${currentYear}-${(justDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.toString().padStart(2, '0')}`,
      `${currentDate} ${currentMonth} ${currentYear}`,
    ];
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

  public get(data: FormData) {
    const time = this.findData();
    return {
      title: data.title,
      category: data.category,
      description: data.description,
      id: crypto.randomUUID() as string,
      date: time[0],
      dateFormatted: time[1],
      image: `../blog/assets/article-foto.png`,
      articleRating: 0,
      comments: [],
    };
  }
}
