import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatExpansionModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SessionService } from './services/session/session.service';
import { EstimationService } from './services/estimation/estimation.service';
import { LocationService } from './services/location/location.service';
import { EstimationPipe } from './pipes/estimation.pipe';


@NgModule({
  declarations: [
    AppComponent,
    EstimationPipe
  ],
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    LocationService,
    SessionService,
    EstimationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
