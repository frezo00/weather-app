import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IWeather } from '../../models';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'zivv-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weeklyForecast$!: Observable<IWeather[]>;
  averageTemp$!: Observable<number>;

  constructor(private _weatherService: WeatherService, private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.weeklyForecast$ = this._activatedRoute.data.pipe(map(data => data.weather as IWeather[]));
    this.averageTemp$ = this._weatherService.averageTemperature$;
  }

  mapToDateRange(weatherArray: IWeather[]): [string, string] {
    const dates = weatherArray.map(value => value.date);
    return [dates[0], dates[dates.length - 1]];
  }
}
