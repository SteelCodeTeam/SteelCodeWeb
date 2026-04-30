import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient }   from '@angular/common/http';
import { ContactData, SocialLink } from '../../core/models/contact.model';
import { API_CONFIG }   from '../../core/config/api.config';

const FALLBACK: ContactData = {
  links: [
    { label: 'Discord', sublabel: 'Main community hub',     url: 'https://discord.gg/YHqMTRYAMT',             primary: true  },
    { label: 'GitHub',  sublabel: 'Source code & releases', url: 'https://github.com/steelcodeteam',           primary: true  },
    { label: 'Twitch',  sublabel: 'Live streams',           url: 'https://twitch.tv/steelcodeteam',            primary: false },
    { label: 'YouTube', sublabel: 'Videos & showcases',     url: 'https://www.youtube.com/user/steelcodeteam', primary: false },
    { label: 'Twitter', sublabel: 'Updates & news',         url: 'https://twitter.com/steelcodeteam',          primary: false },
    { label: 'Ko-fi',   sublabel: 'Support the team',       url: 'https://ko-fi.com/steelcodeteam',            primary: false }
  ],
  supportText: "You can support us on Twitch or Ko-fi — any donation helps cover server costs (~120€/year). We refund anything beyond our annual budget. We're not here for profit."
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent implements OnInit {

  data: ContactData | null = null;

  get primaryLinks():   SocialLink[] { return this.data?.links.filter(l => l.primary)  ?? []; }
  get secondaryLinks(): SocialLink[] { return this.data?.links.filter(l => !l.primary) ?? []; }

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.http.get<ContactData>(API_CONFIG.contact).subscribe({
      next:  (data) => this.init(data),
      error: ()     => this.init(FALLBACK)
    });
  }

  private init(data: ContactData): void {
    this.data = data;
    this.cdr.detectChanges();
  }
}
