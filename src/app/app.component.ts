import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';  // Import du module NgxChartsModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterModule, NgxChartsModule], // Ajout de NgxChartsModule ici
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public data$: Observable<any> = of(null);  // Observable pour recevoir les données
  public data: any[] = [];  // Tableau qui stocke les données une fois récupérées

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe()    
  }
  

  // Paramètres du graphique
  view: [number, number] = [700, 400];  // Tableau à deux éléments [largeur, hauteur]
  colorScheme: string = 'vivid';  // Schéma de couleurs prédéfini
}
