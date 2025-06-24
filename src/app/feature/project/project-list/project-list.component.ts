import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TaskService, Task } from '../../task/services/task.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  projects$!: Observable<Project[]>;
  displayedColumns: string[] = ['id', 'name', 'action'];
  selectedProject: Project | null = null;
  expandedProjectId: number | null = null;
  projectTasks: { [projectName: string]: Task[] } = {};

  constructor(private projectService: ProjectService, public router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.projects$ = this.projectService.getProjects();
    this.projects$.subscribe(data => this.projects = data || []);
  }

  toggleExpand(project: Project) {
    if (this.expandedProjectId === project.id) {
      this.expandedProjectId = null;
    } else {
      this.expandedProjectId = project.id;
      this.taskService.getTasksByProject(project.name).subscribe(tasks => {
        this.projectTasks[project.name] = tasks;
      });
    }
  }

  editTask(task: Task) {
    this.router.navigate(['/tasks/edit', task.id], { queryParams: { source: 'project' } });
  }

  deleteTask(task: Task, projectName: string) {
    this.taskService.deleteTask(task.id).subscribe(() => {
      // Refresh the tasks for this project
      this.taskService.getTasksByProject(projectName).subscribe(tasks => {
        this.projectTasks[projectName] = tasks;
      });
    });
  }

  setSelectedProject(project: Project) {
    this.selectedProject = project;
  }

  editSelectedProject() {
    if (this.selectedProject) {
      this.router.navigate(['/project/edit', this.selectedProject.id]);
    }
  }

  viewSelectedProject() {
    if (this.selectedProject) {
      this.router.navigate(['/project/view', this.selectedProject.id]);
    }
  }

  deleteSelectedProject() {
    if (this.selectedProject) {
      this.projectService.deleteProject(this.selectedProject.id);
      this.selectedProject = null;
    }
  }

  editProject(project: Project) {
    this.router.navigate(['/project/edit', project.id]);
  }

  viewProject(project: Project) {
    this.router.navigate(['/project/view', project.id]);
  }

  deleteProject(project: Project) {
    this.projectService.deleteProject(project.id);
    // No need to manually refresh, BehaviorSubject will emit new value
  }

  addTaskForProject(project: Project) {
    this.router.navigate(['/tasks/create'], { queryParams: { project: project.name, source: 'project' } });
  }

  viewTask(task: Task) {
    this.router.navigate(['/tasks/view', task.id], { queryParams: { source: 'project' } });
  }
}
