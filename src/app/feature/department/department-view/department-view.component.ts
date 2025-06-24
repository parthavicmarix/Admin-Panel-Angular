import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../department.service';
import { Department } from '../department.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.scss'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class DepartmentViewComponent implements OnInit {
  department: Department | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.department = this.departmentService.getDepartmentById(+id);
    }
  }

  onBack() {
    this.router.navigate(['/department']);
  }
}
