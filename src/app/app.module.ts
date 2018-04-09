import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatTableModule,
  MatExpansionModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SessionService } from './services/session/session.service';
import { EstimationService } from './services/estimation/estimation.service';
import { LocationService } from './services/location/location.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
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
