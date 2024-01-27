import { Component, OnInit, ViewEncapsulation, } from '@angular/core';
import SwiperCore, { Autoplay, Pagination, SwiperOptions } from "swiper";


SwiperCore.use([Autoplay, Pagination]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  config: SwiperOptions = {
    direction: 'vertical',
    slidesPerView: 1,
    pagination: { clickable: true },
    lazy: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    allowTouchMove: false
  };
  portfolioConfig: SwiperOptions = {
    pagination: { clickable: true },
    lazy: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      160:{
        slidesPerView:1,
        spaceBetween: 10
      },
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      960: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 50
      }
    }
  };
  portfolioImages = [
    { image: 'assets/images/Card/card-image-1.jpg' },
    { image: 'assets/images/Card/card-image-6.jpg' },
    { image: 'assets/images/Card/card-image-7.jpg' },
    { image: 'assets/images/Card/card-image-8.jpg' },
    { image: 'assets/images/Card/card-image-9.jpg' },
    { image: 'assets/images/Card/card-image-11.jpg' },
  ];
  

  constructor(
  ) { }

  ngOnInit(): void {
    
  }

 
}

