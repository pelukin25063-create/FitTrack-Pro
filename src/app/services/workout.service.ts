import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Workout } from '../models/workout.model';
import { StorageService } from './storage.service';

const KEY = 'workouts';


@Injectable({ providedIn: 'root' })
export class WorkoutService {
  private workouts$ = new BehaviorSubject<Workout[]>([]);
  readonly workouts = this.workouts$.asObservable();

  constructor(private storage: StorageService) {
    this.loadAll();
  }

  private async loadAll(): Promise<void> {
    const stored = await this.storage.get<Workout[]>(KEY);
    this.workouts$.next(stored ?? []);
  }

  async getAll(): Promise<Workout[]> {
    return (await this.storage.get<Workout[]>(KEY)) ?? [];
  }

  async add(workout: Omit<Workout, 'id'>): Promise<void> {
    const all = await this.getAll();
    const newWorkout: Workout = { ...workout, id: Date.now() };
    const updated = [newWorkout, ...all];
    await this.storage.set(KEY, updated);
    this.workouts$.next(updated);
  }

  async update(workout: Workout): Promise<void> {
    const all = await this.getAll();
    const updated = all.map(w => (w.id === workout.id ? workout : w));
    await this.storage.set(KEY, updated);
    this.workouts$.next(updated);
  }

  async delete(id: number): Promise<void> {
    const all = await this.getAll();
    const updated = all.filter(w => w.id !== id);
    await this.storage.set(KEY, updated);
    this.workouts$.next(updated);
  }

  async toggleCompleted(id: number): Promise<void> {
    const all = await this.getAll();
    const updated = all.map(w => (w.id === id ? { ...w, completed: !w.completed } : w));
    await this.storage.set(KEY, updated);
    this.workouts$.next(updated);
  }
}
