import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagementService } from './management.service';
import { Management } from './management.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-management-view',
  standalone: true,
  templateUrl: './management-view.component.html',
  styleUrls: ['./management-view.component.scss'],
  imports: [MatCardModule, MatButtonModule]
})
export class ManagementViewComponent implements OnInit {
  management: Management | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private managementService: ManagementService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.management = this.managementService.getManagement(id);
  }

  goBack() {
    this.router.navigate(['/management']);
  }
}
