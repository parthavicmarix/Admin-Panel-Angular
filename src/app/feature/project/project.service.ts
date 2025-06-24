import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from './project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private projects: Project[] = [
    { id: 1, name: 'Alpha' },
    { id: 2, name: 'Beta' }
  ];
  private projects$ = new BehaviorSubject<Project[]>(this.projects);

  getProjects(): Observable<Project[]> {
    return this.projects$.asObservable();
  }

  getProjectById(id: number): Project | undefined {
    return this.projects.find(p => p.id === id);
  }

  addProject(project: Project) {
    project.id = this.getNextId();
    this.projects.push(project);
    this.projects$.next(this.projects);
  }

  updateProject(project: Project) {
    const idx = this.projects.findIndex(p => p.id === project.id);
    if (idx > -1) {
      this.projects[idx] = project;
      this.projects$.next(this.projects);
    }
  }

  deleteProject(id: number) {
    this.projects = this.projects.filter(p => p.id !== id);
    this.projects$.next(this.projects);
  }

  private getNextId(): number {
    return this.projects.length ? Math.max(...this.projects.map(p => p.id)) + 1 : 1;
  }
}
