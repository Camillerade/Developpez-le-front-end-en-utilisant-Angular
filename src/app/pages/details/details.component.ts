import { Component, OnInit,HostListener } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  countryName: string | null = null;
  countryDetails$: Observable<any> | null = null;
  lineChartData: any[] = [];
  colorScheme = 'cool';
  errorMessage: string | null = null;  // Pour stocker les erreurs
  view: [number, number] = [window.innerWidth * 0.8, window.innerHeight * 0.6];
  
  constructor(private route: ActivatedRoute, private olympicService: OlympicService,private router: Router) {}

  ngOnInit(): void {
    this.countryName = this.route.snapshot.paramMap.get('name');

    if (this.countryName) {
      this.countryDetails$ = this.olympicService.getCountryDetails(this.countryName).pipe(
        catchError(error => {
          this.errorMessage = 'Erreur lors de la récupération des données'; // Message d'erreur
          console.error(error); // Log de l'erreur
          return of(null); // Retourner un observable nul
        })
      );

      this.countryDetails$.subscribe(details => {
        if (details) {
          this.lineChartData = this.formatChartData(details.participations);
        }
      });
    }
  }
  formatChartData(participations: any[]): any[] {
    return [{
      name: this.countryName,
      series: participations.map(participation => ({
        name: participation.year.toString(), // Convertir en chaîne pour éviter les virgules
        value: participation.medalsCount
      }))
    }];
  }
  
 
  goBack(): void {
    this.router.navigate(['/']); // Utiliser le service Router pour rediriger
  }
}
