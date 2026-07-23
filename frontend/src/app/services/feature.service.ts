import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeatureCollection } from '../models/feature.model';

@Injectable({ providedIn: 'root' })
export class FeatureService {
  private readonly api = 'http://localhost:5080/api/features';

  constructor(private http: HttpClient) {}

  getFeatures(
    type?: string,
    center?: { lat: number; lng: number },
    radiusKm?: number
  ): Observable<FeatureCollection> {
    let params = new HttpParams();
    if (type) {
      params = params.set('type', type);
    }
    if (center && radiusKm) {
      params = params
        .set('lat', center.lat)
        .set('lng', center.lng)
        .set('radiusKm', radiusKm);
    }
    return this.http.get<FeatureCollection>(this.api, { params });
  }

  getTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}/types`);
  }
}
