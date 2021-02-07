import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SvgIconsModule } from '@ngneat/svg-icon';

import iconSettings from '../assets/svg';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { TypeaheadComponent } from './components/typeahead/typeahead.component';
import { OutsideClickDirective } from './directives/outside-click.directive';
import { DaterangePipe } from './pipes/daterange.pipe';
import { FnPipe } from './pipes/fn.pipe';
import { ApiInterceptor } from './services/interceptor/api.interceptor';

@NgModule({
  declarations: [AppComponent, DropdownComponent, TypeaheadComponent, DaterangePipe, FnPipe, OutsideClickDirective],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SvgIconsModule.forRoot({ ...iconSettings })],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
