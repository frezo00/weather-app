import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { City, ICountry } from './models';
import { CitiesService } from './services/cities.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'zivv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  cities$!: Observable<City[]>;
  countries$!: Observable<ICountry[]>;
  isLoading$!: Observable<boolean>;

  country: ICountry | undefined;
  city: City | undefined;
  search = '';

  constructor(
    private _citiesService: CitiesService,
    private _loadingService: LoadingService,
    private _router: Router,
    private _cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cities$ = this._citiesService.cities$;
    this.countries$ = this._citiesService.coutries$;
    this.isLoading$ = this._loadingService.isLoading$;

    this.subscription = this._citiesService.currentCity$.pipe(filter(currentCity => !!currentCity)).subscribe(city => {
      this.city = city;
      this.search = city?.fullName || '';
      this.updateCountryFromCity(city);
      this._cdRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onCountrySelect(selectedCountry: ICountry): void {
    this.city = undefined;
    this.search = '';
    this._citiesService.countryChanged(selectedCountry.code);
  }

  onCitySelect(selectedCity: City): void {
    const { noSpaceName, country_code } = selectedCity;
    this.updateCountryFromCity(selectedCity);

    // URL change will trigger resolver and update the data
    this._router.navigateByUrl(`${noSpaceName},${country_code}`);
  }

  updateCountryFromCity(city: City | undefined): void {
    if (city) {
      const { country_code, flag } = city;
      this.country = { code: country_code, flag };
    }
  }
}
