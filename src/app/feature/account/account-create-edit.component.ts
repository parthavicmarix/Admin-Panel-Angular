import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from './account.service';
import { Account } from './account.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DepartmentService } from '../department/department.service';
import { Department } from '../department/department.model';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-create-edit',
  standalone: true,
  templateUrl: './account-create-edit.component.html',
  styleUrls: ['./account-create-edit.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatOptionModule]
})
export class AccountCreateEditComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  accountId: number | null = null;
  departments: Department[] = [];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.accountId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      amount: [null, Validators.required],
      department: ['', Validators.required]
    });
    if (this.accountId) {
      this.isEdit = true;
      const account = this.accountService.getAccount(this.accountId);
      if (account) {
        this.form.patchValue(account);
      }
    }
    this.departmentService.getDepartments().subscribe(deps => this.departments = deps);
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isEdit && this.accountId) {
        this.accountService.updateAccount({ id: this.accountId, ...this.form.value });
      } else {
        this.accountService.addAccount(this.form.value);
      }
      this.router.navigate(['/account']);
    }
  }

  onCancel() {
    this.router.navigate(['/account']);
  }
}
