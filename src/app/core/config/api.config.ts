const BASE_URL = 'https://raw.githubusercontent.com/SteelCodeTeam/SteelCodeWeb/master/public/assets/data';
const BLOG_URL = 'https://raw.githubusercontent.com/SteelCodeTeam/SteelCodeNewsletter/main/index/index.json';

export const API_CONFIG = {
  hero:     `${BASE_URL}/hero.json`,
  stats:    `${BASE_URL}/stats.json`,
  projects: `${BASE_URL}/projects.json`,
  stack:    `${BASE_URL}/stack.json`,
  team:     `${BASE_URL}/team.json`,
  blog:     BLOG_URL,
  contact:  `${BASE_URL}/contact.json`,
} as const;
