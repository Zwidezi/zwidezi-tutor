export interface Degree {
    id: string;
    name: string;
    university: string;
    requiredAps: number;
    subjectRequirements?: Record<string, number>; // e.g., { 'Mathematics': 5, 'Physical Sciences': 5 }
    description: string;
}

export interface ApsMark {
    subject: string;
    percentage: number;
    isLifeOrientation: boolean;
}

// Map percentage to APS Score
export const calculateBaseAps = (percentage: number): number => {
    if (percentage >= 80) return 7;
    if (percentage >= 70) return 6;
    if (percentage >= 60) return 5;
    if (percentage >= 50) return 4;
    if (percentage >= 40) return 3;
    if (percentage >= 30) return 2;
    return 1;
};

// Life Orientation typically doesn't count towards the primary APS score for many universities,
// or it's divided by half, or capped. For simplicity in our general calculator, we will 
// allow the user to see their "Total APS" but flag if it excludes LO if needed by the component.
// Here we just provide the raw calculation.
export const calculateTotalAps = (marks: ApsMark[], excludeLO = true): number => {
    return marks.reduce((total, mark) => {
        if (excludeLO && mark.isLifeOrientation) return total;
        return total + calculateBaseAps(mark.percentage);
    }, 0);
};

export const DREAM_DEGREES: Degree[] = [
    {
        id: 'wits-medicine',
        name: 'MBBCh (Medicine)',
        university: 'University of the Witwatersrand (Wits)',
        requiredAps: 42,
        subjectRequirements: { 'Mathematics': 6, 'Physical Sciences': 6, 'English': 6 },
        description: 'The golden ticket to becoming a doctor. Highly competitive.'
    },
    {
        id: 'uct-bcom-acc',
        name: 'BCom Accounting',
        university: 'University of Cape Town (UCT)',
        requiredAps: 36,
        subjectRequirements: { 'Mathematics': 6, 'English': 5 },
        description: 'The premier route to becoming a Chartered Accountant (SA).'
    },
    {
        id: 'up-eng-mech',
        name: 'BEng Mechanical',
        university: 'University of Pretoria (UP)',
        requiredAps: 35,
        subjectRequirements: { 'Mathematics': 6, 'Physical Sciences': 6 },
        description: 'Build the future with one of Africa\'s best engineering faculties.'
    },
    {
        id: 'su-bsc-compsci',
        name: 'BSc Computer Science',
        university: 'Stellenbosch University',
        requiredAps: 32,
        subjectRequirements: { 'Mathematics': 6 },
        description: 'Learn to code and build the next big tech startup.'
    },
    {
        id: 'uj-ba-law',
        name: 'BA Law',
        university: 'University of Johannesburg (UJ)',
        requiredAps: 28,
        subjectRequirements: { 'English': 5 },
        description: 'Your first step to the bar and the courtroom.'
    },
    {
        id: 'nmu-bcom-marketing',
        name: 'BCom Marketing',
        university: 'Nelson Mandela University (NMU)',
        requiredAps: 26,
        subjectRequirements: { 'Mathematics': 4, 'English': 4 },
        description: 'Master the art of branding and digital selling.'
    },
    {
        id: 'dut-dip-it',
        name: 'Diploma in IT',
        university: 'Durban University of Technology (DUT)',
        requiredAps: 24,
        subjectRequirements: { 'Mathematics': 3, 'English': 4 },
        description: 'A practical, hands-on entry into the tech industry.'
    }
];
