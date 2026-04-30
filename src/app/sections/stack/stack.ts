import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient }   from '@angular/common/http';
import { StackData, SkillCategory } from '../../core/models/stack.model';
import { API_CONFIG }   from '../../core/config/api.config';

const FALLBACK: StackData = {
  categories: [
    { id: 'languages', label: 'Languages', skills: [{ name: 'Java', core: true }, { name: 'Kotlin', core: true }, { name: 'TypeScript', core: true }] },
    { id: 'backend',   label: 'Backend',   skills: [{ name: 'Spring Boot', core: true }, { name: 'NeoForge', core: true }, { name: 'Kafka', core: true }] },
    { id: 'frontend',  label: 'Frontend',  skills: [{ name: 'Angular', core: true }, { name: 'React', core: false }] },
    { id: 'data',      label: 'Databases', skills: [{ name: 'MySQL', core: true }, { name: 'MariaDB', core: true }] },
    { id: 'devops',    label: 'DevOps',    skills: [{ name: 'Docker', core: true }, { name: 'Linux', core: true }] },
    { id: 'creative',  label: 'Creative',  skills: [{ name: 'Blender', core: true }, { name: 'Unity', core: true }] }
  ]
};

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stack.html',
  styleUrl: './stack.css'
})
export class StackComponent implements OnInit {

  categories: SkillCategory[] = [];
  activeCategory = 'all';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.http.get<StackData>(API_CONFIG.stack).subscribe({
      next:  (data) => this.init(data),
      error: ()     => this.init(FALLBACK)
    });
  }

  private init(data: StackData): void {
    this.categories = data.categories;
    this.cdr.detectChanges();
  }

  setActive(id: string): void {
    this.activeCategory = id;
    this.cdr.detectChanges();
  }

  isVisible(catId: string): boolean {
    return this.activeCategory === 'all' || this.activeCategory === catId;
  }
}
