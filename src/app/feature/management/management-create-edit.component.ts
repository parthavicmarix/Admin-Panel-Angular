import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagementService } from './management.service';
import { Management } from './management.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-management-create-edit',
  standalone: true,
  templateUrl: './management-create-edit.component.html',
  styleUrls: ['./management-create-edit.component.scss'],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class ManagementCreateEditComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  managementId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private managementService: ManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.managementId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.form = this.fb.group({
      rule: ['', Validators.required]
    });
    if (this.managementId) {
      this.isEdit = true;
      const management = this.managementService.getManagement(this.managementId);
      if (management) {
        this.form.patchValue(management);
      }
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isEdit && this.managementId) {
        this.managementService.updateManagement({ id: this.managementId, ...this.form.value });
      } else {
        this.managementService.addManagement(this.form.value);
      }
      this.router.navigate(['/management']);
    }
  }

  onCancel() {
    this.router.navigate(['/management']);
  }
}
