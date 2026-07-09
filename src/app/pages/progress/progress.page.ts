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

  photos: ProgressPhoto[] = [];
  isPlaying = false;
  progress = 0; // 0-100

  // Lista simple de podcasts/pistas motivacionales
  tracks = [
    { title: 'Motivación Matutina', src: 'assets/audio/motivacion.mp3' },
    { title: 'Ritmo de Cardio', src: 'assets/audio/cardio-beat.mp3' },
  ];
  currentTrackIndex = 0;

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

  // --- Escaneo QR para check-in de gimnasio ---
  async checkInWithQr(): Promise<void> {
    // En producción real: capturar frame de <video> con getUserMedia y pasar
    // a cameraService.scanQrFromVideoFrame(videoEl). Aquí se simula el resultado.
    await this.showToast('Check-in registrado correctamente ✅');
  }

  private async showToast(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    await toast.present();
  }
}
