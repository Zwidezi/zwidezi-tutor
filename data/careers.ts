export interface Career {
  id: string;
  name: string;
  description: string;
  minAps: number;
  requiredSubjects: string[];
  recommendedSubjects: string[];
  universities: string[];
  salaryExpectation: string;
}

export const CAREER_DATA: Career[] = [
  {
    id: 'medicine',
    name: 'Medical Doctor',
    description: 'Diagnose and treat illnesses, perform surgeries, and help patients maintain health.',
    minAps: 38,
    requiredSubjects: ['Mathematics', 'Physical Sciences', 'Life Sciences'],
    recommendedSubjects: [],
    universities: ['WITS', 'UP', 'UCT', 'UKZN', 'US'],
    salaryExpectation: 'R45k - R150k+ pm'
  },
  {
    id: 'it-software',
    name: 'Software Engineer',
    description: 'Design, develop, and maintain software systems and applications.',
    minAps: 32,
    requiredSubjects: ['Mathematics'],
    recommendedSubjects: ['Physical Sciences', 'Information Technology'],
    universities: ['UJ', 'WITS', 'UP', 'UCT', 'SU'],
    salaryExpectation: 'R30k - R120k+ pm'
  },
  {
    id: 'ca',
    name: 'Chartered Accountant',
    description: 'Manage financial records, provide audits, and consult on business strategy.',
    minAps: 34,
    requiredSubjects: ['Mathematics'],
    recommendedSubjects: ['Accounting', 'Economics'],
    universities: ['UJ', 'WITS', 'UP', 'UCT', 'NWU'],
    salaryExpectation: 'R35k - R200k+ pm'
  },
  {
    id: 'eng-civil',
    name: 'Civil Engineer',
    description: 'Design and oversee the construction of infrastructure like bridges, roads, and dams.',
    minAps: 36,
    requiredSubjects: ['Mathematics', 'Physical Sciences'],
    recommendedSubjects: [],
    universities: ['WITS', 'UP', 'UCT', 'UKZN', 'SU'],
    salaryExpectation: 'R25k - R90k+ pm'
  },
  {
    id: 'law',
    name: 'Attorney / Advocate',
    description: 'Represent clients in legal matters and provide counsel on laws and regulations.',
    minAps: 32,
    requiredSubjects: ['English'],
    recommendedSubjects: ['History'],
    universities: ['UL', 'WITS', 'UP', 'UCT', 'UKZN', 'UFS'],
    salaryExpectation: 'R20k - R150k+ pm'
  }
];
