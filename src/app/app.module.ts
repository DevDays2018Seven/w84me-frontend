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
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
