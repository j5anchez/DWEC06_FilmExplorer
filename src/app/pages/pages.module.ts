import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Paginas
import { HomeComponent } from './home/home.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { BuscarComponent } from './buscar/buscar.component';
// Modulos
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { RatingModule } from 'ng-starrating';
import { FavoritosComponent } from './favoritos/favoritos.component';

@NgModule({
  declarations: [
    HomeComponent,
    PeliculaComponent,
    BuscarComponent,
    FavoritosComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
    RatingModule
  ]
})
export class PagesModule { }
