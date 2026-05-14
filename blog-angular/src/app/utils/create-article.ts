import { articleFormData } from '../models/types/form-data';

export class CreateArticle {
  constructor() {}

  public static findShortData() {
    return this.findData()[0];
  }

  public static createArticle(data: articleFormData) {
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

  private static findData(): string[] {
    const justDate = new Date();
    const currentDate = justDate.getDate();
    const currentMonth = this.findMonth(justDate.getMonth());
    const currentYear = justDate.getFullYear();
    return [
      `${currentYear}-${(justDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.toString().padStart(2, '0')}`,
      `${currentDate} ${currentMonth} ${currentYear}`,
    ];
  }

  private static readonly monthArray = [
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

  private static findMonth(monthNumber: number) {
    return this.monthArray[monthNumber];
  }
}
