import { Injectable } from '@angular/core';
import { UserProfile } from '../models/misc.model';
import { StorageService } from './storage.service';

const KEY = 'profile';


@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private storage: StorageService) {}

  async get(): Promise<UserProfile> {
    return (
      (await this.storage.get<UserProfile>(KEY)) ?? {
        name: '',
        weightKg: undefined,
        heightCm: undefined,
        goal: '',
      }
    );
  }

  async save(profile: UserProfile): Promise<void> {
    await this.storage.set(KEY, profile);
  }
}
