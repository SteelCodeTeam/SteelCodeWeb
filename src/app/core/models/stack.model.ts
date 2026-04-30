export interface Skill {
  name: string;
  core: boolean;
}

export interface SkillCategory {
  id:     string;
  label:  string;
  skills: Skill[];
}

export interface StackData {
  categories: SkillCategory[];
}
