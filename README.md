# GeoInsight

A GIS monitoring dashboard for a field sensor network. Stations (weather, air
quality, water level, seismic) are plotted on an interactive map and can be
filtered by type and by distance from a reference point.

- **Backend** — ASP.NET Core Web API (.NET 8). Serves station data as GeoJSON and
  supports type + spatial (radius) filtering.
- **Frontend** — Angular 17 (standalone components) with Leaflet for the map.

---

## Tech stack

| Layer     | Tech |
|-----------|------|
| Backend   | .NET 8, ASP.NET Core Web API, Swagger |
| Frontend  | Angular 17, TypeScript, Leaflet, RxJS |
| Data      | GeoJSON, in-repo `stations.json` sample dataset |

---

## Project structure

```
geoinsight/
├─ GeoInsight.sln
├─ backend/
│  └─ GeoInsight.Api/
│     ├─ Controllers/FeaturesController.cs   # /api/features endpoints
│     ├─ Services/StationService.cs          # data access + filtering
│     ├─ Services/GeoSpatial.cs              # distance / spatial helpers
│     ├─ Models/Station.cs                   # domain model + GeoJSON DTOs
│     └─ Data/stations.json                  # sample station dataset
└─ frontend/
   └─ src/app/
      ├─ components/map.component.ts          # Leaflet map
      ├─ components/filter-panel.component.ts # type + radius filters
      ├─ services/feature.service.ts          # API client
      └─ models/feature.model.ts              # GeoJSON types
```

---

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org) and npm

---

## Getting started

### 1. Backend (API) — runs on `http://localhost:5080`

```bash
cd backend/GeoInsight.Api
dotnet run
```

Swagger UI: `http://localhost:5080/swagger`

### 2. Frontend (Angular) — runs on `http://localhost:4200`

```bash
cd frontend
npm install
npm start
```

Open `http://localhost:4200`. The app calls the API at `http://localhost:5080`.

---

## API

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/features` | Stations as a GeoJSON `FeatureCollection`. Query params: `type`, `lat`, `lng`, `radiusKm`. |
| GET | `/api/features/{id}` | A single station. |
| GET | `/api/features/types` | Distinct station types (for the layer selector). |

Example — weather stations within 10 km of the city centre:

```
GET /api/features?type=Weather&lat=33.68&lng=73.05&radiusKm=10
```

---

## Features

- Interactive Leaflet map with stations colour-coded by type.
- Filter by **station type** (layer selector).
- **Radius search** — show only stations within N km of the city centre.
- Station details on click (name, type, status, latest reading).
- GeoJSON API following RFC 7946.
