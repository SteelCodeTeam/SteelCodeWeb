export interface HeroCta {
  label:   string;
  url:     string;
  primary: boolean;
}

export interface HeroData {
  terminalLines: string[];
  label:         string;
  title:         string;
  titleMuted:    string;
  subtitle:      string;
  ctas:          HeroCta[];
}
