export interface Bursary {
  id: string;
  name: string;
  provider: string;
  deadline: string;
  requirements: string[];
  url: string;
  category: 'STEM' | 'Finance' | 'General' | 'Arts';
}

export const BURSARY_DATA: Bursary[] = [
  {
    id: 'nsfas',
    name: 'NSFAS Funding',
    provider: 'South African Government',
    deadline: 'Jan 2025',
    requirements: ['SA Citizen', 'Combined household income < R350k', 'SASSA recipients'],
    url: 'https://www.nsfas.org.za',
    category: 'General'
  },
  {
    id: 'isap',
    name: 'ISFAP Funding',
    provider: 'ISFAP',
    deadline: 'Oct 2024',
    requirements: ['Missing Middle', 'STEM degrees', 'Selected Universities'],
    url: 'https://www.isfap.org.za',
    category: 'STEM'
  },
  {
    id: 'funza',
    name: 'Funza Lushaka',
    provider: 'Department of Basic Education',
    deadline: 'Feb 2025',
    requirements: ['B.Ed or PGCE', 'Specializing in Math/Science', 'Commitment to public teaching'],
    url: 'https://www.funzalushaka.doe.gov.za',
    category: 'General'
  },
  {
    id: 'investec-ca',
    name: 'Investec CA Bursary',
    provider: 'Investec',
    deadline: 'Aug 2024',
    requirements: ['Grade 12 Math (Level 6+)', 'Commerce focus', 'Accounting degree'],
    url: 'https://www.investec.com',
    category: 'Finance'
  },
  {
    id: 'allan-gray',
    name: 'Allan Gray Fellowship',
    provider: 'Allan Gray Orbis Foundation',
    deadline: 'May 2024',
    requirements: ['Grade 12 Math (Level 5+)', 'Academic excellence', 'Entrepreneurial mindset'],
    url: 'https://www.allangrayorbis.org',
    category: 'General'
  }
];
