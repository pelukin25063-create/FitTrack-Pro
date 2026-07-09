import { Injectable } from '@angular/core';
import { CapacitorNfc, NfcEvent } from '@capgo/capacitor-nfc';


@Injectable({ providedIn: 'root' })
export class NfcService {
  async isSupported(): Promise<boolean> {
    const result = await CapacitorNfc.isSupported();
    return result.supported ?? false;
  }

  // Convierte un texto plano en un registro NDEF de tipo texto ('T')
  private buildTextRecord(text: string) {
    const encoder = new TextEncoder();
    const langBytes = Array.from(encoder.encode('es'));
    const textBytes = Array.from(encoder.encode(text));
    const payload = [langBytes.length & 0x3f, ...langBytes, ...textBytes];
    return { tnf: 0x01, type: [0x54], id: [] as number[], payload };
  }

  // Escribe el nombre/resumen de una rutina en una etiqueta NFC cercana
  async shareRoutine(routineSummary: string): Promise<void> {
    await CapacitorNfc.startScanning({
      alertMessage: 'Acerca el celular a la etiqueta NFC para compartir tu rutina.',
    });

    const listener = await CapacitorNfc.addListener('nfcEvent', async () => {
      await CapacitorNfc.write({
        allowFormat: true,
        records: [this.buildTextRecord(routineSummary)],
      });
      await listener.remove();
      await CapacitorNfc.stopScanning();
    });
  }

  // Escucha una etiqueta NFC entrante para recibir una rutina compartida
  async receiveRoutine(): Promise<string | null> {
    return new Promise(resolve => {
      CapacitorNfc.addListener('nfcEvent', async (event: NfcEvent) => {
        const record = event.tag?.ndefMessage?.[0];
        const text = record ? new TextDecoder().decode(new Uint8Array(record.payload)) : null;
        await CapacitorNfc.stopScanning();
        resolve(text);
      });
      CapacitorNfc.startScanning({
        alertMessage: 'Acerca el celular a la etiqueta NFC de tu compañero.',
      });
    });
  }
}
