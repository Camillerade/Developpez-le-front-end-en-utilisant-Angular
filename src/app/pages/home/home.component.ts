import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public data$: Observable<any> = of(null);  // Observable pour recevoir les données
  public data: any[] = [];  // Tableau qui stocke les données une fois récupérées
  public tooltipData: { name: string; value: number } | null = null; // Données pour le tooltip
  public tooltipX: number = 0; // Position X du tooltip
  public tooltipY: number = 0; // Position Y du tooltip

  constructor(private olympicService: OlympicService, private router: Router) {}  // Injecter Router

  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe({
      next: () => {
        this.olympicService.getCountries().pipe(take(1)).subscribe(countries => {
          this.olympicService.getMedalCoount().pipe(take(1)).subscribe(medalCounts => {
            // Associe les pays et les médailles
            this.data = countries.map((country: string, index: number) => ({
              name: country,
              value: medalCounts[index] || 0
            }));
            console.log('Données pour le graphique :', this.data);
          });
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement des données initiales:', err);
      },
    });
  }

  // Gérer la sélection d'un segment
  onSelect(data: any): void {
    console.log('Item clicked', JSON.stringify(data));

    // Rediriger vers une nouvelle page, par exemple en fonction du nom du segment
    if (data.name) {
      this.router.navigate([`/details/${data.name}`]);  // Utiliser une route dynamique
    }
  }

  // Gérer l'affichage du tooltip
  onHover(event: any) {
    this.tooltipData = {
      name: event.name,
      value: event.value
    };
    this.tooltipX = event.event.clientX; // Récupérer la position X de l'événement
    this.tooltipY = event.event.clientY; // Récupérer la position Y de l'événement
  }

  // Effacer les données du tooltip
  onLeave() {
    this.tooltipData = null;
  }

  colorScheme: string = 'cool';  // Schéma de couleurs prédéfini


  view: [number, number] = [window.innerWidth * 0.9, window.innerHeight * 0.6];

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.view = [event.target.innerWidth * 0.8, event.target.innerHeight * 0.6];
  }
}
