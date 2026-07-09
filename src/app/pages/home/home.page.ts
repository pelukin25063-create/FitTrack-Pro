import { Component, OnInit } from '@angular/core';
import { Tip } from '../../models/misc.model';
import { ApiService } from '../../services/api.service';
import { NetworkService } from '../../services/network.service';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  tips: Tip[] = [];
  loading = true;
  error = false;
  isOnline = true;
  todaysWorkouts: Workout[] = [];

  constructor(
    private api: ApiService,
    private network: NetworkService,
    private workoutService: WorkoutService
  ) {}

  ngOnInit(): void {
    this.network.isOnline.subscribe(status => (this.isOnline = status));
    this.workoutService.workouts.subscribe(all => {
      const today = new Date().toDateString();
      this.todaysWorkouts = all.filter(w => new Date(w.date).toDateString() === today);
    });
    this.loadTips();
  }

  loadTips(): void {
    this.loading = true;
    this.error = false;
    this.api.getFitnessTips().subscribe(res => {
      this.tips = res.tips;
      this.error = res.error;
      this.loading = false;
    });
  }

  doRefresh(event: any): void {
    this.loadTips();
    setTimeout(() => event.target.complete(), 500);
  }
}
