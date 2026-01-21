
export type Grade = '10' | '11' | '12';

export type Subject = 
  | 'Mathematics' 
  | 'Mathematical Literacy' 
  | 'Physical Sciences' 
  | 'Life Sciences' 
  | 'Accounting' 
  | 'Geography';

export interface Message {
  role: 'user' | 'model';
  content: string;
}

export interface WhatsAppSync {
  enabled: boolean;
  phoneNumber: string;
}

export interface ChatSession {
  grade: Grade;
  subject: Subject;
  messages: Message[];
  whatsappSync?: WhatsAppSync;
}

export type AppView = 'picker' | 'study';

export interface Resource {
  id: string;
  title: string;
  url: string;
  memoUrl?: string; // Added for Question Paper + Memo pairs
  year: string;
  fileSize: string;
  description?: string;
}

export interface Topic {
  id: string;
  title: string;
  resources: {
    pastPapers: Resource[];
    studyNotes: Resource[];
    videoTutorials: Resource[];
  };
}

export type CurriculumData = Record<Grade, Partial<Record<Subject, Topic[]>>>;
