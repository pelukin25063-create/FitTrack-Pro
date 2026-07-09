import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { BehaviorSubject } from 'rxjs';
import { ExerciseRoute, RoutePoint } from '../models/misc.model';
import { StorageService } from './storage.service';

const KEY = 'routes';
let watchId: string | null = null;

@Injectable({ providedIn: 'root' })
export class LocationService {
  private currentPoints$ = new BehaviorSubject<RoutePoint[]>([]);
  readonly currentPoints = this.currentPoints$.asObservable();
  private tracking = false;

  constructor(private storage: StorageService) {}

  async getCurrentPosition(): Promise<RoutePoint> {
    const perm = await Geolocation.requestPermissions();
    if (perm.location !== 'granted') {
      throw new Error('Permiso de ubicación denegado');
    }
    const pos = await Geolocation.getCurrentPosition();
    return {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      timestamp: pos.timestamp,
    };
  }

  async startTracking(): Promise<void> {
    this.currentPoints$.next([]);
    this.tracking = true;
    watchId = await Geolocation.watchPosition({ enableHighAccuracy: true }, (pos, err) => {
      if (err || !pos || !this.tracking) return;
      const point: RoutePoint = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        timestamp: pos.timestamp,
      };
      this.currentPoints$.next([...this.currentPoints$.value, point]);
    });
  }

  async stopTracking(): Promise<ExerciseRoute> {
    this.tracking = false;
    if (watchId) {
      await Geolocation.clearWatch({ id: watchId });
      watchId = null;
    }
    const points = this.currentPoints$.value;
    const route: ExerciseRoute = {
      id: Date.now(),
      points,
      distanceKm: this.calculateDistance(points),
      startedAt: points[0] ? new Date(points[0].timestamp).toISOString() : new Date().toISOString(),
      finishedAt: new Date().toISOString(),
    };
    const all = (await this.storage.get<ExerciseRoute[]>(KEY)) ?? [];
    await this.storage.set(KEY, [route, ...all]);
    return route;
  }

  async getSavedRoutes(): Promise<ExerciseRoute[]> {
    return (await this.storage.get<ExerciseRoute[]>(KEY)) ?? [];
  }

  // Fórmula de Haversine para distancia entre puntos GPS
  private calculateDistance(points: RoutePoint[]): number {
    if (points.length < 2) return 0;
    const R = 6371;
    let total = 0;
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1];
      const b = points[i];
      const dLat = ((b.lat - a.lat) * Math.PI) / 180;
      const dLng = ((b.lng - a.lng) * Math.PI) / 180;
      const lat1 = (a.lat * Math.PI) / 180;
      const lat2 = (b.lat * Math.PI) / 180;
      const h =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
      total += R * (2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)));
    }
    return Math.round(total * 100) / 100;
  }
}
