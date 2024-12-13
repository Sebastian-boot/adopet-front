import { Component, EventEmitter, Output } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Location } from '../../../core/models/form-report/report';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-location-picker',
  standalone: true,
  imports: [],
  templateUrl: './location-picker.component.html',
  styleUrl: './location-picker.component.css'
})
export class LocationPickerComponent {
  @Output() locationSelect = new EventEmitter<Location>();

  private map!: google.maps.Map;
  private marker!: google.maps.Marker;

  async ngAfterViewInit(): Promise<void> {
    const loader = new Loader({
      apiKey: environment.googleMapsApiKey,
      libraries: ['places'],
      version: 'weekly',
      region: 'ES',
      language: 'es'
    });

    try {
      await loader.load();
      this.initializeMap();
    } catch (error) {
      console.error('Error loading Google Maps:', error);
    }
  }

  private initializeMap(): void {
    const defaultPosition = { lat: 0, lng: 0 };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        defaultPosition.lat = position.coords.latitude;
        defaultPosition.lng = position.coords.longitude;
        this.updateMap(defaultPosition);
      },
      () => this.updateMap(defaultPosition)
    );
  }

  private updateMap(position: google.maps.LatLngLiteral): void {
    const latLng = new google.maps.LatLng(position.lat, position.lng);
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: position,
      zoom: 13
    });

    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      draggable: true
    });

    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        this.updateMarker(event.latLng);
      }
    });

    this.marker.addListener('dragend', () => {
      const position = this.marker.getPosition();
      if (position) {
        this.emitLocation(position);
      }
    });

    this.emitLocation(latLng);
  }

  private updateMarker(position: google.maps.LatLng): void {
    this.marker.setPosition(position);
    this.emitLocation(position);
  }

  private async emitLocation(position: google.maps.LatLng): Promise<void> {
    const geocoder = new google.maps.Geocoder();

    try {
      const response = await geocoder.geocode({
        location: { lat: position.lat(), lng: position.lng() }
      });

      if (response.results?.[0]) {
        const result = response.results[0];
        const address = result.formatted_address;
        const cityComponent = result.address_components.find(
          component => component.types.includes('locality')
        );
        const postalCodeComponent = result.address_components.find(
          component => component.types.includes('postal_code')
        );

        this.locationSelect.emit({
          latitude: position.lat(),
          longitude: position.lng(),
          address,
          city: cityComponent?.long_name || '',
          postalCode: postalCodeComponent?.long_name || ''
        });
      }
    } catch (error) {
      console.error('Error en geocoding:', error);
    }
  }
}
