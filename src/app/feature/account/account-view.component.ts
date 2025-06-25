import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from './account.service';
import { Account } from './account.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-view',
  standalone: true,
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss'],
  imports: [CommonModule, MatCardModule, MatButtonModule]
})
export class AccountViewComponent implements OnInit {
  account: Account | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.account = this.accountService.getAccount(id);
  }

  goBack() {
    this.router.navigate(['/account']);
  }
}
