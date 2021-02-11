import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WeatherComponent } from './components/weather/weather.component';
import { WeatherResolver } from './services/resolvers/weather.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'weather'
  },
  {
    path: ':city',
    component: WeatherComponent,
    resolve: {
      weather: WeatherResolver
    }
  },
  {
    path: '**',
    redirectTo: 'weather'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
