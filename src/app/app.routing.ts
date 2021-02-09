import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WeatherPageComponent } from './pages/weather/weather.component';
import { WeatherResolver } from './services/resolvers/weather.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'weather'
  },
  {
    path: 'weather',
    component: WeatherPageComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
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
