import {
  Component, OnInit, OnDestroy,
  HostListener, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavLink {
  id:    string;
  label: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class NavComponent implements OnInit, OnDestroy {

  readonly links: NavLink[] = [
    { id: 'hero',     label: 'Home'     },
    { id: 'stats',    label: 'Stats'    },
    { id: 'projects', label: 'Projects' },
    { id: 'stack',    label: 'Stack'    },
    { id: 'team',     label: 'Team'     },
    { id: 'blog',     label: 'Blog'     },
    { id: 'contact',  label: 'Contact'  },
  ];

  activeSection = 'hero';
  scrolled      = false;
  menuOpen      = false;

  private observer: IntersectionObserver | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Intersection Observer por sección — marca cuál está visible
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
            this.cdr.detectChanges();
          }
        });
      },
      { threshold: 0.3 }
    );

    this.links.forEach(link => {
      const el = document.getElementById(link.id);
      if (el) this.observer!.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const wasScrolled = this.scrolled;
    this.scrolled = window.scrollY > 60;
    if (wasScrolled !== this.scrolled) this.cdr.detectChanges();
  }

  scrollTo(id: string): void {
    this.menuOpen = false;
    this.cdr.detectChanges();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.cdr.detectChanges();
  }
}
