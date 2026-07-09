export interface Workout {
  id: number;
  name: string;
  type: 'Fuerza' | 'Cardio' | 'Flexibilidad' | 'Otro';
  sets?: number;
  reps?: number;
  weightKg?: number;
  durationMin?: number;
  date: string; // ISO string
  completed: boolean;
}
