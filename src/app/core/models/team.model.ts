export interface SocialLink {
  platform: string;
  url:      string;
  label:    string;
}

export interface Member {
  id:       string;
  handle:   string;
  role:     string;
  bio:      string;
  initials: string;
  color:    string;
  socials:  SocialLink[];
}

export interface TeamData {
  members: Member[];
}
