import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map.component';
import { FilterPanelComponent, FilterState } from './components/filter-panel.component';
import { FeatureService } from './services/feature.service';
import { FeatureCollection } from './models/feature.model';

// Reference point used for "within radius" searches.
const CITY_CENTRE = { lat: 33.68, lng: 73.05 };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MapComponent, FilterPanelComponent],
  template: `
    <div class="layout">
      <aside class="sidebar">
        <div class="brand">GeoInsight</div>
        <app-filter-panel [types]="types" (changed)="onFilter($event)"></app-filter-panel>
        <div class="count">{{ data?.features?.length ?? 0 }} stations shown</div>
      </aside>
      <main class="content">
        <app-map [data]="data"></app-map>
      </main>
    </div>
  `,
  styles: [`
    .layout { display: flex; height: 100vh; }
    .sidebar { width: 300px; border-right: 1px solid #e5e7eb; display: flex; flex-direction: column; }
    .brand { padding: 16px; font-weight: 700; font-size: 18px; color: #2563eb; border-bottom: 1px solid #e5e7eb; }
    .content { flex: 1; }
    .count { padding: 12px 16px; font-size: 13px; color: #6b7280; border-top: 1px solid #e5e7eb; margin-top: auto; }
  `],
})
export class AppComponent implements OnInit {
  data: FeatureCollection | null = null;
  types: string[] = [];

  constructor(private readonly features: FeatureService) {}

  ngOnInit(): void {
    this.features.getTypes().subscribe((t) => (this.types = t));
    this.load({ type: '', radiusKm: null });
  }

  onFilter(state: FilterState): void {
    this.load(state);
  }

  private load(state: FilterState): void {
    const center = state.radiusKm ? CITY_CENTRE : undefined;
    this.features
      .getFeatures(state.type || undefined, center, state.radiusKm ?? undefined)
      .subscribe((fc) => (this.data = fc));
  }
}
