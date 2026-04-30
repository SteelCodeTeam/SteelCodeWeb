import {
  Component, OnInit, OnDestroy,
  ChangeDetectorRef, ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient }   from '@angular/common/http';
import { StatsData, StatItem } from '../../core/models/stats.model';
import { API_CONFIG }   from '../../core/config/api.config';

const FALLBACK: StatsData = {
  stats: [
    { value: 20000, suffix: 'K+', label: 'Downloads',       description: 'across all projects'     },
    { value: 300,   suffix: '+',  label: 'Community',       description: 'members in Discord'       },
    { value: 750,   suffix: '+',  label: 'Commits',         description: 'and counting'             },
    { value: 5,     suffix: '+',  label: 'Active Projects', description: 'open source & maintained' }
  ]
};

interface StatDisplay extends StatItem {
  current: number;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.html',
  styleUrl: './stats.css'
})
export class StatsComponent implements OnInit, OnDestroy {

  stats: StatDisplay[] = [];

  readonly barHeights: number[] = Array.from({ length: 52 }, () =>
    Math.floor(Math.random() * 80) + 10
  );

  private timers: ReturnType<typeof setInterval>[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.http.get<StatsData>(API_CONFIG.stats).subscribe({
      next:  (data) => this.init(data),
      error: ()     => this.init(FALLBACK)
    });
  }

  ngOnDestroy(): void {
    this.timers.forEach(t => clearInterval(t));
  }

  private init(data: StatsData): void {
    this.stats = data.stats.map(s => ({ ...s, current: 0 }));
    this.cdr.detectChanges();
    setTimeout(() => this.animateAll(), 200);
  }

  private animateAll(): void {
    this.stats.forEach((stat, i) =>
      setTimeout(() => this.animateStat(stat), i * 150)
    );
  }

  private animateStat(stat: StatDisplay): void {
    const duration      = 1600;
    const steps         = 60;
    const stepMs        = duration / steps;
    const displayTarget = stat.suffix === 'K+' ? stat.value / 1000 : stat.value;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = this.easeOut(step / steps);
      stat.current   = Math.round(displayTarget * progress);
      this.cdr.detectChanges();
      if (step >= steps) {
        stat.current = displayTarget;
        this.cdr.detectChanges();
        clearInterval(timer);
      }
    }, stepMs);

    this.timers.push(timer);
  }

  private easeOut(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }
}
