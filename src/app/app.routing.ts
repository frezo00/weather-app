import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WeatherComponent } from './components/weather/weather.component';
import { WeatherResolver } from './services/resolvers/weather.resolver';

const routes: Routes = [
  {
    path: ':city',
    component: WeatherComponent,
    resolve: {
      weather: WeatherResolver
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
