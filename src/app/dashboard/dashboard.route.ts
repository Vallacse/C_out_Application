import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';



const dashboardRoutes: Routes = [
  {
    path:'',pathMatch: 'full',redirectTo:'home'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'services',
    component: ServicesComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes),],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
