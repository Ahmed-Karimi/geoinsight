import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FilterState {
  type: string;
  radiusKm: number | null;
}

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="panel">
      <h2>Layers &amp; Filters</h2>

      <label for="type">Station type</label>
      <select id="type" [(ngModel)]="type" (ngModelChange)="emit()">
        <option value="">All types</option>
        <option *ngFor="let t of types" [value]="t">{{ t }}</option>
      </select>

      <label for="radius">Radius from city centre (km)</label>
      <input
        id="radius"
        type="number"
        min="0"
        [(ngModel)]="radiusKm"
        (ngModelChange)="emit()"
        placeholder="e.g. 10"
      />

      <button (click)="reset()">Reset</button>
    </div>
  `,
  styles: [`
    .panel { padding: 16px; display: flex; flex-direction: column; gap: 6px; }
    h2 { font-size: 15px; margin: 0 0 6px; }
    label { font-size: 12px; color: #6b7280; margin-top: 8px; }
    select, input { padding: 8px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; }
    button { margin-top: 14px; padding: 9px; border: none; background: #2563eb; color: #fff; border-radius: 6px; cursor: pointer; font-size: 14px; }
    button:hover { background: #1d4ed8; }
  `],
})
export class FilterPanelComponent {
  @Input() types: string[] = [];
  @Output() changed = new EventEmitter<FilterState>();

  type = '';
  radiusKm: number | null = null;

  emit(): void {
    this.changed.emit({ type: this.type, radiusKm: this.radiusKm });
  }

  reset(): void {
    this.type = '';
    this.radiusKm = null;
    this.emit();
  }
}
