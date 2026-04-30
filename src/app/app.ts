import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroComponent} from './sections/hero/hero';
import {StatsComponent} from './sections/stats/stats';
import {ProjectsComponent} from './sections/projects/projects';
import {StackComponent} from './sections/stack/stack';
import {TeamComponent} from './sections/team/team';
import {BlogComponent} from './sections/blog/blog';
import {ContactComponent} from './sections/contact/contact';
import {NavComponent} from './shared/component/nav/nav';
import {FooterComponent} from './shared/component/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeroComponent, StatsComponent, ProjectsComponent, StackComponent, TeamComponent, BlogComponent, ContactComponent, NavComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
