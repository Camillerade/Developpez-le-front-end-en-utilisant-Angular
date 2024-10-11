import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; // AppComponent standalone
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DetailsComponent } from './pages/details/details.component';

@NgModule({
  declarations: [HomeComponent, NotFoundComponent,DetailsComponent], // Retirer AppComponent ici
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, AppComponent,HeaderComponent, NgxChartsModule], // Ajouter AppComponent ici
  providers: [],
  bootstrap: [AppComponent], // Garder AppComponent pour le bootstrap
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
