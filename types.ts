
export type Grade = '10' | '11' | '12';

export type UserRole = 'student' | 'admin';

export type Subject = 
  | 'Mathematics' 
  | 'Mathematical Literacy' 
  | 'Physical Sciences' 
  | 'Life Sciences' 
  | 'Accounting' 
  | 'Geography'
  | 'English'
  | 'Afrikaans'
  | 'Economics'
  | 'Business Studies'
  | 'History'
  | 'Information Technology';

export interface Message {
  role: 'user' | 'model';
  content: string;
  image?: string;
}

export interface WhatsAppSync {
  enabled: boolean;
  phoneNumber: string;
}

export interface UsageStats {
  messagesSent: number;
  totalMessages: number;
  dailyLimit: number;
  streakDays: number;
  lastActive: string;
  badges: string[];
  mastery: Record<string, number>; // Record<topicId, percentage>
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  joinedAt: string;
  plan: 'free' | 'pro';
  stats: UsageStats;
  preferredLanguage?: string;
}

export type SessionStatus = 'started' | 'active' | 'ended';
export type Platform = 'app' | 'whatsapp';

// Firebase-friendly session structure
export interface LearningSession {
  sessionId: string;
  userId: string;
  grade: Grade;
  subject: Subject;
  phoneNumber?: string;
  whatsappSync: boolean;
  platform: Platform;
  createdAt: string;
  lastMessageAt: string;
  sessionStatus: SessionStatus;
  curriculum: 'CAPS';
}

export type AppView = 'landing' | 'auth' | 'picker' | 'confirmation' | 'study' | 'upgrade' | 'admin' | 'profile' | 'library' | 'teacher' | 'timetable';

export interface Resource {
  id: string;
  title: string;
  url: string;
  memoUrl?: string;
  year: string;
  fileSize: string;
  description?: string;
}

export interface Topic {
  id: string;
  title: string;
  summary: string; // 3-sentence high-level summary
  keyPoints: string[]; // 3 most important formulas/definitions
  bigIdeaLink: {
    text: string;
    url: string;
  };
  resources: {
    pastPapers: Resource[];
    studyNotes: Resource[];
    videoTutorials: Resource[];
  };
}

export type CurriculumData = Record<Grade, Partial<Record<Subject, Topic[]>>>;
