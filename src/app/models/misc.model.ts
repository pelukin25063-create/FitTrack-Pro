export interface RoutePoint {
  lat: number;
  lng: number;
  timestamp: number;
}

export interface ExerciseRoute {
  id: number;
  points: RoutePoint[];
  distanceKm: number;
  startedAt: string;
  finishedAt?: string;
}

export interface UserProfile {
  name: string;
  weightKg?: number;
  heightCm?: number;
  goal?: string;
  photoDataUrl?: string;
}

export interface Tip {
  id: number;
  title: string;
  summary: string;
}

export interface ProgressPhoto {
  id: number;
  webPath: string;
  date: string;
}

export interface BleDeviceInfo {
  deviceId: string;
  name?: string;
}
