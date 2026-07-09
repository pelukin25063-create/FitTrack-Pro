import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { LocationService } from '../../services/location.service';
import { NetworkService } from '../../services/network.service';

// Unidad 4 (Conectividad) + Unidad 6 (Geolocalización)
@Component({
  selector: 'app-routes',
  standalone: false,
  templateUrl: 'routes.page.html',
  styleUrls: ['routes.page.scss'],
})
export class RoutesPage implements AfterViewInit, OnDestroy {
  private map!: L.Map;
  private polyline!: L.Polyline;
  isOnline = true;
  isTracking = false;
  distanceKm = 0;

  constructor(private location: LocationService, private network: NetworkService) {
    this.network.isOnline.subscribe(status => (this.isOnline = status));
  }

  async ngAfterViewInit(): Promise<void> {
    await this.initMap();
  }

  // Se vuelve a llamar al reingresar al tab para corregir el tamaño del mapa
  ionViewDidEnter(): void {
    setTimeout(() => this.map?.invalidateSize(), 100);
  }

  private async initMap(): Promise<void> {
    let center: [number, number] = [18.4861, -69.9312]; // Santo Domingo por defecto
    try {
      const pos = await this.location.getCurrentPosition();
      center = [pos.lat, pos.lng];
    } catch {
      // Sin permiso de ubicación: se usa el centro por defecto
    }

    this.map = L.map('fittrack-map').setView(center, 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    L.marker(center).addTo(this.map).bindPopup('Tu ubicación actual');
    this.polyline = L.polyline([], { color: '#16a34a', weight: 5 }).addTo(this.map);

    this.location.currentPoints.subscribe(points => {
      const latlngs = points.map(p => [p.lat, p.lng] as [number, number]);
      this.polyline.setLatLngs(latlngs);
      if (latlngs.length) this.map.panTo(latlngs[latlngs.length - 1]);
    });
  }

  async startRoute(): Promise<void> {
    this.isTracking = true;
    this.distanceKm = 0;
    await this.location.startTracking();
  }

  async stopRoute(): Promise<void> {
    this.isTracking = false;
    const route = await this.location.stopTracking();
    this.distanceKm = route.distanceKm;
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
