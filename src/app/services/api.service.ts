import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Tip } from '../models/misc.model';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';


const TIPS_ES: { title: string; summary: string }[] = [
  {
    title: 'Calienta antes de entrenar',
    summary:
      'Dedica 5 a 10 minutos a movilidad articular y cardio suave antes de levantar peso. Reduce el riesgo de lesiones y mejora tu rendimiento.',
  },
  {
    title: 'La técnica antes que el peso',
    summary:
      'Domina la forma correcta de cada ejercicio antes de aumentar la carga. Una buena técnica previene lesiones y activa mejor el músculo.',
  },
  {
    title: 'Hidrátate durante el entrenamiento',
    summary:
      'Bebe agua antes, durante y después de entrenar. La deshidratación reduce tu fuerza y tu capacidad de concentración.',
  },
  {
    title: 'Descansa entre series',
    summary:
      'Para fuerza, descansa 60-90 segundos entre series; para resistencia muscular, 30-45 segundos son suficientes.',
  },
  {
    title: 'Duerme al menos 7 horas',
    summary:
      'El músculo se repara durante el sueño. Dormir mal puede anular buena parte del progreso que logras entrenando.',
  },
  {
    title: 'Varía tu rutina cada 4-6 semanas',
    summary:
      'El cuerpo se adapta al estímulo. Cambiar ejercicios, series o repeticiones periódicamente evita el estancamiento.',
  },
  {
    title: 'Prioriza la proteína en tu dieta',
    summary:
      'Consumir suficiente proteína a lo largo del día ayuda a la recuperación y al crecimiento muscular.',
  },
  {
    title: 'El cardio también cuenta',
    summary:
      'Combinar entrenamiento de fuerza con cardio moderado mejora tu salud cardiovascular y tu capacidad de recuperación.',
  },
  {
    title: 'Escucha a tu cuerpo',
    summary:
      'El dolor articular agudo no es normal. Si algo duele de forma distinta al cansancio muscular, detente y evalúa.',
  },
  {
    title: 'La constancia gana a la intensidad',
    summary:
      'Entrenar 3-4 veces por semana de forma sostenida da mejores resultados a largo plazo que rutinas extremas ocasionales.',
  },
];


@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getFitnessTips(): Observable<{ tips: Tip[]; error: boolean }> {
    return this.http.get<any[]>(API_URL).pipe(
      map(posts => ({
        tips: posts.slice(0, TIPS_ES.length).map((post, i) => ({
          id: post.id,
          title: TIPS_ES[i].title,
          summary: TIPS_ES[i].summary,
        })),
        error: false,
      })),
      catchError(() => of({ tips: [] as Tip[], error: true }))
    );
  }
}
