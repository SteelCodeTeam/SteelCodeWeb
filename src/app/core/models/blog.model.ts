export interface Newsletter {
  title:  string;
  resume: string;
  url:    string;
  date:   string; // formato MM/YYYY
}

export interface BlogData {
  newsletters: Newsletter[];
}
