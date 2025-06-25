import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { Account } from './account.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-account-list',
  standalone: true,
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule]
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  displayedColumns = ['id', 'name', 'action'];

  constructor(private accountService: AccountService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.accountService.getAccounts().subscribe(data => this.accounts = data);
  }

  editAccount(account: Account) {
    this.router.navigate(['/account/edit', account.id]);
  }

  deleteAccount(account: Account) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.accountService.deleteAccount(account.id);
        // Refresh the list after deletion
        this.accountService.getAccounts().subscribe(data => this.accounts = data);
      }
    });
  }

  addAccount() {
    this.router.navigate(['/account/create']);
  }
  viewAccount(account: Account) {
    this.router.navigate(['/account/view', account.id]);
  }
}

@Component({
  selector: 'confirm-delete-dialog',
  template: `
    <h2 mat-dialog-title>Confirm Delete</h2>
    <mat-dialog-content>Are you sure you want to delete this account?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close="false">No</button>
      <button mat-button color="warn" mat-dialog-close="true">Yes</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class ConfirmDeleteDialog {}
