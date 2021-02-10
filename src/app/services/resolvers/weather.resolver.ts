import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { IWeather } from '../../models';
import { WeatherService } from '../weather.service';

@Injectable({ providedIn: 'root' })
export class WeatherResolver implements Resolve<IWeather[] | null> {
  constructor(private _weatherService: WeatherService) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<IWeather[] | null> {
    const city = route.paramMap.get('city');
    return this._weatherService.getWeatherPerDay$(city || '').pipe(take(1));
  }
}
