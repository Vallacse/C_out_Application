import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { SigninComponent } from '../signin/signin.component';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class LayoutComponent implements OnInit {
  @ViewChild('snav') sidenav!: MatSidenav;


  isHideAppHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isHideAllAppHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isSideMenu: boolean = false;
  isopend: boolean = false;
  firstLetter: any;
  isAuthenticated: boolean = false;
  activeLogin : boolean = false;


  constructor(private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.pathFromRoot[1].data.subscribe(r => {
    });
  }

  ngOnInit(): void {
  }
  openDialog(isSignIn: boolean) {
    const dialogRef = this.dialog.open(SigninComponent, {
      data: {
        isSignIn: isSignIn
      }
    });
    dialogRef.afterClosed().subscribe()
  }

  sideMenuToggle() {
    this.isSideMenu = !this.isSideMenu;
  }

  logOut() {
   
  }
}


