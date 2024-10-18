import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Observable, of, Subject } from 'rxjs'; 
import { catchError, takeUntil } from 'rxjs/operators';

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

  private destroy$ = new Subject<void>();  // Subject pour gérer la destruction du composant

  constructor(private route: ActivatedRoute, private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.countryName = this.route.snapshot.paramMap.get('name');  // Récupère le nom du pays
    this.infoMessage = `Chargement des détails pour le pays : ${this.countryName}...`;  // Message de chargement

    if (this.countryName) {
      this.countryDetails$ = this.olympicService.getCountryDetails(this.countryName).pipe(
        catchError(error => {
          // En cas d'erreur, afficher un message d'erreur pour l'utilisateur
          this.errorMessage = 'Impossible de récupérer les détails de ce pays. Veuillez réessayer plus tard.';
          this.infoMessage = null;  // Supprime le message de chargement
          return of(null);  // Retourne une valeur nulle pour continuer l'exécution
        })
      );

      // Abonnement à l'observable avec gestion automatique de l'annulation à la destruction du composant
      this.countryDetails$
        .pipe(takeUntil(this.destroy$))  // Abonnement annulé à la destruction du composant
        .subscribe(details => {
          if (details) {
            this.infoMessage = null;  // Supprime le message de chargement
            this.lineChartData = this.formatChartData(details.participations);  // Formatte les données
          } else {
            this.infoMessage = 'Aucune donnée disponible pour ce pays.';  // Message si les détails sont vides
          }
        });
    } else {
      this.errorMessage = 'Aucun pays sélectionné.';  // Message si aucun pays n'est trouvé dans l'URL
    }
  }

  // Fonction pour formater les données à afficher sur le graphique des médailles par année
  formatChartData(participations: any[]): any[] {
    // Vérifie si le tableau de participations est non vide
    if (!participations || participations.length === 0) {
      this.infoMessage = 'Aucune participation trouvée pour ce pays.'; // Affiche un message si aucune donnée n'est disponible
      return [];
    }

    // Si des participations sont disponibles, formate les données
    return [{
      name: this.countryName, // Le nom du pays pour lequel les données seront affichées sur le graphique
      series: participations.map(participation => ({
        name: participation.year.toString(),  // Conversion de l'année en chaîne de caractères pour l'affichage sans virgule
        value: participation.medalsCount  // Nombre de médailles gagnées cette année-là
      }))
    }];
  }
  goBack(): void {
    // Retour à la page d'accueil
    this.router.navigate(['/home']);
  }
  // Méthode appelée lors de la destruction du composant pour nettoyer les abonnements
  ngOnDestroy(): void {
    this.destroy$.next();  // Déclenche l'annulation des abonnements
    this.destroy$.complete();  // Ferme le Subject
  }
}
