import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Workout } from '../../models/workout.model';
import { WorkoutService } from '../../services/workout.service';

// Unidad 3 (Interfaces) + Unidad 9 (Almacenamiento)
@Component({
  selector: 'app-workouts',
  standalone: false,
  templateUrl: 'workouts.page.html',
  styleUrls: ['workouts.page.scss'],
})
export class WorkoutsPage implements OnInit {
  workouts: Workout[] = [];
  showForm = false;

  // Modelo del formulario de nuevo entrenamiento
  form: Partial<Workout> = this.emptyForm();

  constructor(private workoutService: WorkoutService, private alertCtrl: AlertController) {}

  ngOnInit(): void {
    this.workoutService.workouts.subscribe(list => (this.workouts = list));
  }

  emptyForm(): Partial<Workout> {
    return { name: '', type: 'Fuerza', sets: undefined, reps: undefined, weightKg: undefined };
  }

  openForm(): void {
    this.form = this.emptyForm();
    this.showForm = true;
  }

  async save(): Promise<void> {
    if (!this.form.name) return;
    await this.workoutService.add({
      name: this.form.name!,
      type: (this.form.type as Workout['type']) ?? 'Otro',
      sets: this.form.sets,
      reps: this.form.reps,
      weightKg: this.form.weightKg,
      date: new Date().toISOString(),
      completed: false,
    });
    this.showForm = false;
  }

  // Gesto: swipe izquierda para eliminar (ion-item-sliding en el HTML)
  async delete(id: number): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar entrenamiento',
      message: '¿Seguro que deseas eliminarlo?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', role: 'destructive', handler: () => this.workoutService.delete(id) },
      ],
    });
    await alert.present();
  }

  toggle(id: number): void {
    this.workoutService.toggleCompleted(id);
  }

  // Gesto: long press para editar (ver directiva en el HTML con (contextmenu)/press)
  async edit(workout: Workout): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Editar entrenamiento',
      inputs: [
        { name: 'name', type: 'text', value: workout.name, placeholder: 'Nombre' },
        { name: 'reps', type: 'number', value: workout.reps, placeholder: 'Repeticiones' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: data => {
            this.workoutService.update({
              ...workout,
              name: data.name,
              reps: data.reps ? Number(data.reps) : workout.reps,
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
