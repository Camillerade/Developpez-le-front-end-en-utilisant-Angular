import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Observable, of, Subject } from 'rxjs'; 
import { catchError, takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  // Nom du pays récupéré depuis l'URL
  countryName: string | null = null; 
  // Observable pour les détails du pays
  countryDetails$: Observable<any> | null = null; 
  // Données pour le graphique
  lineChartData: any[] = []; 
  // Schéma de couleurs pour le graphique
  colorScheme = 'cool'; 
  // Message d'erreur à afficher
  errorMessage: string | null = null; 
  // Message informatif pour l'utilisateur
  infoMessage: string | null = null; 
  // Taille du graphique
  view: [number, number] = [window.innerWidth * 0.8, window.innerHeight * 0.6]; 
  // Totaux de médailles, d'athlètes et de participations
  totalMedals: number | null = null; 
  totalAthletes: number | null = null; 
  totalParticipations: number | null = null; // Nombre total de participations

  // Subject pour gérer la destruction du composant
  private destroy$ = new Subject<void>(); 

  constructor(
    private route: ActivatedRoute, // Service pour obtenir des informations sur l'URL
    private olympicService: OlympicService, // Service pour récupérer les données olympiques
    private router: Router, // Service pour naviguer entre les routes
    private location: Location // Service pour gérer la navigation
  ) {}

  ngOnInit(): void {
    // Récupère le nom du pays depuis l'URL
    this.countryName = this.route.snapshot.paramMap.get('name'); 
    this.infoMessage = `Chargement des détails pour le pays : ${this.countryName}...`; 

    // Si un nom de pays est trouvé
    if (this.countryName) {
      // Récupération des détails du pays
      this.countryDetails$ = this.olympicService.getCountryDetails(this.countryName).pipe(
        catchError(error => {
          console.error('Error fetching country details:', error);
          // Gère l'erreur de récupération des détails
          this.errorMessage = 'Impossible de récupérer les détails de ce pays. Veuillez réessayer plus tard.';
          this.infoMessage = null; // Supprime le message de chargement
          return of(null); // Retourne une valeur nulle
        })
      );

      // Abonnement aux détails du pays
      this.countryDetails$
        .pipe(takeUntil(this.destroy$)) // Se désabonne automatiquement lors de la destruction
        .subscribe(details => {
          // Si des détails sont disponibles
          if (details) {
            this.infoMessage = null; // Supprime le message de chargement
            // Formate les données pour le graphique
            this.lineChartData = this.formatChartData(details.participations); 

            // Calcul des totaux de médailles, d'athlètes et de participations
            const { totalMedals, totalAthletes, totalParticipations } = this.calculateTotals(details.participations);
            this.totalMedals = totalMedals; // Assigne le total des médailles
            this.totalAthletes = totalAthletes; // Assigne le total des athlètes
            this.totalParticipations = totalParticipations; // Assigne le total des participations
          } else {
            // Si aucune donnée n'est disponible
            this.infoMessage = 'Aucune donnée disponible pour ce pays.';
          }
        });
    }
  }

  // Fonction pour formater les données à afficher sur le graphique
  formatChartData(participations: any[]): any[] {
    // Vérifie si des participations sont disponibles
    if (!participations || participations.length === 0) {
      this.infoMessage = 'Aucune participation trouvée pour ce pays.'; // Message d'information
      return []; // Retourne un tableau vide
    }

    // Retourne les données formatées pour le graphique
    return [{
      name: this.countryName, // Nom du pays
      series: participations.map(participation => ({
        name: participation.year.toString(), // Année de participation
        value: participation.medalsCount // Nombre de médailles
      }))
    }];
  }

  // Méthode pour calculer les totaux
  calculateTotals(participations: any[]): { totalMedals: number; totalAthletes: number; totalParticipations: number } {
    return participations.reduce(
        (acc, participation) => {
            const medalsCount = typeof participation.medalsCount === 'number' ? participation.medalsCount : 0; // Nombre de médailles
            const athleteCount = typeof participation.athleteCount === 'number' ? participation.athleteCount : 0; // Nombre d'athlètes
            return {
                totalMedals: acc.totalMedals + medalsCount, // Additionne le total des médailles
                totalAthletes: acc.totalAthletes + athleteCount, // Additionne le total des athlètes
                totalParticipations: acc.totalParticipations + 1 // Compte chaque participation
            };
        },
        { totalMedals: 0, totalAthletes: 0, totalParticipations: 0 } // Valeurs initiales
    );
  }

  // Méthode pour naviguer vers une page non trouvée
  goToNotFound(): void {
    this.router.navigate(['/some-non-existent-route']);
  }

  // Méthode pour revenir à la page précédente
  goBack(): void {
    this.location.back(); 
  }

  // Méthode appelée lors de la destruction du composant
  ngOnDestroy(): void {
    this.destroy$.next(); // Notifie les abonnements de se désabonner
    this.destroy$.complete(); // Termine le Subject
  }
}
