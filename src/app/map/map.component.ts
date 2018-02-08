import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';

import { FormControl } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader, MouseEvent } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public lat: number;
  public lng: number;
  public zoom: number;
  public searchControl: FormControl;

  markers: any[]=[
    {
		  lat: 53.9045398,
		  lng: 27.5615244,
		  label: 'Минск',
		  draggable: false
	  },
  ];

  mapClicked($event: MouseEvent){
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      label: "New Marker",
      draggable: false
    });
  }

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}
  ngOnInit() {
    //Set Google Maps default position
    this.lat = 53.9045398;
    this.lng = 27.5615244;
    this.zoom = 12;

    //Create FormControl
    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
}
