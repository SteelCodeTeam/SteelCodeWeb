export interface StatItem {
  value:       number;
  suffix:      string;
  label:       string;
  description: string;
}

export interface StatsData {
  stats: StatItem[];
}
