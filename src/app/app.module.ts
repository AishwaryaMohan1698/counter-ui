import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { CompartmentsListComponent } from './pages/compartments-list/compartments-list.component';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TrainsListComponent } from './pages/trains-list/trains-list.component';
import { CompartmentCountChartComponent } from './pages/compartment-count-chart/compartment-count-chart.component';
import { CompartmentTypes } from './data-look-up/compartment-types';
import { CompartmentsDataService } from './services/compartments-data.service';
import { TrainsDataService } from './services/trains-data.service';

const appRoutes: Routes = [
  { path: 'trains', component: TrainsListComponent },
  { path: 'compartments', component: CompartmentsListComponent },
  { path: '', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    TrainsListComponent,
    CompartmentsListComponent,
    PageNotFoundComponent,
    CompartmentCountChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [CompartmentTypes, CompartmentsDataService, TrainsDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
