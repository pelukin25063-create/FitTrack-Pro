import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  private online$ = new BehaviorSubject<boolean>(true);
  readonly isOnline = this.online$.asObservable();

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    const status = await Network.getStatus();
    this.online$.next(status.connected);

    Network.addListener('networkStatusChange', status => {
      this.online$.next(status.connected);
    });
  }

  async checkNow(): Promise<boolean> {
    const status = await Network.getStatus();
    this.online$.next(status.connected);
    return status.connected;
  }
}
