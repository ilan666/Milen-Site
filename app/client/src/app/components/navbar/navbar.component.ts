import { Component, HostListener, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  toggleNavMenu = false;
  user: User;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe((user) => {
      this.user = user as User;
    });
  }

  ngOnInit() {}

  onToggleMenu() {
    this.toggleNavMenu = !this.toggleNavMenu;
  }
}
