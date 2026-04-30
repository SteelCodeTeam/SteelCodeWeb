import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient }   from '@angular/common/http';
import { BlogData, Newsletter } from '../../core/models/blog.model';
import { API_CONFIG }   from '../../core/config/api.config';

const FALLBACK: BlogData = { newsletters: [] };

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class BlogComponent implements OnInit {

  newsletters: Newsletter[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.http.get<BlogData>(API_CONFIG.blog).subscribe({
      next:  (data) => this.init(data),
      error: ()     => this.init(FALLBACK)
    });
  }

  private init(data: BlogData): void {
    // Orden cronológico inverso — el más reciente primero
    this.newsletters = [...data.newsletters].sort((a, b) => this.parseDate(a.date) - this.parseDate(b.date)).reverse().slice(0, 5);
    this.cdr.detectChanges();
  }

  private parseDate(date: string): number {
    const [month, year] = date.split("/");
    return +year * 100 + +month; // ej: 10/2025 → 202510
  }

  formatDate(date: string): string {
    const [month, year] = date.split('/');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[+month - 1]} ${year}`;
  }
}
