import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { IForecast, IForecastDay, IWeather } from '../models';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  averageTemperature$ = new BehaviorSubject<number>(0);

  private readonly _baseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';

  constructor(private _http: HttpClient) {}

  getWeatherPerDay$(city: string): Observable<IWeather[]> {
    const params = new HttpParams().set('city', city);

    return this._http
      .get<IForecast>(this._baseUrl, { params })
      .pipe(
        map(forecast => forecast.data),
        tap(days => this.averageTemperature$.next(this._calculateAverage(days.map(day => day.temp)))),
        map(forecastDays => this._getWeatherData(forecastDays.filter((_, i) => i < 7)))
      );
  }

  private _getWeatherData(forecastDays: IForecastDay[]): IWeather[] {
    return forecastDays.map(day => {
      const { temp, datetime } = day;
      return { temperature: temp, date: datetime };
    });
  }

  private _calculateAverage(values: number[]): number {
    if (!values?.length) {
      return 0;
    }
    return values.reduce((average, value) => average + value, 0) / values.length;
  }
}
