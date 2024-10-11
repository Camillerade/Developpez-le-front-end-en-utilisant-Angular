import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root'
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json'; // Le chemin du fichier JSON
  private olympics$ = new BehaviorSubject<any[]>([]); // BehaviorSubject qui maintient les données

  constructor(private http: HttpClient) {}

  // Charge les données initiales depuis le fichier JSON
  loadInitialData(): Observable<any> {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)), // Remplit le BehaviorSubject avec les données
      catchError((error, caught) => {
        console.error('Erreur de chargement des données :', error);
        this.olympics$.next([]);
        return caught;
      })
    );
  }
 // Récupère les détails d'un pays spécifique à partir des données olympiques
 getCountryDetails(countryName: string): Observable<any | null> {
  return this.olympics$.pipe(
    map((olympics) => {
      const country = olympics.find(olympic => olympic.country === countryName);
      return country ? country : null; // Si le pays n'est pas trouvé, retourne null
    })
  );
}

  
  // Récupère toutes les données olympiques
  getOlympics(): Observable<any[]> {
    return this.olympics$.asObservable();
  }

  // Récupère uniquement les pays depuis les données olympiques
  getCountries(): Observable<string[]> {
    return this.olympics$.pipe(
      map((olympics) => olympics.map(olympic => olympic.country)) // Retourne la liste des pays
    );
  }
  
  getMedalCoount(): Observable<number[]> {
    return this.olympics$.pipe(
      map((olympics) =>
        olympics.map((olympic: any) =>
          olympic.participations.reduce((total: number, participation: any) => total + participation.medalsCount, 0)
        )
      )
    );
  }
  
}