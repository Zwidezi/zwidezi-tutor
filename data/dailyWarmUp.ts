import { Grade, Subject } from '../types.ts';

export interface QuestionOfTheDay {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  grade: Grade;
  subject: Subject;
  marks: number;
}

export interface FormulaFlashcard {
  id: string;
  formula: string;
  name: string;
  whenToUse: string;
  subject: Subject;
  grade: Grade;
}

export interface WordOfTheDay {
  id: string;
  word: string;
  definition: string;
  example: string;
  subject: Subject;
}

const QUESTIONS: QuestionOfTheDay[] = [
  {
    id: 'q1',
    question: 'If f(x) = 2x² - 3x + 1, what is f(2)?',
    options: ['1', '3', '5', '7'],
    correctAnswer: 1,
    explanation: 'f(2) = 2(4) - 3(2) + 1 = 8 - 6 + 1 = 3',
    grade: '11',
    subject: 'Mathematics',
    marks: 2
  },
  {
    id: 'q2',
    question: 'What is the derivative of x³?',
    options: ['x²', '3x²', '3x', 'x³'],
    correctAnswer: 1,
    explanation: 'Using the power rule: d/dx[xⁿ] = nxⁿ⁻¹, so d/dx[x³] = 3x²',
    grade: '12',
    subject: 'Mathematics',
    marks: 1
  },
  {
    id: 'q3',
    question: 'In Newton\'s Second Law, F = ma, what does "m" represent?',
    options: ['Force', 'Mass', 'Acceleration', 'Momentum'],
    correctAnswer: 1,
    explanation: 'In F = ma, m represents mass (in kg), F is force (in N), and a is acceleration (in m/s²)',
    grade: '10',
    subject: 'Physical Sciences',
    marks: 1
  },
  {
    id: 'q4',
    question: 'Which organelle is the "powerhouse" of the cell?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
    correctAnswer: 1,
    explanation: 'Mitochondria produce ATP through cellular respiration, providing energy for the cell',
    grade: '10',
    subject: 'Life Sciences',
    marks: 1
  },
  {
    id: 'q5',
    question: 'What is the accounting equation?',
    options: ['Revenue = Expenses', 'Assets = Liabilities + Equity', 'Profit = Income - Costs', 'Capital + Liabilities'],
    correctAnswer: 1,
    explanation: 'The fundamental accounting equation is: Assets = Liabilities + Owner\'s Equity',
    grade: '10',
    subject: 'Accounting',
    marks: 2
  },
  {
    id: 'q6',
    question: 'Which force opposes motion between surfaces in contact?',
    options: ['Gravity', 'Friction', 'Magnetic force', 'Nuclear force'],
    correctAnswer: 1,
    explanation: 'Friction is the force that opposes relative motion between surfaces in contact',
    grade: '10',
    subject: 'Physical Sciences',
    marks: 1
  },
  {
    id: 'q7',
    question: 'What is the main function of red blood cells?',
    options: ['Fight infection', 'Carry oxygen', 'Blood clotting', 'Produce antibodies'],
    correctAnswer: 1,
    explanation: 'Red blood cells contain haemoglobin which transports oxygen from the lungs to body tissues',
    grade: '11',
    subject: 'Life Sciences',
    marks: 1
  },
  {
    id: 'q8',
    question: 'Solve for x: 2x + 5 = 13',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
    explanation: '2x + 5 = 13 → 2x = 8 → x = 4',
    grade: '10',
    subject: 'Mathematics',
    marks: 2
  },
  {
    id: 'q9',
    question: 'What does GDP stand for?',
    options: ['Gross Domestic Product', 'General Domestic Price', 'Government Debt Payment', 'Global Development Plan'],
    correctAnswer: 0,
    explanation: 'GDP = Gross Domestic Product, the total value of goods and services produced in a country',
    grade: '12',
    subject: 'Economics',
    marks: 1
  },
  {
    id: 'q10',
    question: 'What type of bond forms between Na (sodium) and Cl (chlorine)?',
    options: ['Covalent', 'Ionic', 'Metallic', 'Hydrogen'],
    correctAnswer: 1,
    explanation: 'NaCl forms an ionic bond as Na loses an electron to become Na+ and Cl gains it to become Cl-',
    grade: '10',
    subject: 'Physical Sciences',
    marks: 1
  },
  {
    id: 'q11',
    question: 'Who led the 1976 Soweto Uprising?',
    options: ['Nelson Mandela', 'Steve Biko', 'Hector Pieterson', 'Oliver Tambo'],
    correctAnswer: 2,
    explanation: 'Hector Pieterson became the symbol of the 1976 student uprising against Afrikaans medium education',
    grade: '12',
    subject: 'History',
    marks: 2
  },
  {
    id: 'q12',
    question: 'What is the reciprocal of tan θ?',
    options: ['sin θ', 'cos θ', 'cot θ', 'sec θ'],
    correctAnswer: 2,
    explanation: 'cot θ = 1/tan θ = cos θ/sin θ',
    grade: '11',
    subject: 'Mathematics',
    marks: 1
  }
];

