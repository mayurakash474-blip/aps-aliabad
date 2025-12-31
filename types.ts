export enum Page {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  ACADEMICS = 'ACADEMICS',
  ADMISSIONS = 'ADMISSIONS',
  CONTACT = 'CONTACT',
  LOGIN = 'LOGIN',
}

export interface NewsItem {
  id: number;
  date: string;
  title: string;
  excerpt: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface FacultyMember {
  name: string;
  role: string;
  image: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}