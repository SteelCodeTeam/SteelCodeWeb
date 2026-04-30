import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HttpClient }     from '@angular/common/http';
import { Project, ProjectsData } from '../../core/models/projects.model';
import { API_CONFIG }     from '../../core/config/api.config';

const FALLBACK: ProjectsData = {
  projects: [
    {
      id: 'metallics-arts', name: 'Metallics Arts',
      description: "Mistborn magic systems fully implemented in Minecraft. Allomancy, Feruchemy and Hemalurgy as real gameplay mechanics.",
      status: 'active', tags: ['Java', 'NeoForge', 'Minecraft'],
      url: 'https://github.com/steelcodeteam/metallics-arts', featured: true
    },
    {
      id: 'simpleauths', name: 'SimpleAuths',
      description: 'Authentication mod with login/register commands, IP-based multi-account controls, and JPA/Hibernate persistence.',
      status: 'active', tags: ['Java', 'NeoForge', 'Security'],
      url: 'https://github.com/steelcodeteam', featured: true
    },
    {
      id: 'steelcode-news', name: 'SteelCodeNews',
      description: 'Monthly community newsletter covering FOSS philosophy, esoteric programming languages and open source culture.',
      status: 'active', tags: ['Community', 'Newsletter'],
      url: 'https://github.com/steelcodeteam', featured: false
    },
    {
      id: 'open-requests', name: 'Open Requests',
      description: "Need a mod ported or updated? We support open source. Drop by the Discord and we'll talk.",
      status: 'open', tags: ['Community', 'Open Source'],
      url: 'https://discord.gg/YHqMTRYAMT', featured: false
    }
  ]
};

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  featured: Project[] = [];
  rest:     Project[] = [];
  activeTag = 'All';
  allTags:  string[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.http.get<ProjectsData>(API_CONFIG.projects).subscribe({
      next:  (data) => this.init(data),
      error: ()     => this.init(FALLBACK)
    });
  }

  private init(data: ProjectsData): void {
    this.projects = data.projects;
    this.allTags  = ['All', ...new Set(data.projects.flatMap(p => p.tags))];
    this.filter('All');
  }

  filter(tag: string): void {
    this.activeTag = tag;
    const filtered = tag === 'All'
      ? this.projects
      : this.projects.filter(p => p.tags.includes(tag));
    this.featured = filtered.filter(p => p.featured);
    this.rest     = filtered.filter(p => !p.featured);
    this.cdr.detectChanges();
  }

  statusLabel(status: Project['status']): string {
    return { active: 'active', open: 'open', archived: 'archived' }[status];
  }
}
