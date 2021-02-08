import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { City, IBaseCity, ICountry } from '../models';

@Injectable({ providedIn: 'root' })
export class CitiesService {
  coutries$ = new BehaviorSubject<ICountry[] | null>(null);

  constructor(private _httpClient: HttpClient) {}

  getCities$(): Observable<City[]> {
    return this._httpClient.get<IBaseCity[]>('/assets/data/cities.json').pipe(
      map(baseCities => baseCities.map(city => new City(city))),
      tap(cities => this.coutries$.next(this._getUniqueCountries(cities)))
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
