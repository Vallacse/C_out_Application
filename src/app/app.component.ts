import { Component, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'C-Out';
  constructor(private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.spinner.show(
    );

    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }
}
