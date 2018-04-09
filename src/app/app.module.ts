import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { 
  MatToolbarModule, 
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatExpansionModule,
  MatFormFieldModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
