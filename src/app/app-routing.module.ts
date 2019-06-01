import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainsListComponent } from './pages/trains-list/trains-list.component';
import { CompartmentsListComponent } from './pages/compartments-list/compartments-list.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'trains', component: TrainsListComponent },
  { path: 'compartments', component: CompartmentsListComponent },
  { path: '', component: HomepageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
