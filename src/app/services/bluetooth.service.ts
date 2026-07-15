import { Injectable } from '@angular/core';
import { BleClient, ScanResult } from '@capacitor-community/bluetooth-le';
import { BehaviorSubject } from 'rxjs';
import { BleDeviceInfo } from '../models/misc.model';


const HEART_RATE_SERVICE = '0000180d-0000-1000-8000-00805f9b34fb';
const HEART_RATE_MEASUREMENT = '00002a37-0000-1000-8000-00805f9b34fb';



@Injectable({ providedIn: 'root' })
export class BluetoothService {
  private devices$ = new BehaviorSubject<BleDeviceInfo[]>([]);
  readonly devices = this.devices$.asObservable();

  private heartRate$ = new BehaviorSubject<number | null>(null);
  readonly heartRate = this.heartRate$.asObservable();

  private connectedDeviceId: string | null = null;

  async initialize(): Promise<void> {
    await BleClient.initialize();
  }

  async scanDevices(timeoutMs = 6000): Promise<void> {
    this.devices$.next([]);
    await this.initialize();

    await BleClient.requestLEScan({ services: [HEART_RATE_SERVICE] }, (result: ScanResult) => {
      const current = this.devices$.value;
      if (!current.find(d => d.deviceId === result.device.deviceId)) {
        this.devices$.next([
          ...current,
          { deviceId: result.device.deviceId, name: result.device.name },
        ]);
      }
    });

    setTimeout(() => BleClient.stopLEScan(), timeoutMs);
  }

  async connect(deviceId: string): Promise<void> {
    await BleClient.connect(deviceId);
    this.connectedDeviceId = deviceId;

    await BleClient.startNotifications(
      deviceId,
      HEART_RATE_SERVICE,
      HEART_RATE_MEASUREMENT,
      value => {
        // El segundo byte suele contener el valor de ritmo cardíaco (formato uint8)
        const bpm = value.getUint8(1);
        this.heartRate$.next(bpm);
      }
    );
  }

  async disconnect(): Promise<void> {
    if (this.connectedDeviceId) {
      await BleClient.disconnect(this.connectedDeviceId);
      this.connectedDeviceId = null;
      this.heartRate$.next(null);
    }
  }
}
