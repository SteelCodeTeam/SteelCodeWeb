export interface SocialLink {
  label:    string;
  sublabel: string;
  url:      string;
  primary:  boolean;
}

export interface ContactData {
  links:        SocialLink[];
  supportText:  string;
}
