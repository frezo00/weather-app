import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { City, ICountry, IWeather } from '../../models';
import { CitiesService } from '../../services/cities.service';
import { LoadingService } from '../../services/loading.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'zivv-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherPageComponent implements OnInit {
  weeklyForecast$!: Observable<IWeather[]>;
  averageTemp$!: Observable<number>;
  cities$!: Observable<City[]>;
  countries$!: Observable<ICountry[]>;
  isLoading$!: Observable<boolean>;
  country: ICountry | undefined;
  city: City | undefined;
  search = '';

  constructor(
    private _weatherService: WeatherService,
    private _citiesService: CitiesService,
    private _loadingService: LoadingService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.weeklyForecast$ = this._activatedRoute.data.pipe(
      map(data => {
        console.log('route data', data);
        return data.weather as IWeather[];
      })
    );
    this.averageTemp$ = this._weatherService.averageTemperature$;
    this.cities$ = this._citiesService.getCities$();
    this.countries$ = this._citiesService.coutries$;
    this.isLoading$ = this._loadingService.isLoading$;
  }

  onCountrySelect(selectedCountry: ICountry): void {
    console.log('selectedCountry', selectedCountry);
    console.log('country', this.country);
  }

  onCitySelect(selectedCity: City): void {
    const { city_name, country_code, flag } = selectedCity;
    this.country = { code: country_code, flag };
    this.city = Object.assign(selectedCity);
    console.log('selectedCity', selectedCity);
    console.log('this.city', this.city);

    this.updateUrl(`${city_name},${country_code}`);
  }

  updateUrl(cityData: string): void {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        city: cityData
      }
      // replaceUrl: true
      // queryParamsHandling: 'merge'
    });
  }

  mapToDateRange(weatherArray: IWeather[]): [string, string] {
    const dates = weatherArray.map(value => value.date);
    return [dates[0], dates[dates.length - 1]];
  }
}
