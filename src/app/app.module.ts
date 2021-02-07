import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SvgIconsModule } from '@ngneat/svg-icon';

import iconSettings from '../assets/svg';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { TypeaheadComponent } from './components/typeahead/typeahead.component';

@NgModule({
  declarations: [AppComponent, DropdownComponent, TypeaheadComponent],
  imports: [BrowserModule, AppRoutingModule, SvgIconsModule.forRoot({ ...iconSettings })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
