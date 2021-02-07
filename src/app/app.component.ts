import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IWeather } from './models';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'zivv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  weatherPerDay$!: Observable<IWeather[]>;
  averageTemp$!: Observable<number>;

  constructor(private _weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherPerDay$ = this._weatherService.getWeatherPerDay$();
    this.averageTemp$ = this._weatherService.averageTemperature$;
  }

  mapToDateRange(weatherArray: IWeather[]): [string, string] {
    const dates = weatherArray.map(value => value.date);
    return [dates[0], dates[dates.length - 1]];
  }
}