const FORMULAS: FormulaFlashcard[] = [
  {
    id: 'f1',
    name: 'Quadratic Formula',
    formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    whenToUse: 'Use when you CANNOT factorise a quadratic equation (ax² + bx + c = 0)',
    grade: '11',
    subject: 'Mathematics'
  },
  {
    id: 'f2',
    name: 'Newton\'s Second Law',
    formula: 'F = ma',
    whenToUse: 'Use when calculating force, mass, or acceleration (F = m × a)',
    grade: '10',
    subject: 'Physical Sciences'
  },
  {
    id: 'f3',
    name: 'Simple Interest',
    formula: 'A = P(1 + rt)',
    whenToUse: 'Use for investments or loans where interest is calculated on the original principal only',
    grade: '10',
    subject: 'Mathematical Literacy'
  },
  {
    id: 'f4',
    name: 'Compound Interest',
    formula: 'A = P(1 + i)^n',
    whenToUse: 'Use when interest is calculated on BOTH principal AND accumulated interest',
    grade: '11',
    subject: 'Mathematics'
  },
  {
    id: 'f5',
    name: 'First Principles (Calculus)',
    formula: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
    whenToUse: 'Use to DERIVE a derivative from definition (always show this first in exam!)',
    grade: '12',
    subject: 'Mathematics'
  },
  {
    id: 'f6',
    name: 'SOH CAH TOA',
    formula: '\\sin \\theta = \\frac{opp}{hyp}, \\cos \\theta = \\frac{adj}{hyp}, \\tan \\theta = \\frac{opp}{adj}',
    whenToUse: 'Use in RIGHT-ANGLED triangles to find missing sides or angles',
    grade: '10',
    subject: 'Mathematics'
  },
  {
    id: 'f7',
    name: 'Momentum',
    formula: 'p = mv',
    whenToUse: 'Use when calculating momentum (p), mass (m), or velocity (v) - remember units!',
    grade: '11',
    subject: 'Physical Sciences'
  },
  {
    id: 'f8',
    name: 'Ohm\'s Law',
    formula: 'V = IR',
    whenToUse: 'Use in electric circuits to find Voltage (V), Current (I), or Resistance (R)',
    grade: '11',
    subject: 'Physical Sciences'
  },
  {
    id: 'f9',
    name: 'Kinetic Energy',
    formula: 'KE = \\frac{1}{2}mv^2',
    whenToUse: 'Use when calculating energy of motion - remember m in kg, v in m/s!',
    grade: '11',
    subject: 'Physical Sciences'
  },
  {
    id: 'f10',
    name: 'Accounting Equation',
    formula: 'A = L + OE',
    whenToUse: 'The foundation of ALL accounting - Assets ALWAYS equal Liabilities plus Owner\'s Equity',
    grade: '10',
    subject: 'Accounting'
  },
  {
    id: 'f11',
    name: 'Percentage Change',
    formula: '\\frac{\\text{New} - \\text{Old}}{\\text{Old}} \\times 100',
    whenToUse: 'Use to calculate percentage increase or decrease (mark allocation: usually 2 marks)',
    grade: '10',
    subject: 'Mathematical Literacy'
  },
  {
    id: 'f12',
    name: 'Sine Rule',
    formula: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}',
    whenToUse: 'Use for ANY triangle (not just right-angled) when you have 2 angles + 1 side OR 2 sides + opposite angle',
    grade: '11',
    subject: 'Mathematics'
  }
];

