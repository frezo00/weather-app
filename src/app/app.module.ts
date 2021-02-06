import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SvgIconsModule } from '@ngneat/svg-icon';

import iconSettings from '../assets/svg';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SvgIconsModule.forRoot({ ...iconSettings })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
