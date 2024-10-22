import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Observable, of, Subject } from 'rxjs'; 
import { catchError, takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common'; // Importer Location

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  countryName: string | null = null; // Nom du pays récupéré
  countryDetails$: Observable<any> | null = null; // Observable pour les détails du pays
  lineChartData: any[] = []; // Données du graphique
  colorScheme = 'cool'; // Schéma de couleurs du graphique
  errorMessage: string | null = null; // Message d'erreur pour l'utilisateur
  infoMessage: string | null = null; // Message informatif pour l'utilisateur
  view: [number, number] = [window.innerWidth * 0.8, window.innerHeight * 0.6]; // Taille du graphique

  // Nouvelles propriétés pour stocker les données des médailles et des athlètes
  totalMedals: number | null = null; // Nombre total de médailles
  totalAthletes: number | null = null; // Nombre total d'athlètes

  private destroy$ = new Subject<void>();  // Subject pour gérer la destruction du composant
  

  constructor(private route: ActivatedRoute, private olympicService: OlympicService, private router: Router,private location: Location) {}

  ngOnInit(): void {
    this.countryName = this.route.snapshot.paramMap.get('name'); // Récupère le nom du pays
    this.infoMessage = `Chargement des détails pour le pays : ${this.countryName}...`; // Message de chargement

    if (this.countryName) {
      // Récupération des détails du pays
      this.countryDetails$ = this.olympicService.getCountryDetails(this.countryName).pipe(
        catchError(error => {
          this.errorMessage = 'Impossible de récupérer les détails de ce pays. Veuillez réessayer plus tard.';
          this.infoMessage = null; // Supprime le message de chargement
          return of(null); // Retourne une valeur nulle
        })
      );

      // Abonnement pour obtenir les détails du pays
      this.countryDetails$
        .pipe(takeUntil(this.destroy$))
        .subscribe(details => {
          if (details) {
            this.infoMessage = null; // Supprime le message de chargement
            this.lineChartData = this.formatChartData(details.participations); // Formate les données
      
            // Calcul des totaux de médailles et d'athlètes
            this.totalMedals = this.calculateTotalMedals(details.participations); // Calcule le total des médailles
            this.totalAthletes = this.calculateTotalAthletes(details.participations); // Calcule le total des athlètes
          } else {
            this.infoMessage = 'Aucune donnée disponible pour ce pays.';
          }
        });

      }
  }

  // Fonction pour formater les données à afficher sur le graphique des médailles par année
  formatChartData(participations: any[]): any[] {
    if (!participations || participations.length === 0) {
      this.infoMessage = 'Aucune participation trouvée pour ce pays.';
      return [];
    }

    return [{
      name: this.countryName,
      series: participations.map(participation => ({
        name: participation.year.toString(),
        value: participation.medalsCount
      }))
    }];
  }

// Méthode pour calculer le nombre total de médailles
calculateTotalMedals(participations: any[]): number {
  if (!participations || participations.length === 0) {
    return 0; // Retourne 0 si aucune participation
  }

  return participations.reduce((total, participation) => {
    // Vérifie si medalsCount est un nombre valide
    const medalsCount = typeof participation.medalsCount === 'number' ? participation.medalsCount : 0;
    return total + medalsCount;
  }, 0);
}

// Méthode pour calculer le nombre total d'athlètes
calculateTotalAthletes(participations: any[]): number {
  if (!participations || participations.length === 0) {
    return 0; // Retourne 0 si aucune participation
  }

  return participations.reduce((total, participation) => {
    // Vérifie si athleteCount est un nombre valide
    const athleteCount = typeof participation.athleteCount === 'number' ? participation.athleteCount : 0;
    return total + athleteCount;
  }, 0);
}

  goToNotFound(): void {
    this.router.navigate(['/some-non-existent-route']);
  }

   goBack(): void {
    this.location.back(); // Retourne à la page précédente
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
