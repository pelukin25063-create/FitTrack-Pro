import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ProgressPhoto } from '../models/misc.model';
import { StorageService } from './storage.service';

const KEY = 'progress_photos';


@Injectable({ providedIn: 'root' })
export class CameraService {
  constructor(private storage: StorageService) {}

  async takeProgressPhoto(): Promise<ProgressPhoto> {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 80,
    });

    const entry: ProgressPhoto = {
      id: Date.now(),
      webPath: photo.webPath ?? '',
      date: new Date().toISOString(),
    };

    const all = (await this.storage.get<ProgressPhoto[]>(KEY)) ?? [];
    await this.storage.set(KEY, [entry, ...all]);
    return entry;
  }

  async getPhotos(): Promise<ProgressPhoto[]> {
    return (await this.storage.get<ProgressPhoto[]>(KEY)) ?? [];
  }

  async deletePhoto(id: number): Promise<void> {
    const all = await this.getPhotos();
    await this.storage.set(KEY, all.filter(p => p.id !== id));
  }

  async scanQrFromVideoFrame(videoEl: HTMLVideoElement): Promise<string | null> {
    const AnyWindow = window as any;
    if (!('BarcodeDetector' in AnyWindow)) {
      throw new Error('BarcodeDetector no soportado en este navegador/dispositivo');
    }
    const detector = new AnyWindow.BarcodeDetector({ formats: ['qr_code'] });
    const barcodes = await detector.detect(videoEl);
    return barcodes.length > 0 ? barcodes[0].rawValue : null;
  }
}
