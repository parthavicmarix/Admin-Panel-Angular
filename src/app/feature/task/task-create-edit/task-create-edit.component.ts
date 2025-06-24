import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../services/task.service';
import { EmployeeService, Employee } from '../../employee/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DepartmentService } from '../../department/department.service';
import { ProjectService } from '../../project/project.service';

@Component({
  selector: 'app-task-create-edit',
  standalone: true,
  templateUrl: './task-create-edit.component.html',
  styleUrls: ['./task-create-edit.component.scss'],
  imports: [CommonModule, RouterModule, FormsModule, NgSelectModule]
})
export class TaskCreateEditComponent implements OnInit {
  task: Partial<Task> = {};
  departments: any[] = [];
  projects: any[] = [];
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  editMode = false;
  sourceModule: 'task' | 'project' = 'task';

  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService,
    private projectService: ProjectService
  ) {
    this.departmentService.getDepartments().subscribe(deps => {
      this.departments = deps;
    });
    this.projectService.getProjects().subscribe(projs => {
      this.projects = projs;
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      if (!id && params['project']) {
        this.task.project = params['project'];
        this.sourceModule = params['source'] === 'project' ? 'project' : 'task';
      } else if (params['source'] === 'project') {
        this.sourceModule = 'project';
      }
    });
    if (id) {
      this.editMode = true;
      this.employeeService.getEmployees().subscribe(emps => {
        this.employees = emps;
        this.taskService.getTask(+id).subscribe(task => {
          this.task = task || {};
          this.filterEmployees();
        });
      });
    } else {
      this.employeeService.getEmployees().subscribe(emps => {
        this.employees = emps;
        this.filterEmployees();
      });
    }
  }

  filterEmployees() {
    this.filteredEmployees = this.employees.filter(emp => {
      const matchesDepartment = this.task.department ? emp.department === this.task.department : true;
      const matchesProject = this.task.project ? emp.project === this.task.project : true;
      return matchesDepartment && matchesProject;
    });
  }

  onDepartmentChange() {
    this.filterEmployees();
    // Optionally clear selected employee if not in filtered list
    if (this.task.assignedEmployeeId && !this.filteredEmployees.some(e => e.id === this.task.assignedEmployeeId)) {
      this.task.assignedEmployeeId = undefined;
    }
  }

  onProjectChange() {
    this.filterEmployees();
    // Optionally clear selected employee if not in filtered list
    if (this.task.assignedEmployeeId && !this.filteredEmployees.some(e => e.id === this.task.assignedEmployeeId)) {
      this.task.assignedEmployeeId = undefined;
    }
  }

  onSubmit() {
    const navigateTo = this.sourceModule === 'project' ? '/project/list' : '/tasks';
    if (this.editMode) {
      this.taskService.updateTask(this.task as Task).subscribe(() => {
        this.router.navigate([navigateTo]);
      });
    } else {
      this.taskService.addTask(this.task as Task).subscribe(() => {
        this.router.navigate([navigateTo]);
      });
    }
  }
}
