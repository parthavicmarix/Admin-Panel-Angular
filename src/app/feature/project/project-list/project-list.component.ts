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

  constructor(private projectService: ProjectService, public router: Router) {}

  ngOnInit(): void {
    this.projects$ = this.projectService.getProjects();
    this.projects$.subscribe(data => this.projects = data || []);
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
}
