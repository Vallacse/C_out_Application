import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard.route';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { AboutComponent } from './about/about.component';


@NgModule({
    imports: [
        DashboardRoutingModule,
        SharedModule,
        CommonModule,
        SwiperModule
    ],
    exports: [],
    declarations: [
        HomeComponent,
        ServicesComponent,
        AboutComponent,
    ],
    providers: []
})
export class DashboardModule { }
