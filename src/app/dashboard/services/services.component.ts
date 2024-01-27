import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  serviceConfig: SwiperOptions = {
    pagination: { clickable: true },
    lazy: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
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
  serviceImages = [
    { image: 'assets/images/Card/card-image-2.jpg' },
    { image: 'assets/images/Card/card-image-3.jpg' },
    { image: 'assets/images/Card/card-image-4.jpg' },
    { image: 'assets/images/Card/card-image-5.jpg' },
    { image: 'assets/images/Card/card-image-10.jpg' },
    { image: 'assets/images/Card/card-image-11.jpg' },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
