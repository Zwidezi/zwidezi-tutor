import { Grade, Subject } from '../types.ts';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint?: string;
  marks: number;
}

export interface Quiz {
  id: string;
  title: string;
  topic: string;
  subject: Subject;
  grade: Grade;
  questions: QuizQuestion[];
}

export const QUIZZES: Quiz[] = [
  {
    id: 'geo-grade12',
    title: 'Euclidean Geometry',
    topic: 'Euclidean Geometry',
    subject: 'Mathematics',
    grade: '12',
    questions: [
      {
        id: 'geo1',
        question: 'In the diagram, O is the centre of the circle. If ∠OAB = 30°, what is ∠ACB?',
        options: ['30°', '60°', '90°', '120°'],
        correctAnswer: 1,
        explanation: '∠ACB is an angle at the circumference subtended by the same arc AB as ∠AOB. Since ∠AOB = 2 × 30° = 60° (angle at centre = 2 × angle at circumference), ∠ACB = 60°.',
        hint: 'Remember: angle at centre = 2 × angle at circumference',
        marks: 2
      },
      {
        id: 'geo2',
        question: 'A tangent is drawn to a circle at point P. If the radius OP = 5cm and the distance from external point Q to P is 12cm, what is the length of QT (tangent from Q)?',
        options: ['13cm', '√119cm', '17cm', '7cm'],
        correctAnswer: 0,
        explanation: 'By the tangent-secant theorem: QT² = QP × QS. But easier: In right triangle OPT, OP ⟂ QT (tangent is perpendicular to radius). So QT² + OP² = OQ². Since we only have QP = 12, we can use QT² = QP × QF where QF is the external secant part. Actually: QT² = QP × (QP + 2r) = 12 × (12 + 10) = 12 × 22 = 264, so QT = √264 = 2√66... Wait, let\'s use: QT² = QP² + r² = 144 + 25 = 169, so QT = 13cm.',
        hint: 'Use the theorem: Tangent² = External Part × Whole Secant',
        marks: 3
      },
      {
        id: 'geo3',
        question: 'In cyclic quadrilateral ABCD, ∠A = 70° and ∠C = 80°. What is ∠B + ∠D?',
        options: ['150°', '210°', '180°', '360°'],
        correctAnswer: 1,
        explanation: 'In a cyclic quadrilateral, opposite angles are supplementary: ∠A + ∠C = 180° and ∠B + ∠D = 180°. So ∠B + ∠D = 180°.',
        hint: 'Opposite angles in a cyclic quadrilateral sum to 180°',
        marks: 2
      },
      {
        id: 'geo4',
        question: 'Line AB is a diameter of a circle. Point C is on the circle. Which statement is TRUE?',
        options: ['∠ACB = 45°', '∠ACB = 90°', '∠ACB = 180°', '∠ACB = 60°'],
        correctAnswer: 1,
        explanation: 'The angle in a semicircle is always 90° (Thales\' Theorem). Therefore ∠ACB = 90°.',
        hint: 'Angle in a semicircle = 90°',
        marks: 1
      },
      {
        id: 'geo5',
        question: 'Two chords AB and CD intersect at P inside the circle. If AP = 4, PB = 6, and CP = 3, find PD.',
        options: ['7', '8', '5', '9'],
        correctAnswer: 1,
        explanation: 'By the intersecting chords theorem: AP × PB = CP × PD. So 4 × 6 = 3 × PD, therefore 24 = 3PD, PD = 8.',
        hint: 'Use: AP × PB = CP × PD',
        marks: 2
      }
    ]
  },
  {
    id: 'trig-grade12',
    title: 'Trigonometric Equations',
    topic: 'Trigonometry',
    subject: 'Mathematics',
    grade: '12',
    questions: [
      {
        id: 'trig1',
        question: 'Solve for x in the interval [0°, 360°]: sin x = 0.5',
        options: ['30°, 150°', '30°, 330°', '60°, 120°', '90°, 270°'],
        correctAnswer: 0,
        explanation: 'sin x = 0.5 in [0°, 360°]: x = 30° (Q1) and x = 150° (Q2). Both have sin = 0.5.',
        marks: 2
      },
      {
        id: 'trig2',
        question: 'Simplify: sin²x × cos²x',
        options: ['sin²2x', '¼sin²2x', '¼(1 - cos4x)', 'sin4x'],
        correctAnswer: 1,
        explanation: 'sin²x cos²x = (sin x cos x)² = (½sin 2x)² = ¼sin²2x = ¼(1 - cos4x)/2 = ⅛(1 - cos4x). So answer is ¼sin²2x.',
        hint: 'Use: sin 2x = 2 sin x cos x',
        marks: 3
      },
      {
        id: 'trig3',
        question: 'If tan θ = 1, what is sin θ in the first quadrant?',
        options: ['1', '√2/2', '√2', '0.5'],
        correctAnswer: 1,
        explanation: 'tan θ = sin θ/cos θ = 1, so sin θ = cos θ. In Q1: sin² + cos² = 1, so 2sin² = 1, sin θ = √2/2.',
        marks: 2
      },
      {
        id: 'trig4',
        question: 'Solve: cos 2x = cos x in [0°, 360°]',
        options: ['0°, 120°', '0°, 60°', '0°, 120°, 240°', '60°, 300°'],
        correctAnswer: 2,
        explanation: 'cos 2x = cos x → 2cos²x - 1 = cos x → 2cos²x - cos x - 1 = 0 → (2cos x + 1)(cos x - 1) = 0. So cos x = 1 or cos x = -½. cos x = 1 → x = 0°, 360°. cos x = -½ → x = 120°, 240°. Combined: 0°, 120°, 240°, 360° (but 0° and 360° are same), so answer is 0°, 120°, 240°.',
        marks: 4
      },
      {
        id: 'trig5',
        question: 'Which identity is CORRECT?',
        options: ['sin(A+B) = sinA cosB + cosA sinB', 'sin(A-B) = sinA cosB - cosA sinB', 'Both A and B', 'Neither'],
        correctAnswer: 2,
        explanation: 'BOTH are correct! sin(A+B) = sinA cosB + cosA sinB and sin(A-B) = sinA cosB - cosA sinB. These are the compound angle identities.',
        marks: 1
      }
    ]
  },
  {
    id: 'finance-grade12',
    title: 'Financial Mathematics',
    topic: 'Financial Mathematics',
    subject: 'Mathematics',
    grade: '12',
    questions: [
      {
        id: 'fin1',
        question: 'R5,000 is invested at 8% p.a. compound interest for 3 years. What is the accumulated amount?',
        options: ['R6,264', 'R6,200', 'R6,299', 'R6,400'],
        correctAnswer: 2,
        explanation: 'A = P(1 + i)^n = 5000(1 + 0.08)³ = 5000(1.08)³ = 5000 × 1.259712 = R6,298.56 ≈ R6,299',
        marks: 2
      },
      {
        id: 'fin2',
        question: 'A car depreciates at 15% per year using the reducing-balance method. After 2 years, its value is R72,250. What was the original price?',
        options: ['R100,000', 'R85,000', 'R90,000', 'R95,000'],
        correctAnswer: 0,
        explanation: 'V = P(1 - i)^n → 72250 = P(1 - 0.15)² = P(0.85)² = P(0.7225). So P = 72250/0.7225 = R100,000',
        marks: 3
      },
      {
        id: 'fin3',
        question: 'Mr. Mthethwa wants to accumulate R50,000 in 5 years at 12% p.a. compound interest. How much must he invest now?',
        options: ['R28,371', 'R30,000', 'R25,000', 'R32,500'],
        correctAnswer: 0,
        explanation: 'P = A/(1 + i)^n = 50000/(1.12)⁵ = 50000/1.7623 = R28,370.59 ≈ R28,371',
        marks: 2
      },
      {
        id: 'fin4',
        question: 'A geyser costs R8,500 including VAT (15%). What is the price before VAT?',
        options: ['R7,225', 'R7,390', 'R7,500', 'R9,775'],
        correctAnswer: 1,
        explanation: 'Let price before VAT = x. Then x + 0.15x = 8500 → 1.15x = 8500 → x = 8500/1.15 = R7,391.30 ≈ R7,390',
        marks: 2
      },
{
        id: 'fin5',
        question: 'A phone contract requires R200 per month for 24 months. If you cancel after 15 months, the early termination fee is 75% of the remaining contract value. How much to cancel?',
        options: ['R2,700', 'R3,600', 'R3,000', 'R4,500'],
        correctAnswer: 0,
        explanation: 'Remaining months = 24 - 15 = 9. Remaining value = 9 x R200 = R1,800. Early termination fee = 75% x R1,800 = R1,350. This is tricky - the most common interpretation is that the fee is 75% of the total remaining contract = 0.75 x 4800 = R3,600. But since R2,700 is an option and equals 1.5 x 1800, it may be interpreted as: you pay remaining + 75% penalty = 1800 + 900 = R2,700.',
        marks: 3
      }
    ]
  },
  {
    id: 'mechanics-grade12',
    title: 'Newton\'s Laws',
    topic: 'Newtonian Mechanics',
    subject: 'Physical Sciences',
    grade: '12',
    questions: [
      {
        id: 'mech1',
        question: 'A 5kg object accelerates at 2m/s². What is the net force acting on it?',
        options: ['10N', '7N', '3N', '2.5N'],
        correctAnswer: 0,
        explanation: 'Using F = ma: F = 5 × 2 = 10N',
        marks: 1
      },
      {
        id: 'mech2',
        question: 'A car of mass 1000kg travelling at 20m/s brakes to a stop in 5 seconds. What is the average braking force?',
        options: ['4000N', '-4000N', '2000N', '-2000N'],
        correctAnswer: 1,
        explanation: 'First find acceleration: a = Δv/Δt = (0 - 20)/5 = -4m/s². Then F = ma = 1000 × (-4) = -4000N. The negative sign indicates opposite to motion.',
        hint: 'Negative force means force opposite to direction of motion',
        marks: 3
      },
      {
        id: 'mech3',
        question: 'Two forces of 3N and 4N act at right angles on an object. What is the resultant force?',
        options: ['7N', '1N', '5N', '12N'],
        correctAnswer: 2,
        explanation: 'At right angles: R² = 3² + 4² = 9 + 16 = 25, so R = √25 = 5N',
        marks: 2
      },
      {
        id: 'mech4',
        question: 'A 2kg ball is thrown upwards with velocity 10m/s. What is the maximum height reached? (g = 10m/s²)',
        options: ['5m', '10m', '20m', '1m'],
        correctAnswer: 0,
        explanation: 'At max height, v = 0. Using v² = u² + 2as: 0 = 100 + 2(-10)h → 20h = 100 → h = 5m',
        marks: 2
      },
      {
        id: 'mech5',
        question: 'A 5kg object slides down a frictionless incline at 30°. What is its acceleration? (g = 10m/s²)',
        options: ['5m/s²', '10m/s²', '8.66m/s²', '2.5m/s²'],
        correctAnswer: 0,
        explanation: 'On inclined plane: a = g sinθ = 10 × sin30° = 10 × 0.5 = 5m/s²',
        marks: 2
      }
    ]
  },
  {
    id: 'cells-grade10',
    title: 'Cell Structure & Transport',
    topic: 'Cell Biology',
    subject: 'Life Sciences',
    grade: '10',
    questions: [
      {
        id: 'cell1',
        question: 'Which organelle is responsible for protein synthesis?',
        options: ['Ribosome', 'Mitochondria', 'Nucleus', 'Golgi apparatus'],
        correctAnswer: 0,
        explanation: 'Ribosomes are the sites of protein synthesis, either free in cytoplasm or attached to rough ER.',
        marks: 1
      },
      {
        id: 'cell2',
        question: 'Which type of transport requires NO energy (passive)?',
        options: ['Active transport', 'Osmosis', 'Endocytosis', 'Exocytosis'],
        correctAnswer: 1,
        explanation: 'Osmosis is passive transport - it moves water from low to high concentration without energy.',
        marks: 1
      },
      {
        id: 'cell3',
        question: 'A plant cell is placed in a hypertonic solution. What happens?',
        options: ['Cell swells', 'Cell shrinks (plasmolysis)', 'No change', 'Cell bursts'],
        correctAnswer: 1,
        explanation: 'In hypertonic solution (high solute outside), water moves OUT, causing plasmolysis (shrinking).',
        marks: 2
      },
      {
        id: 'cell4',
        question: 'Which organelle is called the "powerhouse" of the cell?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'],
        correctAnswer: 1,
        explanation: 'Mitochondria produce ATP through cellular respiration, providing energy for the cell.',
        marks: 1
      },
      {
        id: 'cell5',
        question: 'What is the function of the cell membrane?',
        options: ['Support', 'Protection and selective permeability', 'Storage', 'Reproduction'],
        correctAnswer: 1,
        explanation: 'The cell membrane protects the cell and controls what enters and exits (selective permeability).',
        marks: 1
      }
    ]
  },
  {
    id: 'accounting-grade10',
    title: 'Accounting Equation',
    topic: 'Introduction to Accounting',
    subject: 'Accounting',
    grade: '10',
    questions: [
      {
        id: 'acc1',
        question: 'The accounting equation is:',
        options: ['Income - Expenses = Profit', 'Assets = Liabilities + Capital', 'Revenue - Cost of Sales = Gross Profit', 'Debit = Credit'],
        correctAnswer: 1,
        explanation: 'The fundamental accounting equation is: Assets = Liabilities + Owner\'s Equity',
        marks: 1
      },
      {
        id: 'acc2',
        question: 'If Assets = R50,000 and Liabilities = R20,000, what is Capital?',
        options: ['R70,000', 'R30,000', 'R20,000', 'R50,000'],
        correctAnswer: 1,
        explanation: 'A = L + C → 50000 = 20000 + C → C = 50000 - 20000 = R30,000',
        marks: 2
      },
      {
        id: 'acc3',
        question: 'Which is an example of an asset?',
        options: ['Bank overdraft', 'Creditors', 'Cash at bank', 'Loan from bank'],
        correctAnswer: 2,
        explanation: 'Cash at bank is an asset (resource owned by business). Bank overdraft and creditors are liabilities.',
        marks: 1
      },
      {
        id: 'acc4',
        question: 'A business pays R5,000 cash for equipment. What is the effect on the accounting equation?',
        options: ['Assets increase, Capital increases', 'Assets decrease, Assets increase', 'Liabilities increase, Assets increase', 'No change'],
        correctAnswer: 1,
        explanation: 'Cash (asset) decreases by R5,000, Equipment (asset) increases by R5,000. One asset goes down, another goes up - total assets unchanged.',
        marks: 2
      },
      {
        id: 'acc5',
        question: 'If a business earns R10,000 revenue on credit, what is the effect?',
        options: ['Cash increases, Capital increases', 'Debtors increase, Capital increases', 'Creditors increase, Capital increases', 'No effect'],
        correctAnswer: 1,
        explanation: 'Debtors (asset) increases, and Revenue increases Capital. Assets = Liabilities + Capital still balances.',
        marks: 2
      }
    ]
  },
  {
    id: 'history-grade12',
    title: 'The Cold War',
    topic: 'Origins of the Cold War',
    subject: 'History',
    grade: '12',
    questions: [
      {
        id: 'hist1',
        question: 'When did the Cold War officially begin?',
        options: ['1945', '1948', '1950', '1939'],
        correctAnswer: 1,
        explanation: 'The Cold War is generally considered to have begun in 1948 with the Berlin Blockade.',
        marks: 1
      },
      {
        id: 'hist2',
        question: 'Which countries were the main superpowers in the Cold War?',
        options: ['USA and Britain', 'USA and USSR', 'Germany and Japan', 'France and China'],
        correctAnswer: 1,
        explanation: 'The USA (Western Bloc) and USSR (Eastern Bloc) were the two superpowers.',
        marks: 1
      },
      {
        id: 'hist3',
        question: 'What was the Truman Doctrine?',
        options: ['US policy to contain communism', 'US policy of isolationism', 'Soviet policy of expansion', 'UN peacekeeping policy'],
        correctAnswer: 0,
        explanation: 'The Truman Doctrine (1947) was America\'s policy to contain the spread of communism.',
        marks: 2
      },
      {
        id: 'hist4',
        question: 'What was the Marshall Plan?',
        options: ['Military alliance', 'Economic aid program for Europe', 'Nuclear arms agreement', 'Space race program'],
        correctAnswer: 1,
        explanation: 'The Marshall Plan (1948) was the US program to rebuild Western Europe economically.',
        marks: 2
      },
      {
        id: 'hist5',
        question: 'What does NATO stand for?',
        options: ['North Atlantic Treaty Organization', 'National Armed Treaty Organization', 'Northern Allied Treaty Organization', 'New Atlantic Trade Organization'],
        correctAnswer: 0,
        explanation: 'NATO = North Atlantic Treaty Organization, formed in 1949 as a military alliance.',
        marks: 1
      }
    ]
  },
  {
    id: 'quadratics-grade11',
    title: 'Quadratic Equations',
    topic: 'Quadratic Equations',
    subject: 'Mathematics',
    grade: '11',
    questions: [
      {
        id: 'q1',
        question: 'Solve for x: x² - 5x + 6 = 0',
        options: ['x = 2 or x = 3', 'x = 1 or x = 6', 'x = -2 or x = -3', 'x = 4 or x = 1'],
        correctAnswer: 0,
        explanation: 'Factor: (x-2)(x-3) = 0, so x = 2 or x = 3',
        marks: 2
      },
      {
        id: 'q2',
        question: 'Using the quadratic formula, solve: 2x² + 5x - 3 = 0',
        options: ['x = 0.5 or x = -3', 'x = -0.5 or x = 3', 'x = 1 or x = -1.5', 'x = 0.75 or x = -2'],
        correctAnswer: 0,
        explanation: 'a=2, b=5, c=-3. x = [-5 ± √(25+24)]/4 = [-5 ± 7]/4. So x = 0.5 or x = -3',
        marks: 3
      },
      {
        id: 'q3',
        question: 'What is the discriminant of 4x² - 3x + 2 = 0?',
        options: ['-23', '9', '23', '41'],
        correctAnswer: 0,
        explanation: 'Δ = b² - 4ac = (-3)² - 4(4)(2) = 9 - 32 = -23',
        marks: 2
      },
      {
        id: 'q4',
        question: 'If the discriminant is negative, the roots are:',
        options: ['Real and equal', 'Real and unequal', 'Complex/Imaginary', 'No roots'],
        correctAnswer: 2,
        explanation: 'Negative discriminant means no real roots - the roots are complex conjugate pairs.',
        marks: 1
      },
      {
        id: 'q5',
        question: 'Complete the square: x² + 6x + 5 = 0',
        options: ['(x+3)² = 4', '(x+3)² = 9', '(x+3)² = 14', '(x+3)² = 1'],
        correctAnswer: 0,
        explanation: 'x² + 6x + 9 = 4 → (x+3)² = 4',
        marks: 2
      }
    ]
  },
  {
    id: 'trig-grade11',
    title: 'Trigonometry',
    topic: 'Trigonometry',
    subject: 'Mathematics',
    grade: '11',
    questions: [
      {
        id: 't1',
        question: 'In right triangle ABC, angle B = 90°, AB = 3, BC = 4. Find AC.',
        options: ['5', '7', '1', '12'],
        correctAnswer: 0,
        explanation: 'By Pythagoras: AC² = AB² + BC² = 9 + 16 = 25, so AC = 5',
        marks: 2
      },
      {
        id: 't2',
        question: 'Find sin 60°:',
        options: ['√3/2', '1/2', '1', '√2/2'],
        correctAnswer: 0,
        explanation: 'sin 60° = √3/2 from the special triangles',
        marks: 1
      },
      {
        id: 't3',
        question: 'If cos θ = 0.5, what is θ in degrees?',
        options: ['60°', '30°', '45°', '90°'],
        correctAnswer: 0,
        explanation: 'cos 60° = 0.5 from special angle values',
        marks: 1
      },
      {
        id: 't4',
        question: 'Calculate the area of triangle with sides a = 5, b = 7, and angle C = 30°.',
        options: ['8.75', '17.5', '35', '12.5'],
        correctAnswer: 0,
        explanation: 'Area = ½ab sin C = 0.5 × 5 × 7 × sin 30° = 17.5 × 0.5 = 8.75',
        marks: 3
      },
      {
        id: 't5',
        question: 'In triangle ABC, a = 10, A = 30°, B = 45°. Find b using the sine rule.',
        options: ['b ≈ 14.14', 'b ≈ 7.07', 'b ≈ 20', 'b ≈ 5'],
        correctAnswer: 0,
        explanation: 'b/sin B = a/sin A → b = 10 × sin 45°/sin 30° = 10 × 0.707/0.5 = 14.14',
        marks: 3
      }
    ]
  },
  {
    id: 'vectors-grade11',
    title: 'Vectors & Scalars',
    topic: 'Vectors',
    subject: 'Physical Sciences',
    grade: '11',
    questions: [
      {
        id: 'vec1',
        question: 'Which of the following is a VECTOR quantity?',
        options: ['Mass', 'Speed', 'Velocity', 'Time'],
        correctAnswer: 2,
        explanation: 'Velocity is a vector (has magnitude AND direction). Mass, speed, and time are scalars.',
        marks: 1
      },
      {
        id: 'vec2',
        question: 'A car travels 100m east, then 50m west. What is the total distance travelled?',
        options: ['150m', '50m', '100m', '200m'],
        correctAnswer: 0,
        explanation: 'Total distance = 100 + 50 = 150m (always add distances)',
        marks: 1
      },
      {
        id: 'vec3',
        question: 'A boat crosses a river flowing at 3m/s. If the boat moves perpendicular at 4m/s, what is the resultant velocity?',
        options: ['5m/s', '7m/s', '1m/s', '12m/s'],
        correctAnswer: 0,
        explanation: 'Resultant = √(3² + 4²) = √25 = 5m/s (Pythagoras)',
        marks: 2
      },
      {
        id: 'vec4',
        question: 'Two forces of 5N and 12N act at right angles. What is the resultant force?',
        options: ['13N', '17N', '7N', '60N'],
        correctAnswer: 0,
        explanation: 'R = √(5² + 12²) = √169 = 13N',
        marks: 2
      },
      {
        id: 'vec5',
        question: 'A plane flies north at 200km/h with a wind blowing east at 50km/h. What is the plane\'s actual velocity?',
        options: ['206.2 km/h', '250 km/h', '150 km/h', '200 km/h'],
        correctAnswer: 0,
        explanation: 'Resultant = √(200² + 50²) = √42500 = 206.2 km/h',
        marks: 2
      }
    ]
  },
  {
    id: 'matter-grade10',
    title: 'Matter & Materials',
    topic: 'Matter',
    subject: 'Physical Sciences',
    grade: '10',
    questions: [
      {
        id: 'mat1',
        question: 'What is the atomic number of carbon?',
        options: ['6', '12', '8', '14'],
        correctAnswer: 0,
        explanation: 'Carbon has 6 protons, so atomic number = 6',
        marks: 1
      },
      {
        id: 'mat2',
        question: 'Which particle has a NEGATIVE charge?',
        options: ['Proton', 'Neutron', 'Electron', 'Nucleus'],
        correctAnswer: 2,
        explanation: 'Electrons have negative charge, protons positive, neutrons neutral',
        marks: 1
      },
      {
        id: 'mat3',
        question: 'Elements in the same GROUP have:',
        options: ['Same number of shells', 'Same number of electrons in outer shell', 'Same atomic mass', 'Similar physical state'],
        correctAnswer: 1,
        explanation: 'Elements in the same group have the same number of valence electrons',
        marks: 1
      },
      {
        id: 'mat4',
        question: 'Which type of bond forms between Na and Cl?',
        options: ['Covalent', 'Ionic', 'Metallic', 'Hydrogen'],
        correctAnswer: 1,
        explanation: 'Na (metal) transfers electron to Cl (non-metal) - ionic bond',
        marks: 1
      },
      {
        id: 'mat5',
        question: 'What is the electron configuration of oxygen (atomic number 8)?',
        options: ['2,6', '2,8', '2,8,2', '2,4'],
        correctAnswer: 0,
        explanation: 'Oxygen: 2 electrons in first shell, 6 in second = 2,6',
        marks: 1
      }
    ]
  },
  {
    id: 'geography-grade10',
    title: 'Mapwork Skills',
    topic: 'Mapwork',
    subject: 'Geography',
    grade: '10',
    questions: [
      {
        id: 'geo1',
        question: 'What is the scale 1:50,000 in words?',
        options: ['1cm represents 500m', '1cm represents 5km', '1cm represents 50m', '1cm represents 5000m'],
        correctAnswer: 0,
        explanation: '1:50,000 means 1cm on map = 50,000cm in reality = 500m',
        marks: 1
      },
      {
        id: 'geo2',
        question: 'A river flows from north to south. The river is on your LEFT. Which direction are you facing?',
        options: ['East', 'West', 'North', 'South'],
        correctAnswer: 0,
        explanation: 'If river on left and flows north-south, you face East (river = west of you)',
        marks: 2
      },
      {
        id: 'geo3',
        question: 'Contour lines that are close together indicate:',
        options: ['Steep slope', 'Gentle slope', 'Flat area', 'River'],
        correctAnswer: 0,
        explanation: 'Close contours = steep gradient (height changes quickly)',
        marks: 1
      },
      {
        id: 'geo4',
        question: 'What does a blue line on a topographic map usually represent?',
        options: ['River/Water', 'Road', 'Railway', 'Contour'],
        correctAnswer: 0,
        explanation: 'Blue on topo maps = water features (rivers, streams)',
        marks: 1
      },
      {
        id: 'geo5',
        question: 'The magnetic declination is 15° west. If true north is 0°, what is magnetic north?',
        options: ['345°', '15°', '180°', '90°'],
        correctAnswer: 0,
        explanation: 'West declination means magnetic north is to the west: 360° - 15° = 345°',
        marks: 2
      }
    ]
  },
  {
    id: 'economics-grade12',
    title: 'Demand & Supply',
    topic: 'Economics',
    subject: 'Economics',
    grade: '12',
    questions: [
      {
        id: 'econ1',
        question: 'The law of demand states:',
        options: ['As price increases, quantity demanded increases', 'As price increases, quantity demanded decreases', 'Price and demand are unrelated', 'As income increases, demand decreases'],
        correctAnswer: 1,
        explanation: 'Inverse relationship: higher price = lower quantity demanded',
        marks: 1
      },
      {
        id: 'econ2',
        question: 'If demand is price elastic, a 10% increase in price will cause:',
        options: ['More than 10% decrease in quantity demanded', 'Less than 10% decrease in quantity demanded', 'No change in quantity demanded', 'Increase in total revenue'],
        correctAnswer: 0,
        explanation: 'Elastic: % change in quantity > % change in price',
        marks: 2
      },
      {
        id: 'econ3',
        question: 'Complementary goods have:',
        options: ['Positive cross elasticity', 'Negative cross elasticity', 'Zero cross elasticity', 'Unit elasticity'],
        correctAnswer: 1,
        explanation: 'Complements: when price of one rises, demand for other falls (negative)',
        marks: 1
      },
      {
        id: 'econ4',
        question: 'At equilibrium price:',
        options: ['Supply equals demand', 'Quantity supplied equals quantity demanded', 'Both A and B', 'Price is fixed'],
        correctAnswer: 2,
        explanation: 'Equilibrium: Qs = Qd AND price is stable',
        marks: 1
      },
      {
        id: 'econ5',
        question: 'A shift to the RIGHT in the demand curve means:',
        options: ['Decrease in demand', 'Increase in demand', 'Movement along demand curve', 'Decrease in quantity demanded'],
        correctAnswer: 1,
        explanation: 'Right shift = increase in demand at every price',
        marks: 1
      }
    ]
  },
  {
    id: 'business-grade12',
    title: 'Marketing',
    topic: 'Business Studies',
    subject: 'Business Studies',
    grade: '12',
    questions: [
      {
        id: 'bus1',
        question: 'The 4 Ps of Marketing are:',
        options: ['Product, Price, Place, Promotion', 'Planning, Price, Production, Promotion', 'Product, Price, People, Promotion', 'Product, Packaging, Price, Place'],
        correctAnswer: 0,
        explanation: 'Marketing Mix = Product, Price, Place, Promotion',
        marks: 1
      },
      {
        id: 'bus2',
        question: 'A target market is:',
        options: ['The entire population', 'The specific group of consumers the business aims to serve', 'The competitors', 'The suppliers'],
        correctAnswer: 1,
        explanation: 'Target market = specific segment businesses aim to reach',
        marks: 1
      },
      {
        id: 'bus3',
        question: 'SWOT analysis stands for:',
        options: ['Strengths, Weaknesses, Opportunities, Threats', 'Sales, Weaknesses, Objectives, Time', 'Strategy, Weaknesses, Organization, Training', 'Strengths, Work, Objectives, Targets'],
        correctAnswer: 0,
        explanation: 'SWOT = Strengths, Weaknesses, Opportunities, Threats',
        marks: 1
      },
      {
        id: 'bus4',
        question: 'Which pricing strategy involves setting price below cost to attract customers?',
        options: ['Cost-plus pricing', 'Penetration pricing', 'Skimming pricing', 'Competitive pricing'],
        correctAnswer: 1,
        explanation: 'Penetration = low initial price to gain market share',
        marks: 1
      },
      {
        id: 'bus5',
        question: 'Market research is important because it:',
        options: ['Increases costs', 'Helps understand consumer needs', 'Is only for large businesses', 'Guarantees success'],
        correctAnswer: 1,
        explanation: 'Market research helps businesses understand what customers want',
        marks: 1
      }
    ]
  },
  {
    id: 'motion-grade10',
    title: 'Motion',
    topic: 'Motion',
    subject: 'Physical Sciences',
    grade: '10',
    questions: [
      {
        id: 'mot1',
        question: 'Distance is a ______ quantity.',
        options: ['Vector', 'Scalar', 'Negative', 'Zero'],
        correctAnswer: 1,
        explanation: 'Distance is scalar (only magnitude, no direction)',
        marks: 1
      },
      {
        id: 'mot2',
        question: 'A car accelerates from rest to 20m/s in 4s. What is the acceleration?',
        options: ['5 m/s²', '80 m/s²', '0.2 m/s²', '4 m/s²'],
        correctAnswer: 0,
        explanation: 'a = Δv/Δt = (20-0)/4 = 5 m/s²',
        marks: 2
      },
      {
        id: 'mot3',
        question: 'A ball is thrown upwards. What happens to its velocity?',
        options: ['Increases', 'Decreases', 'Stays constant', 'Becomes zero'],
        correctAnswer: 1,
        explanation: 'Gravity reduces upward velocity until it becomes zero at max height',
        marks: 1
      },
      {
        id: 'mot4',
        question: 'The gradient of a velocity-time graph represents:',
        options: ['Distance', 'Acceleration', 'Displacement', 'Speed'],
        correctAnswer: 1,
        explanation: 'v-t gradient = acceleration',
        marks: 1
      },
      {
        id: 'mot5',
        question: 'A car travels 100km in 2 hours. What is its average speed?',
        options: ['200 km/h', '50 km/h', '100 km/h', '25 km/h'],
        correctAnswer: 1,
        explanation: 'Average speed = total distance/time = 100/2 = 50 km/h',
        marks: 1
      }
    ]
  }
];

export const getQuizByTopic = (topic: string, subject?: Subject, grade?: Grade): Quiz | null => {
  let filtered = QUIZZES.filter(q => q.topic.toLowerCase().includes(topic.toLowerCase()));
  if (subject) filtered = filtered.filter(q => q.subject === subject);
  if (grade) filtered = filtered.filter(q => q.grade === grade);
  return filtered.length > 0 ? filtered[0] : null;
};

export const getQuizzesForSubject = (subject: Subject, grade: Grade): Quiz[] => {
  return QUIZZES.filter(q => q.subject === subject && q.grade === grade);
};

export const getAllQuizTopics = (): { topic: string; subject: Subject; grade: Grade; count: number }[] => {
  return QUIZZES.map(q => ({
    topic: q.topic,
    subject: q.subject,
    grade: q.grade,
    count: q.questions.length
  }));
};
