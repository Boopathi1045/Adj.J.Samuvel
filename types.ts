
// Enum representing the various legal categories for articles
export enum Category {
  CRIMINAL = 'Criminal Law',
  FAMILY = 'Family Matters',
  CIVIL = 'Civil Litigation',
  GENERAL = 'General'
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category | string;
  date: string;
  imageUrl: string;
  isFeatured?: boolean;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
}

export interface PracticeArea {
  title: string;
  description: string;
  imageUrl: string;
}

export enum AppointmentStatus {
  PENDING = 'Pending',
  CONTACTED = 'Followed Up'
}

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  purpose: string;
  createdAt: string; // Original submission timestamp
  bookedDate: string; // YYYY-MM-DD
  bookedSlot: string; // HH:mm
  status: AppointmentStatus;
}