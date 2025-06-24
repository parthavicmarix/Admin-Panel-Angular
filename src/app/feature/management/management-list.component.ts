import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagementService } from './management.service';
import { Management } from './management.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-management-list',
  standalone: true,
  templateUrl: './management-list.component.html',
  styleUrls: ['./management-list.component.scss'],
  imports: [MatTableModule, MatButtonModule, MatIconModule]
})
export class ManagementListComponent implements OnInit {
  managements: Management[] = [];
  displayedColumns = ['id', 'rule', 'action'];

  constructor(private managementService: ManagementService, private router: Router) {}

  ngOnInit() {
    this.managementService.getManagements().subscribe(data => this.managements = data);
  }

  editManagement(management: Management) {
    this.router.navigate(['/management/edit', management.id]);
  }

  deleteManagement(management: Management) {
    this.managementService.deleteManagement(management.id);
  }

  addManagement() {
    this.router.navigate(['/management/create']);
  }
  viewManagement(management: Management) {
    this.router.navigate(['/management/view', management.id]);
  }
}
