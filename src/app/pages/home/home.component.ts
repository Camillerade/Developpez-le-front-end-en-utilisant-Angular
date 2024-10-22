import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public data: { name: string; value: number }[] = [];  // Tableau pour stocker les données des pays et leurs médailles
  public tooltipData: { name: string; value: number } | null = null; // Données pour le tooltip
  public tooltipX: number = 0; // Position X du tooltip
  public tooltipY: number = 0; // Position Y du tooltip
  private subscription: Subscription = new Subscription();

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    // Récupérer les pays et le nombre de médailles lorsque le composant est initialisé
    this.subscription.add(
      this.olympicService.loadInitialData().subscribe(() => {
        this.subscription.add(this.olympicService.getCountries().subscribe(countries => {
          this.subscription.add(this.olympicService.getMedalCoount().subscribe(medalCounts => {
            this.data = countries.map((country: string, index: number) => ({
              name: country,
              value: medalCounts[index] || 0
            }));
            console.log('Données pour le graphique :', this.data);
          }));
        }));
      })
    );
  }

  onSelect(data: any): void {
    if (data.name) {
      this.router.navigate([`/details/${data.name}`]);
    }
  }

  onHover(event: any) {
    this.tooltipData = { name: event.name, value: event.value };
    this.tooltipX = event.event.clientX;
    this.tooltipY = event.event.clientY;
    
    console.log('Tooltip Data:', this.tooltipData);
    console.log('Position X:', this.tooltipX, 'Position Y:', this.tooltipY);
  }
  

  onLeave() {
    this.tooltipData = null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Nettoie tous les abonnements
  }
  colorScheme = 'cool'; // Schéma de couleurs du graphique

  view: [number, number] = [window.innerWidth * 0.8, window.innerHeight * 0.6]; // Taille du graphique
}
