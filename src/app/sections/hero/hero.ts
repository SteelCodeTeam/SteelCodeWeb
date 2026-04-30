import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { HttpClient }    from '@angular/common/http';
import { HeroData }      from '../../core/models/hero.model';
import { API_CONFIG } from '../../core/config/api.config';

const FALLBACK: HeroData = {
  terminalLines: [
    '> initializing environments...',
    '> loading projects...',
    '> community: online',
    '> status: ACTIVE_'
  ],
  label:      '// small dev team · FLOSS',
  title:      'SteelCode',
  titleMuted: '\n\tTeam',
  subtitle:   'We build mods, bots, little games\nand community-driven projects.',
  ctas: [
    { label: 'View on GitHub', url: 'https://github.com/steelcodeteam', primary: true  },
    { label: 'Join Discord',   url: 'https://discord.gg/YHqMTRYAMT',   primary: false }
  ]
};

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent implements OnInit, OnDestroy {

  data: HeroData | null = null;

  displayedLines: string[] = [''];
  private lineIndex = 0;
  private charIndex = 0;
  private timeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.http.get<HeroData>(API_CONFIG.hero).subscribe({
      next:  (data) => this.init(data),
      error: ()     => this.init(FALLBACK)
    });
  }

  ngOnDestroy(): void {
    if (this.timeout) clearTimeout(this.timeout);
  }

  private init(data: HeroData): void {
    this.data = data;
    this.cdr.detectChanges();
    this.typeLine();
  }

  private typeLine(): void {
    if (!this.data) return;
    const currentLine = this.data.terminalLines[this.lineIndex];

    if (this.charIndex <= currentLine.length) {
      this.displayedLines[this.lineIndex] = currentLine.slice(0, this.charIndex);
      this.charIndex++;
      this.cdr.detectChanges();
      this.timeout = setTimeout(() => this.typeLine(), 40);
    } else {
      this.lineIndex++;
      this.charIndex = 0;
      if (this.lineIndex < this.data.terminalLines.length) {
        this.displayedLines.push('');
        this.cdr.detectChanges();
        this.timeout = setTimeout(() => this.typeLine(), 300);
      }
    }
  }
}
