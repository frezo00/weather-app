import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { City, IBaseCity, ICountry } from '../models';

@Injectable({ providedIn: 'root' })
export class CitiesService {
  currentCity$ = new BehaviorSubject<City | null>(null);
  cities$ = new BehaviorSubject<City[]>([]);
  coutries$ = new BehaviorSubject<ICountry[]>([]);

  get cities(): City[] {
    return this.cities$.getValue();
  }

  constructor(private _httpClient: HttpClient) {}

  getCityByName$(name: string): Observable<City | null> {
    const cityName = name.split(',')[0].replace(/ /g, '');
    const data = this.cities.length ? this.cities$ : this.getCities$();
    // This is really heavy search to do on FE, usually should be done on BE
    return data.pipe(
      map(cities => cities.find(city => city.noSpaceName === cityName) || null),
      tap(foundCity => this.currentCity$.next(foundCity))
    );
  }

  getCities$(sort = true): Observable<City[]> {
    return this._httpClient.get<IBaseCity[]>('/assets/data/cities.json').pipe(
      map(baseCities => {
        const cities = baseCities.map(city => new City(city));
        return sort ? cities.sort((a, b) => a.fullName.localeCompare(b.fullName)) : cities;
      }),
      tap(cities => {
        this.cities$.next(cities);
        this.coutries$.next(this._getUniqueCountries(cities));
      })
    );
  }

  private _getUniqueCountries(cities: City[], sort = true): ICountry[] {
    const uniqueCountries = cities
      .map(city => ({ code: city.country_code, flag: city.flag }))
      .reduce((uniques: ICountry[], country) => {
        const isUnique = uniques.map(uniq => uniq.code).includes(country.code);
        return isUnique ? uniques : [...uniques, country];
      }, []);

    return sort ? uniqueCountries.sort((a, b) => a.code.localeCompare(b.code)) : uniqueCountries;
  }
}
