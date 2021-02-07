import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'daterange' })
export class DaterangePipe implements PipeTransform {
  datePipe: DatePipe;

  constructor(@Inject(LOCALE_ID) locale: string) {
    this.datePipe = new DatePipe(locale);
  }

  transform(daterange: Date[] | string[] | null | undefined): string | null {
    if (!daterange?.length) {
      return null;
    }

    // First, combine date formats as a string and remove commas
    const datesString = [...daterange]
      .map(date => this.datePipe.transform(date, 'longDate'))
      .join(' - ')
      .replace(/,/g, '');

    // Second, remove second month value name if the same and remove first year if the same
    const words = datesString.split(' ').reduce((uniqueWords: string[], word) => {
      if (uniqueWords.includes(word)) {
        if (isNaN(+word)) {
          return uniqueWords;
        }
        uniqueWords.splice(uniqueWords.indexOf(word), 1);
      }
      return [...uniqueWords, word];
    }, []);

    // Finally, return a full sentence
    return words.join(' ');
  }
}
