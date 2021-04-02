import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelTableComponent } from './travel-table/travel-table.component';

const routes: Routes = [
  { path: '', component: TravelTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
