import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../department.service';
import { Department } from '../department.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { MatError } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department-create-edit',
  templateUrl: './department-create-edit.component.html',
  styleUrls: ['./department-create-edit.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class DepartmentCreateEditComponent implements OnInit {
  departmentForm: FormGroup;
  editMode = false;
  departmentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService
  ) {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.departmentId = +id;
        const department = this.departmentService.getDepartmentById(this.departmentId);
        if (department) {
          this.departmentForm.patchValue(department);
        }
      }
    });
  }

  onSubmit() {
    if (this.departmentForm.valid) {
      const department: Department = {
        id: this.departmentId || 0,
        ...this.departmentForm.value
      };
      if (this.editMode) {
        this.departmentService.updateDepartment(department);
      } else {
        this.departmentService.addDepartment(department);
      }
      this.router.navigate(['/department']);
    }
  }

  onCancel() {
    this.router.navigate(['/department']);
  }
}
