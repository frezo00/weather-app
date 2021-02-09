import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { ScrollingModule } from '@angular/cdk/scrolling';

import iconSettings from '../assets/svg';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { TypeaheadComponent } from './components/typeahead/typeahead.component';
import { OutsideClickDirective } from './directives/outside-click.directive';
import { DaterangePipe } from './pipes/daterange.pipe';
import { FnPipe } from './pipes/fn.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { ApiInterceptor } from './services/interceptor/api.interceptor';

@NgModule({
  declarations: [
    // COMPONENTS
    AppComponent,
    DropdownComponent,
    TypeaheadComponent,

    // DIRECTIVES
    OutsideClickDirective,

    // PIPES
    DaterangePipe,
    FnPipe,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ScrollingModule,
    SvgIconsModule.forRoot({ ...iconSettings })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
