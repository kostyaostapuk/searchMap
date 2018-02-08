import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MapComponent } from './map.component';
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCTRnVeLnslRvxDBEefb4Jh1vIFofL7nOQ',
      libraries:['places']
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ MapComponent ],
  declarations: [MapComponent]
})
export class MapModule { }
