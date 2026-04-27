import { Subject } from '../types.ts';

export interface ExamDate {
  subject: Subject;
  paper: string;
  date: string;
  time: string;
}

export const EXAM_TIMETABLE: ExamDate[] = [
  { subject: 'English', paper: 'P1', date: '21 Oct 2024', time: '09:00' },
  { subject: 'Business Studies', paper: 'P1', date: '24 Oct 2024', time: '09:00' },
  { subject: 'Mathematics', paper: 'P1', date: '28 Oct 2024', time: '09:00' },
  { subject: 'Mathematical Literacy', paper: 'P1', date: '28 Oct 2024', time: '09:00' },
  { subject: 'Life Sciences', paper: 'P1', date: '01 Nov 2024', time: '09:00' },
  { subject: 'Physical Sciences', paper: 'P1', date: '04 Nov 2024', time: '09:00' },
  { subject: 'Accounting', paper: 'P1', date: '07 Nov 2024', time: '09:00' },
  { subject: 'Geography', paper: 'P1', date: '11 Nov 2024', time: '09:00' },
  { subject: 'Economics', paper: 'P1', date: '14 Nov 2024', time: '09:00' },
  { subject: 'History', paper: 'P1', date: '18 Nov 2024', time: '09:00' },
  { subject: 'Information Technology', paper: 'P1', date: '21 Nov 2024', time: '09:00' }
];
