import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient }   from '@angular/common/http';
import { TeamData, Member } from '../../core/models/team.model';
import { API_CONFIG }   from '../../core/config/api.config';

const FALLBACK: TeamData = {
  members: [
    {
      id: 'rudahee', handle: 'rudahee', role: 'Co-founder · Backend & Modding',
      bio: 'Java backend dev with 4+ years in enterprise. Leads Metallics Arts and the technical architecture of SteelCode projects.',
      initials: 'RH', color: '#8aaa3c',
      socials: [
        { platform: 'GitHub',        url: 'https://github.com/rudahee',              label: 'GH' },
        { platform: 'StackOverflow', url: 'https://stackoverflow.com/users/rudahee', label: 'SO' }
      ]
    },
    {
      id: 'tobibusfate', handle: 'tobibusfate', role: 'Co-founder · Frontend & Design',
      bio: 'Handles frontend, UI design and the visual side of SteelCode projects.',
      initials: 'TB', color: '#6a8aff',
      socials: [{ platform: 'GitHub', url: 'https://github.com/tobibusfate', label: 'GH' }]
    },
    {
      id: 'f4rck', handle: 'F4rck', role: 'Artist · Textures & Visual Assets',
      bio: "The creative eye behind SteelCode's visual identity. Handles textures, illustrations and all things art.",
      initials: 'F4', color: '#e07b54', socials: []
    }
  ]
};

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.html',
  styleUrl: './team.css'
})
export class TeamComponent implements OnInit {

  members: Member[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.http.get<TeamData>(API_CONFIG.team).subscribe({
      next:  (data) => this.init(data),
      error: ()     => this.init(FALLBACK)
    });
  }

  private init(data: TeamData): void {
    this.members = data.members;
    this.cdr.detectChanges();
  }
}
