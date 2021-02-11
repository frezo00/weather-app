import { IForecastDay } from './forecast-day.model';

export interface IForecast {
  city_name: string;
  state_code: string;
  country_code: string;
  lat: string;
  lon: string;
  timezone: string;
  data: IForecastDay[];
}
