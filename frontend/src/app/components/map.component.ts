import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import * as L from 'leaflet';
import { FeatureCollection } from '../models/feature.model';

const TYPE_COLORS: Record<string, string> = {
  Weather: '#2563EB',
  AirQuality: '#059669',
  Water: '#0891B2',
  Seismic: '#DC2626',
};

@Component({
  selector: 'app-map',
  standalone: true,
  template: `<div id="map" class="map"></div>`,
  styles: [`.map { height: 100%; width: 100%; }`],
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() data: FeatureCollection | null = null;

  private map!: L.Map;
  private readonly layer = L.layerGroup();

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([33.68, 73.05], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(this.map);
    this.layer.addTo(this.map);
    this.render();
  }

  ngOnChanges(): void {
    if (this.map) {
      this.render();
    }
  }

  private render(): void {
    this.layer.clearLayers();
    if (!this.data) {
      return;
    }

    for (const feature of this.data.features) {
      const [lng, lat] = feature.geometry.coordinates;
      const marker = L.circleMarker([lat, lng], {
        radius: 7,
        color: TYPE_COLORS[feature.properties.type] ?? '#6b7280',
        fillColor: TYPE_COLORS[feature.properties.type] ?? '#6b7280',
        fillOpacity: 0.85,
        weight: 2,
      });

      marker.bindPopup(
        `<b>${feature.properties.name}</b><br>` +
          `${feature.properties.type} · ${feature.properties.status}<br>` +
          `${feature.properties.lastReading} ${feature.properties.unit}`
      );

      this.layer.addLayer(marker);
    }
  }
}
