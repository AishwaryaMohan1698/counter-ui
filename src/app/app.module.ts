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
import { CompartmentTypes } from './data-look-up/compartment-types';
import { CompartmentsDataService } from './services/compartments-data.service';
import { TrainsDataService } from './services/trains-data.service';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CompartmentCountChartComponent } from './components/compartment-count-chart/compartment-count-chart.component';
import { HeaderComponent } from './components/header/header.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SearchTrainComponent } from './components/search-train/search-train.component';
import { ReactiveFormsModule } from '@angular/forms';
const appRoutes: Routes = [
  { path: 'trains', component: TrainsListComponent },
  { path: 'compartments', component: CompartmentsListComponent },
  { path: '', component: HomepageComponent },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    TrainsListComponent,
    CompartmentsListComponent,
    PageNotFoundComponent,
    CompartmentCountChartComponent,
    HomepageComponent,
    HeaderComponent,
    SearchTrainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [CompartmentTypes, CompartmentsDataService, TrainsDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
