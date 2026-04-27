import { CurriculumData, Topic, Grade, Subject } from '../types.ts';
import { injectMockResources } from './mockResources.ts';

const RAW_CURRICULUM_DATA: CurriculumData = {
  '12': {
    'Mathematics': [
      {
        id: 'm12-algebra',
        title: 'Algebraic Analysis',
        summary: "Focuses on variable behavior, cubic polynomials, and mastery of inverse functions. Essential for understanding calculus.",
        keyPoints: [
          "Factor Theorem: If f(c)=0, then (x-c) is a factor.",
          "Log Laws: Master log(A*B) = log A + log B.",
          "Inverse functions: Reflection over the line y=x."
        ],
        bigIdeaLink: { text: "Mind the Gap Guide", url: "https://www.education.gov.za" },
        resources: { 
          pastPapers: [
            { id: 'm12-p1-2023', title: 'Mathematics P1 2023 NSC', url: 'https://www.education.gov.za/LinkClick.aspx?fileticket=5J9_I6_6_0%3d&tabid=3473&portalid=0&mid=11340', year: '2023', fileSize: '1.2MB' },
            { id: 'm12-p2-2023', title: 'Mathematics P2 2023 NSC', url: 'https://www.education.gov.za/LinkClick.aspx?fileticket=XJ_I6_6_0%3d&tabid=3473&portalid=0&mid=11340', year: '2023', fileSize: '1.5MB' }
          ], 
          studyNotes: [
            { id: 'm12-mind-gap-calc', title: 'Mind the Gap: Calculus', url: 'https://www.education.gov.za/Portals/0/Documents/Publications/Mind%20the%20Gap/Maths%20Calculus%20Guide.pdf', year: '2022', fileSize: '3.4MB' }
          ], 
          videoTutorials: [
            { id: 'm12-vid-calc-1', title: 'Calculus First Principles', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', year: '2023', fileSize: '10 min' }
          ] 
        }
      },
      {
        id: 'm12-calculus',
        title: 'Differential Calculus',
        summary: "The study of rates of change. Master limits and derivatives to solve optimization problems.",
        keyPoints: [
          "First Principles formula: f'(x) = lim(h->0)...",
          "Power Rule: d/dx[x^n] = nx^(n-1)",
          "Turning points: Set the first derivative to zero."
        ],
        bigIdeaLink: { text: "Calculus Deep-Dive", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      },
      {
        id: 'm12-finance',
        title: 'Financial Mathematics',
        summary: "Applications of complex interest, depreciation, and investment calculations crucial for exams.",
        keyPoints: [
          "Compound Interest: A = P(1 + i)^n",
          "Future Value & Present Value formulas",
          "Depreciation: Straight-line vs Declining balance"
        ],
        bigIdeaLink: { text: "Finance Guide", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      },
      {
        id: 'm12-trig',
        title: 'Advanced Trigonometry',
        summary: "Trigonometric identities, equations, and 3D geometry applications.",
        keyPoints: [
          "Compound Angle Identities: sin(A±B), cos(A±B)",
          "Double Angle Formulas",
          "Solving Trig Equations in given intervals"
        ],
        bigIdeaLink: { text: "Trig Mastery", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      }
    ],
    'Mathematical Literacy': [
      {
        id: 'ml12-tax',
        title: 'Taxation & Income',
        summary: "Understanding SARS tax brackets, deductions, and net income calculations.",
        keyPoints: [
          "Tax brackets and percentage calculations",
          "Deductions: medical, pension, UIF",
          "Net salary = Gross - Tax - Deductions"
        ],
        bigIdeaLink: { text: "Tax Guide", url: "https://www.sars.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      },
      {
        id: 'ml12-banking',
        title: 'Banking & Interest',
        summary: "Managing personal finances, understanding compound vs simple interest.",
        keyPoints: [
          "Simple Interest: I = P × r × t",
          "Compound Interest applications",
          "Understanding loan amortizations"
        ],
        bigIdeaLink: { text: "Financial Guide", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      },
      {
        id: 'ml12-maps',
        title: 'Maps & Scale',
        summary: "Reading topographic maps, calculating distances, and understanding scale.",
        keyPoints: [
          "Scale conversion: Representative Fraction",
          "Distance calculation using scale",
          "Compass directions and map symbols"
        ],
        bigIdeaLink: { text: "Map Skills", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      }
    ],
    'Physical Sciences': [
      {
        id: 'ps12-mechanics',
        title: 'Newtonian Mechanics',
        summary: "Motion, forces, and energy. The foundation of Grade 12 Physics.",
        keyPoints: [
          "Newton's Laws: F = ma",
          "Momentum: p = mv",
          "Work-Energy Theorem: W = Fd cosθ"
        ],
        bigIdeaLink: { text: "Physics Mastery", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      },
      {
        id: 'ps12-electrostatics',
        title: 'Electrostatics & Electric Circuits',
        summary: "Understanding charge, electric fields, and circuit analysis.",
        keyPoints: [
          "Coulomb's Law: F = kq₁q₂/r²",
          "Ohm's Law: V = IR",
          "Series vs Parallel circuits"
        ],
        bigIdeaLink: { text: "Electricity Guide", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      },
      {
        id: 'ps12-optics',
        title: 'Optics & Light',
        summary: "Geometric optics, lenses, mirrors, and the wave nature of light.",
        keyPoints: [
          "Mirror Equation: 1/f = 1/do + 1/di",
          "Lens Equation: 1/f = 1/do + 1/di",
          "Total Internal Reflection"
        ],
        bigIdeaLink: { text: "Light & Optics", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      },
      {
        id: 'ps12-chemistry',
        title: 'Chemical Systems',
        summary: "Electrochemical cells, acids, bases, and organic chemistry.",
        keyPoints: [
          "Redox Reactions: Oxidation & Reduction",
          "pH Scale and indicators",
          "Functional groups in organic molecules"
        ],
        bigIdeaLink: { text: "Chemistry Guide", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      }
    ],
    'Life Sciences': [
      {
        id: 'ls12-dna',
        title: 'DNA & Genetics',
        summary: "Molecular genetics, protein synthesis, and inheritance patterns.",
        keyPoints: [
          "DNA Structure: Double Helix",
          "Replication & Transcription",
          "Mendel's Laws of Inheritance"
        ],
        bigIdeaLink: { text: "Genetics Guide", url: "https://www.education.gov.za" },
        resources: { 
          pastPapers: [
            { id: 'ls12-p1-2023', title: 'Life Sciences P1 2023 NSC', url: 'https://www.education.gov.za/LinkClick.aspx?fileticket=6J9_I6_6_0%3d&tabid=3473&portalid=0&mid=11340', year: '2023', fileSize: '1.8MB' },
            { id: 'ls12-p2-2023', title: 'Life Sciences P2 2023 NSC', url: 'https://www.education.gov.za/LinkClick.aspx?fileticket=5J9_I6_6_0%3d&tabid=3473&portalid=0&mid=11340', year: '2023', fileSize: '2.1MB' }
          ], 
          studyNotes: [
            { id: 'ls12-mind-gap-bio', title: 'Mind the Gap: Life Sciences', url: 'https://www.education.gov.za/Portals/0/Documents/Publications/Mind%20the%20Gap/Life%20Sciences%20Guide.pdf', year: '2022', fileSize: '5.2MB' }
          ], 
          videoTutorials: [] 
        }
      },
      {
        id: 'ls12-evolution',
        title: 'Evolution & Selection',
        summary: "Natural selection, speciation, and evidence for evolution.",
        keyPoints: [
          "Darwin's Theory of Natural Selection",
          "Evidence: Fossils, Comparative Anatomy",
          "Hardy-Weinberg Equilibrium"
        ],
        bigIdeaLink: { text: "Evolution Guide", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      },
      {
        id: 'ls12-ecosystems',
        title: 'Ecosystems & Biodiversity',
        summary: "Energy flow, nutrient cycling, and conservation.",
        keyPoints: [
          "Food Chains & Webs",
          "Biomes of South Africa",
          "Human Impact on Ecosystems"
        ],
        bigIdeaLink: { text: "Ecology Guide", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      }
    ],
    'Accounting': [
      {
        id: 'acc12-income-statement',
        title: 'Income Statements',
        summary: "Preparing Statement of Comprehensive Income for sole proprietors.",
        keyPoints: [
          "Revenue - Cost of Sales = Gross Profit",
          "Operating Expenses calculation",
          "Net Profit After Tax"
        ],
        bigIdeaLink: { text: "Accounting Basics", url: "https://www.education.gov.za" },
        resources: { 
          pastPapers: [
            { id: 'acc12-p1-2023', title: 'Accounting P1 2023 NSC', url: 'https://www.education.gov.za/LinkClick.aspx?fileticket=1J9_I6_6_0%3d&tabid=3473&portalid=0&mid=11340', year: '2023', fileSize: '1.1MB' }
          ],
          studyNotes: [
            { id: 'acc12-notes-fs', title: 'Accounting: Financial Statements Guide', url: 'https://www.education.gov.za/Portals/0/Documents/Publications/Mind%20the%20Gap/Accounting%20Statements.pdf', year: '2022', fileSize: '2.5MB' }
          ],
          videoTutorials: []
        }
      },
      {
        id: 'acc12-balance-sheet',
        title: 'Balance Sheet',
        summary: "Assets, liabilities, and owner's equity relationships.",
        keyPoints: [
          "Accounting Equation: A = L + OE",
          "Classifying Assets: Current vs Non-current",
          "Capital vs Drawings"
        ],
        bigIdeaLink: { text: "Balance Sheet Guide", url: "https://www.education.gov.za" },
        resources: { 
          pastPapers: [
            { id: 'acc12-p2-2023', title: 'Accounting P2 2023 NSC', url: 'https://www.education.gov.za/LinkClick.aspx?fileticket=2J9_I6_6_0%3d&tabid=3473&portalid=0&mid=11340', year: '2023', fileSize: '1.3MB' }
          ],
          studyNotes: [],
          videoTutorials: []
        }
      },
      {
        id: 'acc12-ratio',
        title: 'Financial Ratios',
        summary: "Analyzing business performance through ratio analysis.",
        keyPoints: [
          "Liquidity: Current Ratio",
          "Profitability: Net Profit Margin",
          "Solvency: Debt to Equity"
        ],
        bigIdeaLink: { text: "Ratio Analysis", url: "https://www.education.gov.za" },
        resources: { 
          pastPapers: [],
          studyNotes: [
            { id: 'acc12-notes-ratios', title: 'Ratio Analysis Masterclass', url: 'https://www.education.gov.za/Portals/0/Documents/Publications/Mind%20the%20Gap/Accounting%20Ratios.pdf', year: '2022', fileSize: '1.8MB' }
          ],
          videoTutorials: []
        }
      }
    ],
    'Geography': [
      {
        id: 'geo12-climate',
        title: 'Climate & Weather',
        summary: "Global and local climate patterns, weather systems affecting South Africa.",
        keyPoints: [
          "Ocean Currents & Atmospheric Circulation",
          "Cold Fronts & Warm Fronts",
          "South African Climate Regions"
        ],
        bigIdeaLink: { text: "Climate Guide", url: "https://www.education.gov.za" },
        resources: { 
          pastPapers: [
            { id: 'geo12-p1-2023', title: 'Geography P1 2023 NSC', url: 'https://www.education.gov.za/LinkClick.aspx?fileticket=3J9_I6_6_0%3d&tabid=3473&portalid=0&mid=11340', year: '2023', fileSize: '2.2MB' }
          ],
          studyNotes: [
            { id: 'geo12-notes-climate', title: 'Mind the Gap: Geography Climate', url: 'https://www.education.gov.za/Portals/0/Documents/Publications/Mind%20the%20Gap/Geography%20Climate.pdf', year: '2022', fileSize: '4.5MB' }
          ],
          videoTutorials: []
        }
      },
      {
        id: 'geo12-geomorphology',
        title: 'Geomorphology',
        summary: "Landforms, erosion processes, and geological structures.",
        keyPoints: [
          "Weathering: Chemical vs Physical",
          "River Landforms: V-shaped valleys, waterfalls",
          "Coastal Features: Dunes, beaches"
        ],
        bigIdeaLink: { text: "Landforms Guide", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      },
      {
        id: 'geo12-economic',
        title: 'Economic Geography',
        summary: "Global trade, development issues, and South African economic sectors.",
        keyPoints: [
          "Primary, Secondary, Tertiary sectors",
          "Trade Balances and Exchange Rates",
          "Sustainable Development Goals"
        ],
        bigIdeaLink: { text: "Economics Guide", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      }
    ],
    'Economics': [
      {
        id: 'ec12-macro',
        title: 'Macroeconomics',
        summary: "National economic indicators, GDP, inflation, and fiscal policy.",
        keyPoints: [
          "GDP Calculation methods",
          "Inflation: CPI measurement",
          "Monetary vs Fiscal Policy"
        ],
        bigIdeaLink: { text: "Macro Economics", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      },
      {
        id: 'ec12-markets',
        title: 'Market Structures',
        summary: "Perfect competition, monopoly, and oligopoly analysis.",
        keyPoints: [
          "Price elasticity of demand",
          "Perfect Competition characteristics",
          "Monopoly power and regulation"
        ],
        bigIdeaLink: { text: "Market Structures", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      }
    ],
    'Business Studies': [
      {
        id: 'bs12-marketing',
        title: 'Marketing',
        summary: "Marketing mix, consumer behavior, and market research.",
        keyPoints: [
          "4 Ps of Marketing: Product, Price, Place, Promotion",
          "Target Market identification",
          "SWOT Analysis"
        ],
        bigIdeaLink: { text: "Marketing Guide", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      },
      {
        id: 'bs12-management',
        title: 'Business Management',
        summary: "Management functions, leadership styles, and human resources.",
        keyPoints: [
          "Management: Planning, Organizing, Leading, Controlling",
          "Leadership Styles: Autocratic, Democratic, Laissez-faire",
          "Labour Relations Act basics"
        ],
        bigIdeaLink: { text: "Management Guide", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      }
    ],
    'History': [
      {
        id: 'hist12-cold-war',
        title: 'The Cold War',
        summary: "The origins of the Cold War, the arms race, and global spheres of influence.",
        keyPoints: [
          "Capitalism vs Communism ideology",
          "Truman Doctrine and Marshall Plan",
          "Cuban Missile Crisis"
        ],
        bigIdeaLink: { text: "Cold War Archive", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      },
      {
        id: 'hist12-civil-rights',
        title: 'Civil Rights Movement in the USA',
        summary: "The struggle for equality and the dismantling of segregation.",
        keyPoints: [
          "Martin Luther King Jr. and non-violent protests",
          "Brown vs Board of Education",
          "Montgomery Bus Boycott"
        ],
        bigIdeaLink: { text: "Civil Rights History", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      },
      {
        id: 'hist12-sa-struggle',
        title: 'South African Liberation',
        summary: "The struggle against apartheid and the road to democracy.",
        keyPoints: [
          "1948-1994: Apartheid Era",
          "Key Figures: Mandela, Tambo, Sobukwe",
          "1994: First Democratic Elections"
        ],
        bigIdeaLink: { text: "SA History", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      }
    ],
    'Information Technology': [
      {
        id: 'it12-oop',
        title: 'Object-Oriented Programming',
        summary: "Mastering encapsulation, inheritance, and polymorphism in Delphi/Java.",
        keyPoints: [
          "Classes vs Objects",
          "Constructors and Methods",
          "Data Encapsulation and visibility (private/public)"
        ],
        bigIdeaLink: { text: "OOP Crash Course", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      },
      {
        id: 'it12-db',
        title: 'Database Management & SQL',
        summary: "Relational database design, normalization, and executing SQL queries.",
        keyPoints: [
          "SELECT, INSERT, UPDATE, DELETE fundamentals",
          "Primary and Foreign Keys",
          "Normalization up to 3NF"
        ],
        bigIdeaLink: { text: "SQL Masterclass", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      }
    ],
    'English': [
      {
        id: 'eng12-literature',
        title: 'Literature Analysis',
        summary: "Analyzing poetry, prose, and drama for exams.",
        keyPoints: [
          "Poetry: Figurative language, tone, mood",
          "Prose: Theme, character, plot",
          "Drama: Stage directions, dialogue"
        ],
        bigIdeaLink: { text: "Literature Guide", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      },
      {
        id: 'eng12-essay',
        title: 'Essay Writing',
        summary: "Crafting compelling argumentative and descriptive essays.",
        keyPoints: [
          "Essay Structure: Introduction, Body, Conclusion",
          "Thesis statement development",
          "Transition words and coherence"
        ],
        bigIdeaLink: { text: "Essay Skills", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      }
    ],
    'Afrikaans': [
      {
        id: 'afk12-taal',
        title: 'Taalstrukture',
        summary: "Graammatika en taalwerk vir eksamen.",
        keyPoints: [
          "Woordsoorte: Selfstandige naamwoorde, byvoeglike naamwoorde",
          "Sinstruktuur: Onderwerp, predikaat, objek",
          "Direkte en indirekte rede"
        ],
        bigIdeaLink: { text: "Afrikaans Guide", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      }
    ]
  },
  '11': {
    'Mathematics': [
      {
      id: 'm11-quadratics',
      title: 'Quadratic Equations',
      summary: "Moving beyond basic factorizing into the quadratic formula and completing the square.",
      keyPoints: [
        "Quadratic Formula: x = [-b ± √(b² - 4ac)] / 2a",
        "Nature of Roots: Using the discriminant (Δ = b² - 4ac).",
        "Completing the Square: Essential for circle geometry."
      ],
      bigIdeaLink: { text: "G11 Quadratic Guide", url: "https://www.education.gov.za" },
      resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
    },
    {
      id: 'm11-exponential',
      title: 'Exponential Functions',
      summary: "Understanding growth and decay through exponential equations.",
      keyPoints: [
        "y = a × b^x form",
        "Logarithms: Inverse of exponential",
        "Solving exponential equations"
      ],
      bigIdeaLink: { text: "Exponentials Guide", url: "https://www.education.gov.za" },
      resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
    },
    {
      id: 'm11-trig',
      title: 'Trigonometry',
      summary: "Right-angle trigonometry, sine/cosine rules, and area rules.",
      keyPoints: [
        "SOH CAH TOA",
        "Sine Rule: a/sin A = b/sin B",
        "Area = ½ab sin C"
      ],
      bigIdeaLink: { text: "Trigonometry", url: "https://www.education.gov.za" },
      resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
    },
    {
      id: 'm11-analytical',
      title: 'Analytical Geometry',
      summary: "Coordinate geometry, distance formula, and equation of a circle.",
      keyPoints: [
        "Midpoint Formula: M = (x₁+x₂)/2, (y₁+y₂)/2",
        "Distance: √[(x₂-x₁)² + (y₂-y₁)²]",
        "Circle: (x-a)² + (y-b)² = r²"
      ],
      bigIdeaLink: { text: "Analytical Geo", url: "https://www.education.gov.za" },
      resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
    }
  ],
    'Mathematical Literacy': [
      {
        id: 'ml11-measurement',
        title: 'Measurement',
        summary: "Perimeter, area, volume, and conversions.",
        keyPoints: [
          "Area: Rectangle, Triangle, Circle",
          "Volume: Cube, Cylinder, Sphere",
          "Scale conversions"
        ],
        bigIdeaLink: { text: "Measurement Guide", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      },
      {
        id: 'ml11-data',
        title: 'Data Handling',
        summary: "Collecting, organizing, and interpreting data.",
        keyPoints: [
          "Mean, Median, Mode",
          "Bar graphs, Histograms, Pie charts",
          "Interpreting data critically"
        ],
        bigIdeaLink: { text: "Data Guide", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      }
    ],
      'Physical Sciences': [
        {
          id: 'ps11-vectors',
          title: 'Vectors & Scalars',
          summary: "Understanding motion in two dimensions.",
          keyPoints: [
            "Vector addition: Head-to-tail method",
            "Resolving vectors into components",
            "Relative velocity"
          ],
          bigIdeaLink: { text: "Vectors Guide", url: "https://www.education.gov.za" },
          resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
        },
        {
          id: 'ps11-momentum',
          title: 'Momentum & Impulse',
          summary: "Conservation of momentum and its applications.",
          keyPoints: [
            "Momentum: p = mv",
            "Impulse: J = FΔt",
            "Conservation of Momentum"
          ],
          bigIdeaLink: { text: "Momentum Guide", url: "https://www.education.gov.za" },
          resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
        },
        {
          id: 'ps11-chemical',
          title: 'Chemical Reactions',
          summary: "Chemical bonding, reactions, and stoichiometry.",
          keyPoints: [
            "ionic vs Covalent bonding",
            "Balancing Equations",
            "Mole concept: n = m/M"
          ],
          bigIdeaLink: { text: "Chemistry Basics", url: "https://www.education.gov.za" },
          resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
        }
      ],
        'Life Sciences': [
          {
            id: 'ls11-cells',
            title: 'Cell Structure',
            summary: "Cell biology, organelles, and cell processes.",
            keyPoints: [
              "Cell Organelles and functions",
              "Diffusion, Osmosis, Active Transport",
              "Photosynthesis equation"
            ],
            bigIdeaLink: { text: "Cell Biology", url: "https://www.education.gov.za" },
            resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
          },
          {
            id: 'ls11-energy',
            title: 'Energy & Ecosystems',
            summary: "Energy flow through ecosystems and food webs.",
            keyPoints: [
              "Photosynthesis & Respiration",
              "Energy pyramids",
              "Nutrient cycling: Carbon & Nitrogen"
            ],
            bigIdeaLink: { text: "Ecosystems", url: "https://www.education.gov.za" },
            resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
          }
        ],
          'Accounting': [
            {
              id: 'acc11-ledger',
              title: 'General Ledger',
              summary: "Posting transactions to the general ledger.",
              keyPoints: [
                "Double-entry principle",
                "Trial Balance preparation",
                "Classification of accounts"
              ],
              bigIdeaLink: { text: "Ledger Guide", url: "https://www.education.gov.za" },
              resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
            }
          ],
            'Geography': [
              {
                id: 'geo11-atmosphere',
                title: 'The Atmosphere',
                summary: "Atmospheric composition, pressure, and global circulation.",
                keyPoints: [
                  "High vs Low pressure systems",
                  "Global wind patterns",
                  "Weather vs Climate"
                ],
                bigIdeaLink: { text: "Atmosphere Guide", url: "https://www.education.gov.za" },
                resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
              },
              {
                id: 'geo11-fluvial',
                title: 'Fluvial Processes',
                summary: "River systems, erosion, and deposition.",
                keyPoints: [
                  "River profile: Youth, Mature, Old age",
                  "Erosion: Vertical vs Lateral",
                  "Deposition: Deltas, Floodplains"
                ],
                bigIdeaLink: { text: "Rivers Guide", url: "https://www.education.gov.za" },
                resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
              }
            ],
              'Economics': [
                {
                  id: 'ec11-demand',
                  title: 'Demand & Supply',
                  summary: "Market forces, elasticity, and equilibrium.",
                  keyPoints: [
                    "Law of Demand: Inverse relationship",
                    "Law of Supply: Direct relationship",
                    "Market Equilibrium"
                  ],
                  bigIdeaLink: { text: "Demand & Supply", url: "https://www.education.gov.za" },
                  resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
                }
              ],
                'Business Studies': [
                  {
                    id: 'bs11-enterprise',
                    title: 'Entrepreneurship',
                    summary: "Business opportunities, characteristics of entrepreneurs.",
                    keyPoints: [
                      "Characteristics of successful entrepreneurs",
                      "Business opportunities identification",
                      "Risk management"
                    ],
                    bigIdeaLink: { text: "Entrepreneurship", url: "https://www.education.gov.za" },
                    resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
                  }
                ],
                  'History': [
                    {
                      id: 'hist11-ww2',
                      title: 'World War II',
                      summary: "Causes, events, and consequences of WWII.",
                      keyPoints: [
                        "Causes: Treaty of Versailles, Great Depression",
                        "Major battles and turning points",
                        "Post-war: UN formation, Cold War beginnings"
                      ],
                      bigIdeaLink: { text: "WWII Guide", url: "https://www.education.gov.za" },
                      resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
                    }
                  ],
                    'English': [
                      {
                        id: 'eng11-poetry',
                        title: 'Poetry Analysis',
                        summary: "Understanding and analyzing poetry.",
                        keyPoints: [
                          "Figurative language: Simile, Metaphor, Personification",
                          "Poetic devices: Alliteration, Assonance",
                          "Analyzing tone and mood"
                        ],
                        bigIdeaLink: { text: "Poetry Guide", url: "https://www.education.gov.za" },
                        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
                      }
                    ],
                      'Afrikaans': [
                        {
                          id: 'afk11-opsommings',
                          title: 'Opsommings & Skryf',
                          summary: "Opsomming skills en kreatiewe skryfwerk.",
                          keyPoints: [
                            "Kort opsomming: Kernidees identifiseer",
                            "Paragraafskryf: Ondersteunende sinne",
                            "Koherensie en kohesie"
                          ],
                          bigIdeaLink: { text: "Skryf Guide", url: "https://www.education.gov.za" },
                          resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
                        }
                      ]
},
'10': {
  'Mathematics': [
    {
      id: 'm10-expressions',
      title: 'Algebraic Expressions',
      summary: "The foundation of all high school math. Master factorizing trinomials and difference of squares.",
      keyPoints: [
        "FOIL Method for expanding brackets.",
        "Factorizing trinomials like x² + bx + c.",
        "Simplifying algebraic fractions."
      ],
      bigIdeaLink: { text: "Math Foundations", url: "https://www.education.gov.za" },
      resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
    },
    {
      id: 'm10-functions',
      title: 'Functions & Graphs',
      summary: "Understanding the relationship between variables. Covers straight lines, parabolas, and hyperbolas.",
      keyPoints: [
        "Linear Function: y = mx + c",
        "Hyperbola Standard Form: y = a/x + q",
        "Effects of 'q': Shifting the graph vertically."
      ],
      bigIdeaLink: { text: "Graphs Intro", url: "https://www.education.gov.za" },
      resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
    },
    {
      id: 'm10-trig',
      title: 'Trigonometry',
      summary: "Introduction to Sin, Cos, and Tan in right-angled triangles.",
      keyPoints: [
        "SOH CAH TOA definitions.",
        "The Cartesian Plane and the CAST diagram.",
        "Solving basic trig equations."
      ],
      bigIdeaLink: { text: "Trig Intro", url: "https://www.education.gov.za" },
      resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
    },
    {
      id: 'm10-numbers',
      title: 'Number Patterns',
      summary: "Arithmetic and geometric sequences.",
      keyPoints: [
        "Arithmetic Sequence: a + (n-1)d",
        "Geometric Sequence: a × r^(n-1)",
        "Finding the nth term"
      ],
      bigIdeaLink: { text: "Sequences", url: "https://www.education.gov.za" },
      resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
    }
  ],
    'Mathematical Literacy': [
      {
        id: 'ml10-metric',
        title: 'Metric Measurements',
        summary: "Converting between units and calculating perimeter and area.",
        keyPoints: [
          "Length: mm, cm, m, km",
          "Area: cm², m², km²",
          "Perimeter: Adding all sides"
        ],
        bigIdeaLink: { text: "Measurements", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      },
      {
        id: 'ml10-finance',
        title: 'Financial Documents',
        summary: "Reading invoices, bank statements, and till slips.",
        keyPoints: [
          "Understanding invoices: Quantity × Unit Price",
          "Discounts and VAT calculations",
          "Budgeting basics"
        ],
        bigIdeaLink: { text: "Finance Basics", url: "https://www.education.gov.za" },
        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
      }
    ],
      'Physical Sciences': [
        {
          id: 'p10-matter',
          title: 'Matter & Materials',
          summary: "Understanding the building blocks of the universe. Covers the periodic table and chemical bonding.",
          keyPoints: [
            "Atomic Structure: Protons, Neutrons, and Electrons.",
            "Intramolecular Forces: Ionic vs Covalent vs Metallic.",
            "Physical vs Chemical changes."
          ],
          bigIdeaLink: { text: "Science Guide", url: "https://www.education.gov.za" },
          resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
        },
        {
          id: 'p10-chemical-change',
          title: 'Chemical Change',
          summary: "How substances react to form new products. Includes balancing equations and the Law of Conservation of Mass.",
          keyPoints: [
            "Balancing chemical equations.",
            "Types of reactions: Synthesis and Decomposition.",
            "Stoichiometry basics: Moles and Molar Mass."
          ],
          bigIdeaLink: { text: "Chemistry Basics", url: "https://www.education.gov.za" },
          resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
        },
        {
          id: 'p10-electrostatics',
          title: 'Electrostatics',
          summary: "The study of static electricity and the interaction between stationary charges.",
          keyPoints: [
            "Principle of conservation of charge.",
            "Principle of quantization of charge.",
            "Charging by contact and induction."
          ],
          bigIdeaLink: { text: "Electricity Basics", url: "https://www.education.gov.za" },
          resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
        },
        {
          id: 'p10-motion',
          title: 'Motion',
          summary: "Kinematics: describing motion in a straight line.",
          keyPoints: [
            "Distance vs Displacement",
            "Speed vs Velocity",
            "Acceleration: a = Δv/Δt"
          ],
          bigIdeaLink: { text: "Motion Guide", url: "https://www.education.gov.za" },
          resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
        }
      ],
        'Life Sciences': [
          {
            id: 'ls10-cells',
            title: 'The Cell',
            summary: "Introduction to cell structure and function.",
            keyPoints: [
              "Cell Theory: All living things are made of cells",
              "Prokaryotic vs Eukaryotic cells",
              "Cell Organelles: Nucleus, Mitochondria, Ribosomes"
            ],
            bigIdeaLink: { text: "Cell Intro", url: "https://www.education.gov.za" },
            resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
          },
          {
            id: 'ls10-systems',
            title: 'Human Systems',
            summary: "The skeletal, muscular, and digestive systems.",
            keyPoints: [
              "Skeletal System: Axial vs Appendicular",
              "Muscular System: Antagonistic pairs",
              "Digestive System: Mechanical vs Chemical digestion"
            ],
            bigIdeaLink: { text: "Human Body", url: "https://www.education.gov.za" },
            resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
          },
          {
            id: 'ls10-biodiversity',
            title: 'Biodiversity',
            summary: "Classification of living organisms and the five kingdoms.",
            keyPoints: [
              "Five Kingdoms: Monera, Protista, Fungi, Plantae, Animalia",
              "Vertebrates vs Invertebrates",
              "South African biodiversity"
            ],
            bigIdeaLink: { text: "Biodiversity", url: "https://www.education.gov.za" },
            resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
          }
        ],
          'Accounting': [
            {
              id: 'acc10-intro',
              title: 'Introduction to Accounting',
              summary: "Understanding accounting concepts and the accounting equation.",
              keyPoints: [
                "Accounting Equation: Assets = Liabilities + Equity",
                "Users of financial statements",
                "Basic accounting terms"
              ],
              bigIdeaLink: { text: "Accounting Intro", url: "https://www.education.gov.za" },
              resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
            },
            {
              id: 'acc10-transactions',
              title: 'Recording Transactions',
              summary: "Source documents and double-entry bookkeeping.",
              keyPoints: [
                "Source Documents: Invoice, Receipt, Deposit slip",
                "Debit vs Credit rules",
                "General Ledger accounts"
              ],
              bigIdeaLink: { text: "Transactions", url: "https://www.education.gov.za" },
              resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
            }
          ],
            'Geography': [
              {
                id: 'geo10-maps',
                title: 'Mapwork Skills',
                summary: "Reading topographic maps, compass directions, and scale.",
                keyPoints: [
                  "Compass directions: N, S, E, W, NE, NW, SE, SW",
                  "Scale: Word, Ratio, Linear",
                  "Map symbols and legend"
                ],
                bigIdeaLink: { text: "Map Skills", url: "https://www.education.gov.za" },
                resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
              },
              {
                id: 'geo10-climate',
                title: 'Climate & Weather',
                summary: "Understanding weather elements and climate zones.",
                keyPoints: [
                  "Weather elements: Temperature, Rainfall, Wind",
                  "Climate vs Weather",
                  "South African climate zones"
                ],
                bigIdeaLink: { text: "Climate Intro", url: "https://www.education.gov.za" },
                resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
              },
              {
                id: 'geo10-rivers',
                title: 'Fluvial Processes',
                summary: "Introduction to river systems and landforms.",
                keyPoints: [
                  "River profile: Youthful, Mature, Old age",
                  "Erosion types: Hydraulic, Abrasion",
                  "Deposition features"
                ],
                bigIdeaLink: { text: "Rivers", url: "https://www.education.gov.za" },
                resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
              }
            ],
              'Economics': [
                {
                  id: 'ec10-intro',
                  title: 'Introduction to Economics',
                  summary: "Basic economic concepts, scarcity, and opportunity cost.",
                  keyPoints: [
                    "Scarcity: Unlimited wants, Limited resources",
                    "Opportunity Cost: The next best alternative",
                    "Factors of Production: Land, Labour, Capital, Entrepreneurship"
                  ],
                  bigIdeaLink: { text: "Economics Intro", url: "https://www.education.gov.za" },
                  resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
                },
                {
                  id: 'ec10-circular',
                  title: 'Circular Flow',
                  summary: "The flow of goods, services, and money in the economy.",
                  keyPoints: [
                    "Households vs Firms",
                    "Factor Market vs Product Market",
                    "Government and Foreign sector"
                  ],
                  bigIdeaLink: { text: "Circular Flow", url: "https://www.education.gov.za" },
                  resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
                }
              ],
                'Business Studies': [
                  {
                    id: 'bs10-intro',
                    title: 'Introduction to Business',
                    summary: "Understanding business environments and objectives.",
                    keyPoints: [
                      "Business environment: Internal, External",
                      "Stakeholders: Owners, Employees, Suppliers, Customers",
                      "Business objectives: Profit, Growth, Survival"
                    ],
                    bigIdeaLink: { text: "Business Intro", url: "https://www.education.gov.za" },
                    resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
                  },
                  {
                    id: 'bs10-enterprise',
                    title: 'Entrepreneurship',
                    summary: "Characteristics of successful entrepreneurs.",
                    keyPoints: [
                      "Qualities: Creativity, Risk-taking, Leadership",
                      "Difference: Entrepreneur vs Employee",
                      "Business opportunities in SA"
                    ],
                    bigIdeaLink: { text: "Entrepreneurship", url: "https://www.education.gov.za" },
                    resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
                  }
                ],
                  'History': [
                    {
                      id: 'hist10-renaissance',
                      title: 'The Renaissance',
                      summary: "The rebirth of learning and ideas in Europe.",
                      keyPoints: [
                        "Causes: Fall of Constantinople, Printing press",
                        "Key figures: Da Vinci, Michelangelo, Shakespeare",
                        "Impact on science and art"
                      ],
                      bigIdeaLink: { text: "Renaissance", url: "https://www.education.gov.za" },
                      resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
                    },
                    {
                      id: 'hist10-colonialism',
                      title: 'Colonisation',
                      summary: "European expansion and its impact on Africa.",
                      keyPoints: [
                        "Scramble for Africa: Berlin Conference 1884",
                        "British and Dutch colonialism",
                        "Impact on indigenous societies"
                      ],
                      bigIdeaLink: { text: "Colonisation", url: "https://www.education.gov.za" },
                      resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
                    }
                  ],
                    'English': [
                      {
                        id: 'eng10-literacy',
                        title: 'Language & Literacy',
                        summary: "Building foundational language skills for academic success.",
                        keyPoints: [
                          "Parts of speech: Nouns, Verbs, Adjectives",
                          "Sentence types: Simple, Compound, Complex",
                          "Reading comprehension strategies"
                        ],
                        bigIdeaLink: { text: "Language Skills", url: "https://www.education.gov.za" },
                        resources: { 
                          pastPapers: [
                            { id: 'eng10-p1-2023', title: 'English HL P1 2023 Grade 10', url: 'https://www.education.gov.za/LinkClick.aspx?fileticket=7J9_I6_6_0%3d&tabid=3473&portalid=0&mid=11340', year: '2023', fileSize: '0.9MB' }
                          ],
                          studyNotes: [
                            { id: 'eng10-grammar-guide', title: 'English Grammar Master Guide', url: 'https://www.education.gov.za/Portals/0/Documents/Publications/Mind%20the%20Gap/English%20Grammar.pdf', year: '2022', fileSize: '3.1MB' }
                          ],
                          videoTutorials: []
                        }
                      },
                      {
                        id: 'eng10-writing',
                        title: 'Writing Skills',
                        summary: "Developing paragraph writing and basic essay structure.",
                        keyPoints: [
                          "Topic sentence and supporting details",
                          "Cohesion: Transition words",
                          "Formal vs Informal writing"
                        ],
                        bigIdeaLink: { text: "Writing Skills", url: "https://www.education.gov.za" },
                        resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
                      }
                    ],
                      'Afrikaans': [
                        {
                          id: 'afk10-taal',
                          title: 'Grondslagfase Taal',
                          summary: "Basiese Afrikaanse taalstrukture.",
                          keyPoints: [
                            "Woordsoorte: Selfstandige naamwoord, Werkwoord, Byvoeglike naamwoord",
                            "Sinne: Stelling, Vraag, Uitroep",
                            "Leesbegrip strategieë"
                          ],
                          bigIdeaLink: { text: "Afrikaans Basis", url: "https://www.education.gov.za" },
                          resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
                        },
                        {
                          id: 'afk10-skryf',
                          title: 'Skryfvaardighede',
                          summary: "Paragraaf- en briefskryf.",
                          keyPoints: [
                            "Paragraaf: Onderwerp sin + Ondersteunende sinne",
                            "Brief: Formeel vs Informeel",
                            "Koherensie in skryfwerk"
                          ],
                          bigIdeaLink: { text: "Skryfvaardighede", url: "https://www.education.gov.za" },
                          resources: { pastPapers: [], studyNotes: [], videoTutorials: [] }
                        }
                      ]
}
};

export const CURRICULUM_DATA: CurriculumData = {} as CurriculumData;

// Inject the mock resources into every topic so the app has content to show
for (const [grade, subjects] of Object.entries(RAW_CURRICULUM_DATA)) {
  CURRICULUM_DATA[grade as Grade] = {};
  for (const [subject, topics] of Object.entries(subjects)) {
    CURRICULUM_DATA[grade as Grade][subject as Subject] = topics.map(topic => injectMockResources(topic));
  }
}
