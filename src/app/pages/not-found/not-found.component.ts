import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
    
  }
  goBack(): void {
    this.location.back(); // Retourne à la page précédente
  }

}
