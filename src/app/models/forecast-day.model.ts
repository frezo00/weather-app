export interface IForecastDay {
  ts: string;
  timestamp_local: Date;
  timestamp_utc: Date;
  datetime: string;
  snow: number;
  snow_depth: number;
  precip: number;
  temp: number;
  dewpt: number;
  max_temp: number;
  min_temp: number;
  app_max_temp: number;
  app_min_temp: number;
  rh: number;
  clouds: number;
  slp: number;
  pres: number;
  uv: number;
  max_dhi: string;
  vis: number;
  pop: number;
  moon_phase: number;
  sunrise_ts: number;
  sunset_ts: number;
  moonrise_ts: number;
  moonset_ts: number;
  pod: string;
  wind_spd: number;
  wind_dir: number;
  wind_cdir: string;
  wind_cdir_full: string;
  weather: {
    icon: string;
    code: string;
    description: string;
  };
}
