import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CameraService } from '../../services/camera.service';
import { ProgressPhoto } from '../../models/misc.model';

// Unidad 7 (Multimedia) + Unidad 8 (Cámara)
@Component({
  selector: 'app-progress',
  standalone: false,
  templateUrl: 'progress.page.html',
  styleUrls: ['progress.page.scss'],
})
export class ProgressPage implements OnInit {
  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('qrVideo') qrVideoRef!: ElementRef<HTMLVideoElement>;

  photos: ProgressPhoto[] = [];
  isPlaying = false;
  progress = 0; // 0-100

  // Pistas de audio de muestra (dominio público / libres de regalías,
  // hospedadas externamente). En producción se reemplazarían por archivos
  // propios en src/assets/audio/.
  tracks = [
    { title: 'Motivación Matutina', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { title: 'Ritmo de Cardio', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  ];
  currentTrackIndex = 0;

  // Estado del escáner QR
  isScanning = false;
  private mediaStream: MediaStream | null = null;

  constructor(private cameraService: CameraService, private toastCtrl: ToastController) {}

  async ngOnInit(): Promise<void> {
    this.photos = await this.cameraService.getPhotos();
  }

  async takePhoto(): Promise<void> {
    try {
      const photo = await this.cameraService.takeProgressPhoto();
      this.photos = [photo, ...this.photos];
    } catch (err) {
      this.showToast('No se pudo acceder a la cámara.');
    }
  }

  async deletePhoto(id: number): Promise<void> {
    await this.cameraService.deletePhoto(id);
    this.photos = this.photos.filter(p => p.id !== id);
  }

  // --- Reproductor de audio ---
  togglePlay(): void {
    const audio = this.audioRef.nativeElement;
    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  changeTrack(index: number): void {
    this.currentTrackIndex = index;
    this.isPlaying = false;
    this.progress = 0;
    setTimeout(() => this.audioRef?.nativeElement.load(), 0);
  }

  onTimeUpdate(): void {
    const audio = this.audioRef.nativeElement;
    this.progress = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  }

  seek(event: any): void {
    const audio = this.audioRef.nativeElement;
    if (audio.duration) {
      audio.currentTime = (event.detail.value / 100) * audio.duration;
    }
  }

  get currentTrack() {
    return this.tracks[this.currentTrackIndex];
  }

  // --- Escaneo QR real para check-in de gimnasio ---
  // Abre la cámara del dispositivo, muestra el video en pantalla y usa
  // BarcodeDetector (a través de CameraService) para leer un código QR real.
  async checkInWithQr(): Promise<void> {
    const AnyWindow = window as any;
    if (!('BarcodeDetector' in AnyWindow)) {
      this.showToast('Este navegador/dispositivo no soporta escaneo de QR nativo.');
      return;
    }

    try {
      this.isScanning = true;
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });

      // Espera a que el <video> exista en el DOM (isScanning acaba de activarlo)
      await new Promise(resolve => setTimeout(resolve, 100));
      const videoEl = this.qrVideoRef.nativeElement;
      videoEl.srcObject = this.mediaStream;
      await videoEl.play();

      // Intenta detectar un código QR cada 400ms, hasta 10 segundos
      const result = await this.pollForQrCode(videoEl, 10000);
      this.stopQrScan();

      if (result) {
        this.showToast(`Check-in registrado: ${result} ✅`);
      } else {
        this.showToast('No se detectó ningún código QR. Intenta de nuevo.');
      }
    } catch (err) {
      this.stopQrScan();
      this.showToast('No se pudo acceder a la cámara para escanear.');
    }
  }

  private async pollForQrCode(videoEl: HTMLVideoElement, timeoutMs: number): Promise<string | null> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      try {
        const result = await this.cameraService.scanQrFromVideoFrame(videoEl);
        if (result) return result;
      } catch {
        // Sigue intentando hasta que se agote el tiempo
      }
      await new Promise(resolve => setTimeout(resolve, 400));
    }
    return null;
  }

  stopQrScan(): void {
    this.mediaStream?.getTracks().forEach(track => track.stop());
    this.mediaStream = null;
    this.isScanning = false;
  }

  private async showToast(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({ message, duration: 2500 });
    await toast.present();
  }
}

