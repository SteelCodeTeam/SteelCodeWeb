export interface Project {
  id:          string;
  name:        string;
  description: string;
  status:      'active' | 'open' | 'archived';
  tags:        string[];
  url:         string;
  featured:    boolean;
}

export interface ProjectsData {
  projects: Project[];
}