const WORDS: WordOfTheDay[] = [
  {
    id: 'w1',
    word: 'Analyze',
    definition: 'Examine in detail the structure or content of something to determine its meaning or importance',
    example: 'Analyze the graph and explain the trend shown.',
    subject: 'English'
  },
  {
    id: 'w2',
    word: 'Evaluate',
    definition: 'Form an opinion or judgment about the value or quality of something based on criteria',
    example: 'Evaluate the effectiveness of the marketing strategy.',
    subject: 'Business Studies'
  },
  {
    id: 'w3',
    word: 'Contrast',
    definition: 'To compare two or more things showing how they are different',
    example: 'Contrast the policies of the two leaders.',
    subject: 'History'
  },
  {
    id: 'w4',
    word: 'Derivative',
    definition: 'The rate of change of a function with respect to a variable (gradient of tangent)',
    example: 'Find the derivative of f(x) = x².',
    subject: 'Mathematics'
  },
  {
    id: 'w5',
    word: 'Momentum',
    definition: 'The quantity of motion of a moving body, measured as a product of its mass and velocity',
    example: 'Calculate the momentum of a 5kg object moving at 2m/s.',
    subject: 'Physical Sciences'
  },
  {
    id: 'w6',
    word: 'Osmosis',
    definition: 'The movement of water molecules from a region of lower solute concentration to higher concentration through a semi-permeable membrane',
    example: 'Explain the role of osmosis in plant cells.',
    subject: 'Life Sciences'
  },
  {
    id: 'w7',
    word: 'Liquidity',
    definition: 'The ease with which an asset can be converted into cash without affecting its market price',
    example: 'Calculate the current ratio to assess the company\'s liquidity.',
    subject: 'Accounting'
  },
  {
    id: 'w8',
    word: 'Elasticity',
    definition: 'The measure of how responsive quantity demanded/supplied is to changes in price or other factors',
    example: 'Calculate the price elasticity of demand.',
    subject: 'Economics'
  },
  {
    id: 'w9',
    word: 'Synthesis',
    definition: 'The combination of ideas into a connected whole, or the production of something by chemical reaction',
    example: 'Write the balanced equation for the synthesis of water.',
    subject: 'Physical Sciences'
  },
  {
    id: 'w10',
    word: 'Oxidation',
    definition: 'The loss of electrons or increase in oxidation state by a molecule, atom, or ion',
    example: 'Identify the oxidation agent in this redox reaction.',
    subject: 'Physical Sciences'
  },
  {
    id: 'w11',
    word: 'Homeostasis',
    definition: 'The tendency toward a relatively stable equilibrium between interdependent elements, especially as maintained by physiological processes',
    example: 'Explain how the body maintains blood glucose homeostasis.',
    subject: 'Life Sciences'
  },
  {
    id: 'w12',
    word: 'Equilibrium',
    definition: 'A state in which opposing forces or influences are balanced',
    example: 'At equilibrium, the rate of the forward reaction equals the rate of the reverse reaction.',
    subject: 'Physical Sciences'
  }
];

export const getDailyQuestion = (subject?: Subject, grade?: Grade): QuestionOfTheDay => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  let filtered = QUESTIONS;
  if (subject) filtered = filtered.filter(q => q.subject === subject);
  if (grade) filtered = filtered.filter(q => q.grade === grade);
  
  if (filtered.length === 0) filtered = QUESTIONS;
  return filtered[dayOfYear % filtered.length];
};

export const getDailyFormula = (subject?: Subject, grade?: Grade): FormulaFlashcard => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  let filtered = FORMULAS;
  if (subject) filtered = filtered.filter(f => f.subject === subject);
  if (grade) filtered = filtered.filter(f => f.grade === grade);
  
  if (filtered.length === 0) filtered = FORMULAS;
  return filtered[dayOfYear % filtered.length];
};

export const getDailyWord = (subject?: Subject): WordOfTheDay => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  let filtered = WORDS;
  if (subject) filtered = filtered.filter(w => w.subject === subject);
  
  if (filtered.length === 0) filtered = WORDS;
  return filtered[dayOfYear % filtered.length];
};
