import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { City, IForecast, IForecastDay, IWeather } from '../models';
import { CitiesService } from './cities.service';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  averageTemperature$ = new BehaviorSubject<number>(0);

  private readonly _baseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';

  constructor(private _http: HttpClient, private _citiesService: CitiesService) {}

  getWeatherPerDay$(cityData: string): Observable<IWeather[] | null> {
    const cityName = cityData.split(',')[0];

    return this._citiesService.getCityByName$(cityName).pipe(
      filter(city => !!city),
      switchMap(city => {
        const { city_name, country_code } = city as City;
        const params = new HttpParams().set('city', `${city_name},${country_code}`);

        return this._http
          .get<IForecast>(this._baseUrl, { params })
          .pipe(
            map(forecast => forecast.data),
            tap(perDay => this.averageTemperature$.next(this._calculateAverage(perDay.map(daily => daily.temp)))),
            map(forecastDays => this._getWeatherData(forecastDays.filter((_, i) => i < 7)))
          );
      })
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
