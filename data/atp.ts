import { Grade, Subject } from '../types.ts';

export interface ATPWeek {
  week: number;
  term: number;
  topics: string[];
  assessment: string;
}

export interface ATPData {
  grade: Grade;
  subject: Subject;
  term1: ATPWeek[];
  term2: ATPWeek[];
  term3: ATPWeek[];
  term4: ATPWeek[];
}

export const ATP_CURRICULUM: ATPData[] = [
  {
    grade: '12',
    subject: 'Mathematics',
    term1: [
      { week: 1, term: 1, topics: ['Number patterns', 'Sequences and series'], assessment: 'Assignment' },
      { week: 2, term: 1, topics: ['Functions and graphs', 'Inverse functions'], assessment: 'Test' },
      { week: 3, term: 1, topics: ['Logarithms', 'Log laws'], assessment: 'Assignment' },
      { week: 4, term: 1, topics: ['Exponential functions', 'Growth and decay'], assessment: 'Test' },
      { week: 5, term: 1, topics: ['Finance mathematics', 'Compound interest'], assessment: 'Task' },
      { week: 6, term: 1, topics: ['Finance mathematics', 'Annuities'], assessment: 'Test' },
      { week: 7, term: 1, topics: ['Trigonometry', 'Compound angles'], assessment: 'Assignment' },
      { week: 8, term: 1, topics: ['Trigonometry', 'Double angle formulas'], assessment: 'Test' },
      { week: 9, term: 1, topics: ['Trigonometric equations'], assessment: 'Task' },
      { week: 10, term: 1, topics: ['Revision'], assessment: 'June Exam' }
    ],
    term2: [
      { week: 1, term: 2, topics: ['Analytical geometry', 'Lines and circles'], assessment: 'Assignment' },
      { week: 2, term: 2, topics: ['Equation of a circle'], assessment: 'Test' },
      { week: 3, term: 2, topics: ['Euclidean geometry', 'Circle geometry'], assessment: 'Assignment' },
      { week: 4, term: 2, topics: ['Theorems (chords, tangents)'], assessment: 'Test' },
      { week: 5, term: 2, topics: ['Euclidean geometry', 'Proportionality'], assessment: 'Task' },
      { week: 6, term: 2, topics: ['Statistics', 'Data representation'], assessment: 'Assignment' },
      { week: 7, term: 2, topics: ['Regression and correlation'], assessment: 'Test' },
      { week: 8, term: 2, topics: ['Probability', 'Counting principles'], assessment: 'Assignment' },
      { week: 9, term: 2, topics: ['Probability', 'Tree diagrams'], assessment: 'Test' },
      { week: 10, term: 2, topics: ['Revision'], assessment: 'Mid-year Exam' }
    ],
    term3: [
      { week: 1, term: 3, topics: ['Differentiation', 'First principles'], assessment: 'Assignment' },
      { week: 2, term: 3, topics: ['Rules of differentiation'], assessment: 'Test' },
      { week: 3, term: 3, topics: ['Tangents and normals'], assessment: 'Task' },
      { week: 4, term: 3, topics: ['Curve sketching', 'Turning points'], assessment: 'Test' },
      { week: 5, term: 3, topics: ['Applications of calculus', 'Optimisation'], assessment: 'Assignment' },
      { week: 6, term: 3, topics: ['Rate of change problems'], assessment: 'Test' },
      { week: 7, term: 3, topics: ['Integration', 'Anti-derivatives'], assessment: 'Assignment' },
      { week: 8, term: 3, topics: ['Area under curves'], assessment: 'Test' },
      { week: 9, term: 3, topics: ['Volume of solids'], assessment: 'Task' },
      { week: 10, term: 3, topics: ['Revision'], assessment: 'Trial Exam' }
    ],
    term4: [
      { week: 1, term: 4, topics: ['Exam technique', 'Past papers'], assessment: 'Task' },
      { week: 2, term: 4, topics: ['Complete past papers'], assessment: 'Task' },
      { week: 3, term: 4, topics: ['Complete past papers'], assessment: 'Task' },
      { week: 4, term: 4, topics: ['Remediation', 'Weak areas'], assessment: 'Task' },
      { week: 5, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 6, term: 4, topics: ['Final revision'], assessment: 'NSC Exam' }
    ]
  },
  {
    grade: '12',
    subject: 'Physical Sciences',
    term1: [
      { week: 1, term: 1, topics: ['Vectors in 2D'], assessment: 'Assignment' },
      { week: 2, term: 1, topics: ['Newton\'s laws', 'Force diagrams'], assessment: 'Test' },
      { week: 3, term: 1, topics: ['Newton\'s second law applications'], assessment: 'Assignment' },
      { week: 4, term: 1, topics: ['Momentum and impulse'], assessment: 'Test' },
      { week: 5, term: 1, topics: ['Conservation of momentum'], assessment: 'Task' },
      { week: 6, term: 1, topics: ['Work, energy and power'], assessment: 'Test' },
      { week: 7, term: 1, topics: ['Kinetic and potential energy'], assessment: 'Assignment' },
      { week: 8, term: 1, topics: ['Work-energy theorem'], assessment: 'Test' },
      { week: 9, term: 1, topics: ['Vertical motion'], assessment: 'Task' },
      { week: 10, term: 1, topics: ['Revision'], assessment: 'June Exam' }
    ],
    term2: [
      { week: 1, term: 2, topics: ['Electrostatics', 'Coulomb\'s law'], assessment: 'Assignment' },
      { week: 2, term: 2, topics: ['Electric fields'], assessment: 'Test' },
      { week: 3, term: 2, topics: ['Electric circuits', 'Ohm\'s law'], assessment: 'Assignment' },
      { week: 4, term: 2, topics: ['Series and parallel circuits'], assessment: 'Test' },
      { week: 5, term: 2, topics: ['Internal resistance'], assessment: 'Task' },
      { week: 6, term: 2, topics: ['Wave nature of light'], assessment: 'Test' },
      { week: 7, term: 2, topics: ['Sound waves'], assessment: 'Assignment' },
      { week: 8, term: 2, topics: ['Doppler effect'], assessment: 'Test' },
      { week: 9, term: 2, topics: ['Optics', 'Lenses'], assessment: 'Task' },
      { week: 10, term: 2, topics: ['Revision'], assessment: 'Mid-year Exam' }
    ],
    term3: [
      { week: 1, term: 3, topics: ['Matter', 'Chemical bonding'], assessment: 'Assignment' },
      { week: 2, term: 3, topics: ['Intermolecular forces'], assessment: 'Test' },
      { week: 3, term: 3, topics: ['Ideal gases'], assessment: 'Task' },
      { week: 4, term: 3, topics: ['Chemical reactions', 'Balancing equations'], assessment: 'Test' },
      { week: 5, term: 3, topics: ['Stoichiometry'], assessment: 'Assignment' },
      { week: 6, term: 3, topics: ['Redox reactions'], assessment: 'Test' },
      { week: 7, term: 3, topics: ['Electrochemical cells'], assessment: 'Assignment' },
      { week: 8, term: 3, topics: ['Electrolytic cells'], assessment: 'Test' },
      { week: 9, term: 3, topics: ['Chemical equilibrium'], assessment: 'Task' },
      { week: 10, term: 3, topics: ['Revision'], assessment: 'Trial Exam' }
    ],
    term4: [
      { week: 1, term: 4, topics: ['Acids and bases'], assessment: 'Task' },
      { week: 2, term: 4, topics: ['pH calculations'], assessment: 'Task' },
      { week: 3, term: 4, topics: ['Organic chemistry', 'Hydrocarbons'], assessment: 'Task' },
      { week: 4, term: 4, topics: ['Functional groups'], assessment: 'Task' },
      { week: 5, term: 4, topics: ['Polymers'], assessment: 'Task' },
      { week: 6, term: 4, topics: ['Final revision'], assessment: 'NSC Exam' }
    ]
  },
  {
    grade: '12',
    subject: 'Life Sciences',
    term1: [
      { week: 1, term: 1, topics: ['DNA structure', 'The double helix'], assessment: 'Assignment' },
      { week: 2, term: 1, topics: ['DNA replication'], assessment: 'Test' },
      { week: 3, term: 1, topics: ['Protein synthesis', 'Transcription'], assessment: 'Assignment' },
      { week: 4, term: 1, topics: ['Translation'], assessment: 'Test' },
      { week: 5, term: 1, topics: ['Genetic engineering'], assessment: 'Task' },
      { week: 6, term: 1, topics: ['Mitosis'], assessment: 'Test' },
      { week: 7, term: 1, topics: ['Meiosis'], assessment: 'Assignment' },
      { week: 8, term: 1, topics: ['Mendelian genetics'], assessment: 'Test' },
      { week: 9, term: 1, topics: ['Non-Mendelian genetics'], assessment: 'Task' },
      { week: 10, term: 1, topics: ['Revision'], assessment: 'June Exam' }
    ],
    term2: [
      { week: 1, term: 2, topics: ['Evolution', 'Origin of life'], assessment: 'Assignment' },
      { week: 2, term: 2, topics: ['Natural selection'], assessment: 'Test' },
      { week: 3, term: 2, topics: ['Evidence for evolution'], assessment: 'Assignment' },
      { week: 4, term: 2, topics: ['Speciation'], assessment: 'Test' },
      { week: 5, term: 2, topics: ['Human evolution'], assessment: 'Task' },
      { week: 6, term: 2, topics: ['Ecosystems', 'Energy flow'], assessment: 'Assignment' },
      { week: 7, term: 2, topics: ['Biomes'], assessment: 'Test' },
      { week: 8, term: 2, topics: ['Biodiversity'], assessment: 'Task' },
      { week: 9, term: 2, topics: ['Human impact on environment'], assessment: 'Task' },
      { week: 10, term: 2, topics: ['Revision'], assessment: 'Mid-year Exam' }
    ],
    term3: [
      { week: 1, term: 3, topics: ['Human impact', 'Pollution'], assessment: 'Assignment' },
      { week: 2, term: 3, topics: ['Conservation'], assessment: 'Test' },
      { week: 3, term: 3, topics: ['Population ecology'], assessment: 'Assignment' },
      { week: 4, term: 3, topics: ['Climate change'], assessment: 'Test' },
      { week: 5, term: 3, topics: ['Exams revision'], assessment: 'Task' },
      { week: 6, term: 3, topics: ['Past papers'], assessment: 'Task' },
      { week: 7, term: 3, topics: ['Past papers'], assessment: 'Task' },
      { week: 8, term: 3, topics: ['Trial exam'], assessment: 'Trial Exam' },
      { week: 9, term: 3, topics: ['Remediation'], assessment: 'Task' },
      { week: 10, term: 3, topics: ['Final revision'], assessment: 'Task' }
    ],
    term4: [
      { week: 1, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 2, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 3, term: 4, topics: ['Weak areas'], assessment: 'Task' },
      { week: 4, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 5, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 6, term: 4, topics: ['NSC Exam'], assessment: 'NSC Exam' }
    ]
  },
  {
    grade: '12',
    subject: 'Accounting',
    term1: [
      { week: 1, term: 1, topics: ['Company accounting', 'Share capital'], assessment: 'Assignment' },
      { week: 2, term: 1, topics: ['Issue of shares'], assessment: 'Test' },
      { week: 3, term: 1, topics: ['Repurchase of shares'], assessment: 'Task' },
      { week: 4, term: 1, topics: ['Debentures'], assessment: 'Test' },
      { week: 5, term: 1, topics: ['Income statement'], assessment: 'Assignment' },
      { week: 6, term: 1, topics: ['Balance sheet'], assessment: 'Test' },
      { week: 7, term: 1, topics: ['Cash flow statement'], assessment: 'Assignment' },
      { week: 8, term: 1, topics: ['Analysis and interpretation'], assessment: 'Test' },
      { week: 9, term: 1, topics: ['Ratio analysis'], assessment: 'Task' },
      { week: 10, term: 1, topics: ['Revision'], assessment: 'June Exam' }
    ],
    term2: [
      { week: 1, term: 2, topics: ['Value Added Tax'], assessment: 'Assignment' },
      { week: 2, term: 2, topics: ['VAT calculations'], assessment: 'Test' },
      { week: 3, term: 2, topics: ['Fixed assets', 'Depreciation'], assessment: 'Assignment' },
      { week: 4, term: 2, topics: ['Asset disposal'], assessment: 'Test' },
      { week: 5, term: 2, topics: ['Partnerships'], assessment: 'Task' },
      { week: 6, term: 2, topics: ['Partnership financial statements'], assessment: 'Test' },
      { week: 7, term: 2, topics: ['Reconciliation'], assessment: 'Assignment' },
      { week: 8, term: 2, topics: ['Ethics'], assessment: 'Test' },
      { week: 9, term: 2, topics: ['Revision'], assessment: 'Task' },
      { week: 10, term: 2, topics: ['Revision'], assessment: 'Mid-year Exam' }
    ],
    term3: [
      { week: 1, term: 3, topics: ['Budgeting'], assessment: 'Assignment' },
      { week: 2, term: 3, topics: ['Cash budgets'], assessment: 'Test' },
      { week: 3, term: 3, topics: ['Variance analysis'], assessment: 'Assignment' },
      { week: 4, term: 3, topics: ['Inventory systems'], assessment: 'Test' },
      { week: 5, term: 3, topics: ['Perpetual vs periodic'], assessment: 'Task' },
      { week: 6, term: 3, topics: ['Cost accounting'], assessment: 'Test' },
      { week: 7, term: 3, topics: ['Cost volume profit'], assessment: 'Assignment' },
      { week: 8, term: 3, topics: ['Break-even analysis'], assessment: 'Test' },
      { week: 9, term: 3, topics: ['Revision'], assessment: 'Trial Exam' },
      { week: 10, term: 3, topics: ['Revision'], assessment: 'Trial Exam' }
    ],
    term4: [
      { week: 1, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 2, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 3, term: 4, topics: ['Weak areas'], assessment: 'Task' },
      { week: 4, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 5, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 6, term: 4, topics: ['NSC Exam'], assessment: 'NSC Exam' }
    ]
  },
  {
    grade: '12',
    subject: 'Economics',
    term1: [
      { week: 1, term: 1, topics: ['Circular flow'], assessment: 'Assignment' },
      { week: 2, term: 1, topics: ['GDP and GNP'], assessment: 'Test' },
      { week: 3, term: 1, topics: ['Economic growth'], assessment: 'Assignment' },
      { week: 4, term: 1, topics: ['Business cycle'], assessment: 'Test' },
      { week: 5, term: 1, topics: ['Inflation'], assessment: 'Task' },
      { week: 6, term: 1, topics: ['Unemployment'], assessment: 'Test' },
      { week: 7, term: 1, topics: ['Poverty and inequality'], assessment: 'Assignment' },
      { week: 8, term: 1, topics: ['Macroeconomic objectives'], assessment: 'Test' },
      { week: 9, term: 1, topics: ['Fiscal policy'], assessment: 'Task' },
      { week: 10, term: 1, topics: ['Revision'], assessment: 'June Exam' }
    ],
    term2: [
      { week: 1, term: 2, topics: ['Monetary policy'], assessment: 'Assignment' },
      { week: 2, term: 2, topics: ['SARB and exchange rates'], assessment: 'Test' },
      { week: 3, term: 2, topics: ['International trade'], assessment: 'Assignment' },
      { week: 4, term: 2, topics: ['Balance of payments'], assessment: 'Test' },
      { week: 5, term: 2, topics: ['Globalisation'], assessment: 'Task' },
      { week: 6, term: 2, topics: ['Demand and supply'], assessment: 'Test' },
      { week: 7, term: 2, topics: ['Elasticity'], assessment: 'Assignment' },
      { week: 8, term: 2, topics: ['Cost and revenue'], assessment: 'Test' },
      { week: 9, term: 2, topics: ['Market structures'], assessment: 'Task' },
      { week: 10, term: 2, topics: ['Revision'], assessment: 'Mid-year Exam' }
    ],
    term3: [
      { week: 1, term: 3, topics: ['Perfect competition'], assessment: 'Assignment' },
      { week: 2, term: 3, topics: ['Monopoly'], assessment: 'Test' },
      { week: 3, term: 3, topics: ['Oligopoly'], assessment: 'Task' },
      { week: 4, term: 3, topics: ['Labour markets'], assessment: 'Test' },
      { week: 5, term: 3, topics: ['Economic development'], assessment: 'Assignment' },
      { week: 6, term: 3, topics: ['Rural and urban development'], assessment: 'Test' },
      { week: 7, term: 3, topics: ['Industrial development'], assessment: 'Task' },
      { week: 8, term: 3, topics: ['Revision'], assessment: 'Trial Exam' },
      { week: 9, term: 3, topics: ['Revision'], assessment: 'Trial Exam' },
      { week: 10, term: 3, topics: ['Final revision'], assessment: 'Task' }
    ],
    term4: [
      { week: 1, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 2, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 3, term: 4, topics: ['Weak areas'], assessment: 'Task' },
      { week: 4, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 5, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 6, term: 4, topics: ['NSC Exam'], assessment: 'NSC Exam' }
    ]
  },
  {
    grade: '12',
    subject: 'History',
    term1: [
      { week: 1, term: 1, topics: ['Cold War origins', 'Ideologies'], assessment: 'Assignment' },
      { week: 2, term: 1, topics: ['Truman Doctrine', 'Marshall Plan'], assessment: 'Test' },
      { week: 3, term: 1, topics: ['Berlin Blockade', 'NATO'], assessment: 'Assignment' },
      { week: 4, term: 1, topics: ['Korean War', 'Vietnam War'], assessment: 'Test' },
      { week: 5, term: 1, topics: ['Cuban Missile Crisis'], assessment: 'Task' },
      { week: 6, term: 1, topics: ['End of Cold War'], assessment: 'Test' },
      { week: 7, term: 1, topics: ['Civil rights movement'], assessment: 'Assignment' },
      { week: 8, term: 1, topics: ['Black Power movement'], assessment: 'Test' },
      { week: 9, term: 1, topics: ['Vietnam War impact'], assessment: 'Task' },
      { week: 10, term: 1, topics: ['Revision'], assessment: 'June Exam' }
    ],
    term2: [
      { week: 1, term: 2, topics: ['South Africa 1948-1960'], assessment: 'Assignment' },
      { week: 2, term: 2, topics: ['Apartheid legislation'], assessment: 'Test' },
      { week: 3, term: 2, topics: ['Resistance 1950s'], assessment: 'Assignment' },
      { week: 4, term: 2, topics: ['Sharpeville', 'PAC'], assessment: 'Test' },
      { week: 5, term: 2, topics: ['Soweto 1976'], assessment: 'Task' },
      { week: 6, term: 2, topics: ['Black Consciousness'], assessment: 'Test' },
      { week: 7, term: 2, topics: ['ANC underground'], assessment: 'Assignment' },
      { week: 8, term: 2, topics: ['Negotiations', '1994 elections'], assessment: 'Test' },
      { week: 9, term: 2, topics: ['Truth and Reconciliation'], assessment: 'Task' },
      { week: 10, term: 2, topics: ['Revision'], assessment: 'Mid-year Exam' }
    ],
    term3: [
      { week: 1, term: 3, topics: ['Post-1994 South Africa'], assessment: 'Assignment' },
      { week: 2, term: 3, topics: ['Reconstruction and Development'], assessment: 'Test' },
      { week: 3, term: 3, topics: ['Geopolitics', 'Africa'], assessment: 'Task' },
      { week: 4, term: 3, topics: ['China in Africa'], assessment: 'Test' },
      { week: 5, term: 3, topics: ['Middle East'], assessment: 'Assignment' },
      { week: 6, term: 3, topics: ['Israel-Palestine'], assessment: 'Test' },
      { week: 7, term: 3, topics: ['Revision'], assessment: 'Trial Exam' },
      { week: 8, term: 3, topics: ['Revision'], assessment: 'Trial Exam' },
      { week: 9, term: 3, topics: ['Final revision'], assessment: 'Task' },
      { week: 10, term: 3, topics: ['Final revision'], assessment: 'Task' }
    ],
    term4: [
      { week: 1, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 2, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 3, term: 4, topics: ['Weak areas'], assessment: 'Task' },
      { week: 4, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 5, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 6, term: 4, topics: ['NSC Exam'], assessment: 'NSC Exam' }
    ]
  },
  {
    grade: '11',
    subject: 'Mathematics',
    term1: [
      { week: 1, term: 1, topics: ['Algebraic expressions', 'Factorisation'], assessment: 'Assignment' },
      { week: 2, term: 1, topics: ['Exponent laws'], assessment: 'Test' },
      { week: 3, term: 1, topics: ['Number patterns'], assessment: 'Assignment' },
      { week: 4, term: 1, topics: ['Sequences'], assessment: 'Test' },
      { week: 5, term: 1, topics: ['Equations', 'Quadratic'], assessment: 'Task' },
      { week: 6, term: 1, topics: ['Quadratic formula'], assessment: 'Test' },
      { week: 7, term: 1, topics: ['Inequalities'], assessment: 'Assignment' },
      { week: 8, term: 1, topics: ['Finance'], assessment: 'Test' },
      { week: 9, term: 1, topics: ['Revision'], assessment: 'Task' },
      { week: 10, term: 1, topics: ['Revision'], assessment: 'June Exam' }
    ],
    term2: [
      { week: 1, term: 2, topics: ['Functions', 'Straight line'], assessment: 'Assignment' },
      { week: 2, term: 2, topics: ['Parabola'], assessment: 'Test' },
      { week: 3, term: 2, topics: ['Hyperbola'], assessment: 'Assignment' },
      { week: 4, term: 2, topics: ['Exponential'], assessment: 'Test' },
      { week: 5, term: 2, topics: ['Trigonometry', 'Right angle'], assessment: 'Task' },
      { week: 6, term: 2, topics: ['Trigonometric ratios'], assessment: 'Test' },
      { week: 7, term: 2, topics: ['Sine rule'], assessment: 'Assignment' },
      { week: 8, term: 2, topics: ['Area rule'], assessment: 'Test' },
      { week: 9, term: 2, topics: ['Revision'], assessment: 'Task' },
      { week: 10, term: 2, topics: ['Revision'], assessment: 'Mid-year Exam' }
    ],
    term3: [
      { week: 1, term: 3, topics: ['Analytical geometry'], assessment: 'Assignment' },
      { week: 2, term: 3, topics: ['Distance formula'], assessment: 'Test' },
      { week: 3, term: 3, topics: ['Euclidean geometry', 'Proofs'], assessment: 'Assignment' },
      { week: 4, term: 3, topics: ['Similar triangles'], assessment: 'Test' },
      { week: 5, term: 3, topics: ['Statistics'], assessment: 'Task' },
      { week: 6, term: 3, topics: ['Data representation'], assessment: 'Test' },
      { week: 7, term: 3, topics: ['Probability'], assessment: 'Assignment' },
      { week: 8, term: 3, topics: ['Tree diagrams'], assessment: 'Test' },
      { week: 9, term: 3, topics: ['Revision'], assessment: 'Task' },
      { week: 10, term: 3, topics: ['Revision'], assessment: 'Trial Exam' }
    ],
    term4: [
      { week: 1, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 2, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 3, term: 4, topics: ['Weak areas'], assessment: 'Task' },
      { week: 4, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 5, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 6, term: 4, topics: ['Final Exam'], assessment: 'Final Exam' }
    ]
  },
  {
    grade: '10',
    subject: 'Mathematics',
    term1: [
      { week: 1, term: 1, topics: ['Number systems'], assessment: 'Assignment' },
      { week: 2, term: 1, topics: ['Exponents'], assessment: 'Test' },
      { week: 3, term: 1, topics: ['Number patterns'], assessment: 'Assignment' },
      { week: 4, term: 1, topics: ['Algebraic expressions'], assessment: 'Test' },
      { week: 5, term: 1, topics: ['Factorisation'], assessment: 'Task' },
      { week: 6, term: 1, topics: ['Equations'], assessment: 'Test' },
      { week: 7, term: 1, topics: ['Linear equations'], assessment: 'Assignment' },
      { week: 8, term: 1, topics: ['Word problems'], assessment: 'Test' },
      { week: 9, term: 1, topics: ['Revision'], assessment: 'Task' },
      { week: 10, term: 1, topics: ['Revision'], assessment: 'June Exam' }
    ],
    term2: [
      { week: 1, term: 2, topics: ['Functions', 'Relations'], assessment: 'Assignment' },
      { week: 2, term: 2, topics: ['Linear functions'], assessment: 'Test' },
      { week: 3, term: 2, topics: ['Quadratic functions'], assessment: 'Assignment' },
      { week: 4, term: 2, topics: ['Graph sketching'], assessment: 'Test' },
      { week: 5, term: 2, topics: ['Trigonometry', 'Introduction'], assessment: 'Task' },
      { week: 6, term: 2, topics: ['SOH CAH TOA'], assessment: 'Test' },
      { week: 7, term: 2, topics: ['Trigonometric graphs'], assessment: 'Assignment' },
      { week: 8, term: 2, topics: ['Problem solving'], assessment: 'Test' },
      { week: 9, term: 2, topics: ['Revision'], assessment: 'Task' },
      { week: 10, term: 2, topics: ['Revision'], assessment: 'Mid-year Exam' }
    ],
    term3: [
      { week: 1, term: 3, topics: ['Geometry', 'Lines and angles'], assessment: 'Assignment' },
      { week: 2, term: 3, topics: ['Triangles'], assessment: 'Test' },
      { week: 3, term: 3, topics: ['Quadrilaterals'], assessment: 'Assignment' },
      { week: 4, term: 3, topics: ['Circles'], assessment: 'Test' },
      { week: 5, term: 3, topics: ['Constructions'], assessment: 'Task' },
      { week: 6, term: 3, topics: ['Measurement'], assessment: 'Test' },
      { week: 7, term: 3, topics: ['Area and volume'], assessment: 'Assignment' },
      { week: 8, term: 3, topics: ['Revision'], assessment: 'Test' },
      { week: 9, term: 3, topics: ['Revision'], assessment: 'Task' },
      { week: 10, term: 3, topics: ['Revision'], assessment: 'Trial Exam' }
    ],
    term4: [
      { week: 1, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 2, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 3, term: 4, topics: ['Weak areas'], assessment: 'Task' },
      { week: 4, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 5, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 6, term: 4, topics: ['Final Exam'], assessment: 'Final Exam' }
    ]
  },
  {
    grade: '10',
    subject: 'Physical Sciences',
    term1: [
      { week: 1, term: 1, topics: ['Matter', 'Classification'], assessment: 'Assignment' },
      { week: 2, term: 1, topics: ['States of matter'], assessment: 'Test' },
      { week: 3, term: 1, topics: ['Atomic structure'], assessment: 'Assignment' },
      { week: 4, term: 1, topics: ['Periodic table'], assessment: 'Test' },
      { week: 5, term: 1, topics: ['Chemical bonding'], assessment: 'Task' },
      { week: 6, term: 1, topics: ['Molecules'], assessment: 'Test' },
      { week: 7, term: 1, topics: ['Chemical reactions'], assessment: 'Assignment' },
      { week: 8, term: 1, topics: ['Balancing equations'], assessment: 'Test' },
      { week: 9, term: 1, topics: ['Revision'], assessment: 'Task' },
      { week: 10, term: 1, topics: ['Revision'], assessment: 'June Exam' }
    ],
    term2: [
      { week: 1, term: 2, topics: ['Vectors', 'Scalars'], assessment: 'Assignment' },
      { week: 2, term: 2, topics: ['Motion'], assessment: 'Test' },
      { week: 3, term: 2, topics: ['Velocity', 'Acceleration'], assessment: 'Assignment' },
      { week: 4, term: 2, topics: ['Equations of motion'], assessment: 'Test' },
      { week: 5, term: 2, topics: ['Graphs'], assessment: 'Task' },
      { week: 6, term: 2, topics: ['Forces'], assessment: 'Test' },
      { week: 7, term: 2, topics: ['Newton\'s laws'], assessment: 'Assignment' },
      { week: 8, term: 2, topics: ['Friction'], assessment: 'Test' },
      { week: 9, term: 2, topics: ['Revision'], assessment: 'Task' },
      { week: 10, term: 2, topics: ['Revision'], assessment: 'Mid-year Exam' }
    ],
    term3: [
      { week: 1, term: 3, topics: ['Electrostatics'], assessment: 'Assignment' },
      { week: 2, term: 3, topics: ['Electric circuits'], assessment: 'Test' },
      { week: 3, term: 3, topics: ['Current and voltage'], assessment: 'Assignment' },
      { week: 4, term: 3, topics: ['Resistance'], assessment: 'Test' },
      { week: 5, term: 3, topics: ['Waves'], assessment: 'Task' },
      { week: 6, term: 3, topics: ['Sound waves'], assessment: 'Test' },
      { week: 7, term: 3, topics: ['Light'], assessment: 'Assignment' },
      { week: 8, term: 3, topics: ['Electromagnetic radiation'], assessment: 'Test' },
      { week: 9, term: 3, topics: ['Revision'], assessment: 'Task' },
      { week: 10, term: 3, topics: ['Revision'], assessment: 'Trial Exam' }
    ],
    term4: [
      { week: 1, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 2, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 3, term: 4, topics: ['Weak areas'], assessment: 'Task' },
      { week: 4, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 5, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 6, term: 4, topics: ['Final Exam'], assessment: 'Final Exam' }
    ]
  },
  {
    grade: '10',
    subject: 'Life Sciences',
    term1: [
      { week: 1, term: 1, topics: ['Cell biology', 'Microscopy'], assessment: 'Assignment' },
      { week: 2, term: 1, topics: ['Cell structure'], assessment: 'Test' },
      { week: 3, term: 1, topics: ['Cell organelles'], assessment: 'Assignment' },
      { week: 4, term: 1, topics: ['Cell membrane'], assessment: 'Test' },
      { week: 5, term: 1, topics: ['Cell transport'], assessment: 'Task' },
      { week: 6, term: 1, topics: ['Diffusion'], assessment: 'Test' },
      { week: 7, term: 1, topics: ['Osmosis'], assessment: 'Assignment' },
      { week: 8, term: 1, topics: ['Active transport'], assessment: 'Test' },
      { week: 9, term: 1, topics: ['Revision'], assessment: 'Task' },
      { week: 10, term: 1, topics: ['Revision'], assessment: 'June Exam' }
    ],
    term2: [
      { week: 1, term: 2, topics: ['Matter', 'Chemistry of life'], assessment: 'Assignment' },
      { week: 2, term: 2, topics: ['Carbohydrates', 'Proteins'], assessment: 'Test' },
      { week: 3, term: 2, topics: ['Enzymes'], assessment: 'Assignment' },
      { week: 4, term: 2, topics: ['Photosynthesis'], assessment: 'Test' },
      { week: 5, term: 2, topics: ['Cellular respiration'], assessment: 'Task' },
      { week: 6, term: 2, topics: ['Energy systems'], assessment: 'Test' },
      { week: 7, term: 2, topics: ['Human systems', 'Digestion'], assessment: 'Assignment' },
      { week: 8, term: 2, topics: ['Circulation'], assessment: 'Test' },
      { week: 9, term: 2, topics: ['Revision'], assessment: 'Task' },
      { week: 10, term: 2, topics: ['Revision'], assessment: 'Mid-year Exam' }
    ],
    term3: [
      { week: 1, term: 3, topics: ['Human systems', 'Respiration'], assessment: 'Assignment' },
      { week: 2, term: 3, topics: ['Gas exchange'], assessment: 'Test' },
      { week: 3, term: 3, topics: ['Skeletal system'], assessment: 'Assignment' },
      { week: 4, term: 3, topics: ['Muscular system'], assessment: 'Test' },
      { week: 5, term: 3, topics: ['Excretion'], assessment: 'Task' },
      { week: 6, term: 3, topics: ['Homeostasis'], assessment: 'Test' },
      { week: 7, term: 3, topics: ['Reproduction'], assessment: 'Assignment' },
      { week: 8, term: 3, topics: ['Human development'], assessment: 'Test' },
      { week: 9, term: 3, topics: ['Revision'], assessment: 'Task' },
      { week: 10, term: 3, topics: ['Revision'], assessment: 'Trial Exam' }
    ],
    term4: [
      { week: 1, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 2, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 3, term: 4, topics: ['Weak areas'], assessment: 'Task' },
      { week: 4, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 5, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 6, term: 4, topics: ['Final Exam'], assessment: 'Final Exam' }
    ]
  },
  {
    grade: '10',
    subject: 'Geography',
    term1: [
      { week: 1, term: 1, topics: ['Mapwork skills'], assessment: 'Assignment' },
      { week: 2, term: 1, topics: ['Scale and direction'], assessment: 'Test' },
      { week: 3, term: 1, topics: ['Topographic maps'], assessment: 'Assignment' },
      { week: 4, term: 1, topics: ['Map symbols'], assessment: 'Test' },
      { week: 5, term: 1, topics: ['Contour patterns'], assessment: 'Task' },
      { week: 6, term: 1, topics: ['Climate', 'Weather'], assessment: 'Test' },
      { week: 7, term: 1, topics: ['Atmospheric circulation'], assessment: 'Assignment' },
      { week: 8, term: 1, topics: ['Ocean currents'], assessment: 'Test' },
      { week: 9, term: 1, topics: ['Revision'], assessment: 'Task' },
      { week: 10, term: 1, topics: ['Revision'], assessment: 'June Exam' }
    ],
    term2: [
      { week: 1, term: 2, topics: ['Geomorphology', 'Weathering'], assessment: 'Assignment' },
      { week: 2, term: 2, topics: ['River processes'], assessment: 'Test' },
      { week: 3, term: 2, topics: ['River landforms'], assessment: 'Assignment' },
      { week: 4, term: 2, topics: ['Erosion'], assessment: 'Test' },
      { week: 5, term: 2, topics: ['Mass movements'], assessment: 'Task' },
      { week: 6, term: 2, topics: ['Coastal processes'], assessment: 'Test' },
      { week: 7, term: 2, topics: ['Coastal landforms'], assessment: 'Assignment' },
      { week: 8, term: 2, topics: ['Revision'], assessment: 'Test' },
      { week: 9, term: 2, topics: ['Revision'], assessment: 'Task' },
      { week: 10, term: 2, topics: ['Revision'], assessment: 'Mid-year Exam' }
    ],
    term3: [
      { week: 1, term: 3, topics: ['Rural settlements'], assessment: 'Assignment' },
      { week: 2, term: 3, topics: ['Urban settlements'], assessment: 'Test' },
      { week: 3, term: 3, topics: ['Urbanisation'], assessment: 'Assignment' },
      { week: 4, term: 3, topics: ['Urban problems'], assessment: 'Test' },
      { week: 5, term: 3, topics: ['Economic activities'], assessment: 'Task' },
      { week: 6, term: 3, topics: ['Resources'], assessment: 'Test' },
      { week: 7, term: 3, topics: ['South Africa economy'], assessment: 'Assignment' },
      { week: 8, term: 3, topics: ['Revision'], assessment: 'Test' },
      { week: 9, term: 3, topics: ['Revision'], assessment: 'Task' },
      { week: 10, term: 3, topics: ['Revision'], assessment: 'Trial Exam' }
    ],
    term4: [
      { week: 1, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 2, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 3, term: 4, topics: ['Weak areas'], assessment: 'Task' },
      { week: 4, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 5, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 6, term: 4, topics: ['Final Exam'], assessment: 'Final Exam' }
    ]
  },
  {
    grade: '10',
    subject: 'English',
    term1: [
      { week: 1, term: 1, topics: ['Language structures'], assessment: 'Assignment' },
      { week: 2, term: 1, topics: ['Grammar'], assessment: 'Test' },
      { week: 3, term: 1, topics: ['Writing skills'], assessment: 'Assignment' },
      { week: 4, term: 1, topics: ['Essay writing'], assessment: 'Test' },
      { week: 5, term: 1, topics: ['Comprehension'], assessment: 'Task' },
      { week: 6, term: 1, topics: ['Poetry analysis'], assessment: 'Test' },
      { week: 7, term: 1, topics: ['Literature', 'Novel'], assessment: 'Assignment' },
      { week: 8, term: 1, topics: ['Drama'], assessment: 'Test' },
      { week: 9, term: 1, topics: ['Revision'], assessment: 'Task' },
      { week: 10, term: 1, topics: ['June Exam'], assessment: 'June Exam' }
    ],
    term2: [
      { week: 1, term: 2, topics: ['Advanced grammar'], assessment: 'Assignment' },
      { week: 2, term: 2, topics: ['Essay types'], assessment: 'Test' },
      { week: 3, term: 2, topics: ['Literature', 'Poetry'], assessment: 'Assignment' },
      { week: 4, term: 2, topics: ['Poetry analysis'], assessment: 'Test' },
      { week: 5, term: 2, topics: ['Transactional writing'], assessment: 'Task' },
      { week: 6, term: 2, topics: ['Visual literacy'], assessment: 'Test' },
      { week: 7, term: 2, topics: ['Summary writing'], assessment: 'Assignment' },
      { week: 8, term: 2, topics: ['Language use'], assessment: 'Test' },
      { week: 9, term: 2, topics: ['Revision'], assessment: 'Task' },
      { week: 10, term: 2, topics: ['Mid-year Exam'], assessment: 'Mid-year Exam' }
    ],
    term3: [
      { week: 1, term: 3, topics: ['Creative writing'], assessment: 'Assignment' },
      { week: 2, term: 3, topics: ['Essay structure'], assessment: 'Test' },
      { week: 3, term: 3, topics: ['Literature', 'Drama'], assessment: 'Assignment' },
      { week: 4, term: 3, topics: ['Drama analysis'], assessment: 'Test' },
      { week: 5, term: 3, topics: ['Language in advertising'], assessment: 'Task' },
      { week: 6, term: 3, topics: ['Media studies'], assessment: 'Test' },
      { week: 7, term: 3, topics: ['Revision'], assessment: 'Assignment' },
      { week: 8, term: 3, topics: ['Past papers'], assessment: 'Test' },
      { week: 9, term: 3, topics: ['Trial Exam'], assessment: 'Trial Exam' },
      { week: 10, term: 3, topics: ['Final revision'], assessment: 'Task' }
    ],
    term4: [
      { week: 1, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 2, term: 4, topics: ['Past papers'], assessment: 'Task' },
      { week: 3, term: 4, topics: ['Weak areas'], assessment: 'Task' },
      { week: 4, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 5, term: 4, topics: ['Final revision'], assessment: 'Task' },
      { week: 6, term: 4, topics: ['Final Exam'], assessment: 'Final Exam' }
    ]
  }
];

export const getCurrentWeekNumber = (): number => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 604800000;
  return Math.ceil((now.getTime() - start.getTime()) / oneWeek);
};

export const getCurrentTerm = (): number => {
  const month = new Date().getMonth() + 1;
  if (month >= 1 && month <= 3) return 1;
  if (month >= 4 && month <= 6) return 2;
  if (month >= 7 && month <= 9) return 3;
  return 4;
};

export const getATPForSubject = (grade: Grade, subject: Subject): ATPData | null => {
  return ATP_CURRICULUM.find(a => a.grade === grade && a.subject === subject) || null;
};

export const getATPForWeek = (grade: Grade, subject: Subject, term: number, week: number): ATPWeek | null => {
  const atp = getATPForSubject(grade, subject);
  if (!atp) return null;
  
  const termData = term === 1 ? atp.term1 : term === 2 ? atp.term2 : term === 3 ? atp.term3 : atp.term4;
  return termData.find(w => w.week === week) || null;
};
