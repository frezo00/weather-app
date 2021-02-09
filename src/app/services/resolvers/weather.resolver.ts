import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { IWeather } from '../../models';
import { WeatherService } from '../weather.service';

@Injectable({ providedIn: 'root' })
export class WeatherResolver implements Resolve<IWeather[] | null> {
  constructor(private _weatherService: WeatherService) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<IWeather[] | null> {
    const city = route.queryParamMap.get('city');
    return city ? this._weatherService.getWeatherPerDay$(city) : of(null);
  }
}
