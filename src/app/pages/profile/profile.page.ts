import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserProfile, BleDeviceInfo } from '../../models/misc.model';
import { ProfileService } from '../../services/profile.service';
import { BluetoothService } from '../../services/bluetooth.service';
import { NfcService } from '../../services/nfc.service';

// Unidad 5 (Bluetooth/NFC) + Unidad 9 (Almacenamiento)
@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: UserProfile = { name: '' };
  devices: BleDeviceInfo[] = [];
  heartRate: number | null = null;
  scanning = false;
  connectedId: string | null = null;
  nfcSupported = false;

  constructor(
    private profileService: ProfileService,
    private bluetooth: BluetoothService,
    private nfc: NfcService,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit(): Promise<void> {
    this.profile = await this.profileService.get();
    this.bluetooth.devices.subscribe(list => (this.devices = list));
    this.bluetooth.heartRate.subscribe(bpm => (this.heartRate = bpm));
    this.nfcSupported = await this.nfc.isSupported().catch(() => false);
  }

  async saveProfile(): Promise<void> {
    await this.profileService.save(this.profile);
    this.showToast('Perfil guardado correctamente');
  }

  // --- Bluetooth Low Energy ---
  async scanBleDevices(): Promise<void> {
    this.scanning = true;
    try {
      await this.bluetooth.scanDevices();
    } finally {
      setTimeout(() => (this.scanning = false), 6000);
    }
  }

  async connectDevice(deviceId: string): Promise<void> {
    await this.bluetooth.connect(deviceId);
    this.connectedId = deviceId;
    this.showToast('Banda de ritmo cardíaco conectada');
  }

  async disconnectDevice(): Promise<void> {
    await this.bluetooth.disconnect();
    this.connectedId = null;
  }

  // --- NFC: compartir rutina ---
  async shareRoutineByNfc(): Promise<void> {
    try {
      await this.nfc.shareRoutine('Rutina de fuerza: 4x10 sentadillas, 3x12 press banca');
      this.showToast('Rutina compartida por NFC');
    } catch {
      this.showToast('Acerca el dispositivo a una etiqueta NFC');
    }
  }

  async receiveRoutineByNfc(): Promise<void> {
    const routine = await this.nfc.receiveRoutine();
    if (routine) this.showToast('Rutina recibida: ' + routine);
  }

  private async showToast(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    await toast.present();
  }
}
