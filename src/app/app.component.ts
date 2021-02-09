import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { City, ICountry, IWeather } from './models';
import { CitiesService } from './services/cities.service';
import { LoadingService } from './services/loading.service';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'zivv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  weeklyForecast$!: Observable<IWeather[]>;
  averageTemp$!: Observable<number>;
  cities$!: Observable<City[]>;
  countries$!: Observable<ICountry[] | null>;
  isLoading$!: Observable<boolean>;
  country: ICountry | undefined;
  search = '';

  constructor(
    private _weatherService: WeatherService,
    private _citiesService: CitiesService,
    private _loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.cities$ = this._citiesService.getCities$();
    this.countries$ = this._citiesService.coutries$;
    this.weeklyForecast$ = this._weatherService.getWeatherPerDay$();
    this.averageTemp$ = this._weatherService.averageTemperature$;
    this.isLoading$ = this._loadingService.isLoading$;
  }

  onCountrySelect(selectedCountry: ICountry): void {
    console.log('selectedCountry', selectedCountry);
    console.log('country', this.country);
  }

  onTypeaheadSelect(selectedCity: City): void {
    console.log('selectedCity', selectedCity);
    const { country_code, flag } = selectedCity;
    this.country = { code: country_code, flag };
  }

  mapToDateRange(weatherArray: IWeather[]): [string, string] {
    const dates = weatherArray.map(value => value.date);
    return [dates[0], dates[dates.length - 1]];
  }
}
