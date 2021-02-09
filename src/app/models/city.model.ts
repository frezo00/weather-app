export interface IBaseCity {
  city_id: number;
  city_name: string;
  state_code: string;
  country_code: string;
  country_full: string;
  lat: number;
  lon: number;
}

export interface ICity extends IBaseCity {
  flag: string;
  fullName: string;
}

export class City implements ICity {
  // tslint:disable: variable-name
  public city_id: number;
  public city_name: string;
  public state_code: string;
  public country_code: string;
  public country_full: string;
  public lat: number;
  public lon: number;
  public flag: string;
  public fullName: string;
  private readonly _flagBaseUrl = 'https://www.countryflags.io';

  constructor(city: IBaseCity) {
    const { city_id, city_name, state_code, country_code, country_full, lat, lon } = city;
    this.city_id = city_id;
    this.city_name = city_name;
    this.state_code = state_code;
    this.country_code = country_code;
    this.country_full = country_full;
    this.lat = lat;
    this.lon = lon;
    this.fullName = `${this.city_name}, ${this.country_code}`;
    this.flag = `${this._flagBaseUrl}/${this.country_code.toLowerCase()}/flat/24.png`;
  }
}
