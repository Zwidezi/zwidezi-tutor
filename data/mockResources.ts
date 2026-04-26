import { Topic, Resource } from '../types.ts';

const pastPapers: Record<string, Resource[]> = {
  mathematics: [
    { id: 'math-p1-2023', title: 'Mathematics P1 Nov 2023', url: 'https://www.education.gov.za/Curriculum/AssessmentBankItems/2023Grade12NovemberPapers.aspx', year: '2023', fileSize: '2.4 MB' },
    { id: 'math-p1-2022', title: 'Mathematics P1 Nov 2022', url: 'https://www.education.gov.za/Curriculum/AssessmentBankItems/2022Grade12NovemberPapers.aspx', year: '2022', fileSize: '1.8 MB' },
    { id: 'math-p1-2021', title: 'Mathematics P1 Nov 2021', url: 'https://www.education.gov.za/Curriculum/AssessmentBankItems/2021Grade12NovemberPapers.aspx', year: '2021', fileSize: '2.1 MB' },
    { id: 'math-p2-2023', title: 'Mathematics P2 Nov 2023', url: 'https://www.education.gov.za/Curriculum/AssessmentBankItems/2023Grade12NovemberPapers.aspx', year: '2023', fileSize: '2.2 MB' },
    { id: 'math-p2-2022', title: 'Mathematics P2 Nov 2022', url: 'https://www.education.gov.za/Curriculum/AssessmentBankItems/2022Grade12NovemberPapers.aspx', year: '2022', fileSize: '2.0 MB' }
  ],
  physics: [
    { id: 'phys-p1-2023', title: 'Physical Sciences P1 Nov 2023', url: 'https://www.education.gov.za/Curriculum/AssessmentBankItems/2023Grade12NovemberPapers.aspx', year: '2023', fileSize: '3.1 MB' },
    { id: 'phys-p1-2022', title: 'Physical Sciences P1 Nov 2022', url: 'https://www.education.gov.za/Curriculum/AssessmentBankItems/2022Grade12NovemberPapers.aspx', year: '2022', fileSize: '2.8 MB' },
    { id: 'phys-p2-2023', title: 'Physical Sciences P2 (Chem) Nov 2023', url: 'https://www.education.gov.za/Curriculum/AssessmentBankItems/2023Grade12NovemberPapers.aspx', year: '2023', fileSize: '2.5 MB' }
  ],
  lifeSciences: [
    { id: 'life-p1-2023', title: 'Life Sciences P1 Nov 2023', url: 'https://www.education.gov.za/Curriculum/AssessmentBankItems/2023Grade12NovemberPapers.aspx', year: '2023', fileSize: '2.2 MB' },
    { id: 'life-p1-2022', title: 'Life Sciences P1 Nov 2022', url: 'https://www.education.gov.za/Curriculum/AssessmentBankItems/2022Grade12NovemberPapers.aspx', year: '2022', fileSize: '2.0 MB' },
    { id: 'life-p2-2023', title: 'Life Sciences P2 Nov 2023', url: 'https://www.education.gov.za/Curriculum/AssessmentBankItems/2023Grade12NovemberPapers.aspx', year: '2023', fileSize: '2.3 MB' }
  ],
  accounting: [
    { id: 'acc-p1-2023', title: 'Accounting P1 Nov 2023', url: 'https://www.education.gov.za/Curriculum/AssessmentBankItems/2023Grade12NovemberPapers.aspx', year: '2023', fileSize: '1.8 MB' },
    { id: 'acc-p1-2022', title: 'Accounting P1 Nov 2022', url: 'https://www.education.gov.za/Curriculum/AssessmentBankItems/2022Grade12NovemberPapers.aspx', year: '2022', fileSize: '1.6 MB' }
  ],
  geography: [
    { id: 'geo-p1-2023', title: 'Geography P1 Nov 2023', url: 'https://www.education.gov.za/Curriculum/AssessmentBankItems/2023Grade12NovemberPapers.aspx', year: '2023', fileSize: '4.5 MB' },
    { id: 'geo-p1-2022', title: 'Geography P1 Nov 2022', url: 'https://www.education.gov.za/Curriculum/AssessmentBankItems/2022Grade12NovemberPapers.aspx', year: '2022', fileSize: '4.2 MB' }
  ],
  economics: [
    { id: 'econ-p1-2023', title: 'Economics P1 Nov 2023', url: 'https://www.education.gov.za/Curriculum/AssessmentBankItems/2023Grade12NovemberPapers.aspx', year: '2023', fileSize: '1.9 MB' },
    { id: 'econ-p1-2022', title: 'Economics P1 Nov 2022', url: 'https://www.education.gov.za/Curriculum/AssessmentBankItems/2022Grade12NovemberPapers.aspx', year: '2022', fileSize: '1.7 MB' }
  ],
  default: [
    { id: 'gen-pp-1', title: 'Grade 12 Past Papers 2023', url: 'https://www.education.gov.za/Curriculum/AssessmentBankItems/2023Grade12NovemberPapers.aspx', year: '2023', fileSize: '2.5 MB' },
    { id: 'gen-pp-2', title: 'Grade 12 Past Papers 2022', url: 'https://www.education.gov.za/Curriculum/AssessmentBankItems/2022Grade12NovemberPapers.aspx', year: '2022', fileSize: '2.3 MB' }
  ]
};

const studyNotes: Record<string, Resource[]> = {
  calculus: [
    { id: 'calc-notes-1', title: 'Calculus Complete Summary', url: '#notes', year: '2024', fileSize: '0.8 MB', description: 'First Principles, Power Rule, Product Rule, Chain Rule, Integration basics' },
    { id: 'calc-notes-2', title: 'Exam Formula Sheet', url: '#notes', year: '2024', fileSize: '0.3 MB', description: 'All key calculus formulas for exams' }
  ],
  algebra: [
    { id: 'alg-notes-1', title: 'Algebra Summary', url: '#notes', year: '2024', fileSize: '0.6 MB', description: 'Factor Theorem, Log Laws, Inverse Functions' }
  ],
  finance: [
    { id: 'fin-notes-1', title: 'Financial Maths Cheat Sheet', url: '#notes', year: '2024', fileSize: '0.5 MB', description: 'Compound Interest, Present Value, Annuities, Depreciation' }
  ],
  trig: [
    { id: 'trig-notes-1', title: 'Trig Identities & Equations', url: '#notes', year: '2024', fileSize: '0.7 MB', description: 'Compound angles, Double angles, Identities, Special angles' }
  ],
  mechanics: [
    { id: 'mech-notes-1', title: 'Newton\'s Laws Summary', url: '#notes', year: '2024', fileSize: '0.6 MB', description: 'F=ma, Momentum, Work, Energy, Power' }
  ],
  electrostatics: [
    { id: 'elec-notes-1', title: 'Electricity & Circuits', url: '#notes', year: '2024', fileSize: '0.5 MB', description: 'Coulombs Law, Ohms Law, Series/Parallel circuits' }
  ],
  dna: [
    { id: 'dna-notes-1', title: 'Genetics Summary', url: '#notes', year: '2024', fileSize: '0.8 MB', description: 'DNA structure, Mendel laws, Protein synthesis' }
  ],
  ecosystems: [
    { id: 'eco-notes-1', title: 'Ecology Summary', url: '#notes', year: '2024', fileSize: '0.6 MB', description: 'Food chains, Energy flow, Biomes, Nutrient cycles' }
  ],
  accounting: [
    { id: 'acc-notes-1', title: 'Financial Statements Guide', url: '#notes', year: '2024', fileSize: '0.9 MB', description: 'Income Statement, Balance Sheet, Ratios' }
  ],
  default: [
    { id: 'gen-notes-1', title: 'CAPS Summary Notes', url: '#notes', year: '2024', fileSize: '0.4 MB', description: 'Key concepts for this topic' }
  ]
};

const videoTutorials: Record<string, Resource[]> = {
  calculus: [
    { id: 'vid-calc-1', title: 'Calculus: First Principles', url: 'https://www.youtube.com/embed/5y0k_P_hRTo', year: '2024', fileSize: 'N/A', description: 'Step-by-step guide to deriving functions using first principles.' },
    { id: 'vid-calc-2', title: 'Turning Points & Sketching', url: 'https://www.youtube.com/embed/Pzh3eO1_DqU', year: '2024', fileSize: 'N/A', description: 'How to find local maxima/minima and sketch cubic functions.' },
    { id: 'vid-calc-3', title: 'Area Under Curve', url: 'https://www.youtube.com/embed/fFZKjVXMwO0', year: '2024', fileSize: 'N/A', description: 'Introduction to integration and finding areas.' }
  ],
  algebra: [
    { id: 'vid-alg-1', title: 'Factor Theorem Explained', url: 'https://www.youtube.com/embed/Zs2qIj2zGwA', year: '2024', fileSize: 'N/A', description: 'Understanding the Factor Theorem with examples.' },
    { id: 'vid-alg-2', title: 'Logarithms Made Easy', url: 'https://www.youtube.com/embed/oeC7wW_qNqU', year: '2024', fileSize: 'N/A', description: 'Master log laws and solving exponential equations.' }
  ],
  trig: [
    { id: 'vid-trig-1', title: 'Trig Identities Proofs', url: 'https://www.youtube.com/embed/lVQc-jUjOaw', year: '2024', fileSize: 'N/A', description: 'Proving compound and double angle identities.' },
    { id: 'vid-trig-2', title: 'Solving Trig Equations', url: 'https://www.youtube.com/embed/VP3g3i7mqpk', year: '2024', fileSize: 'N/A', description: 'Methods for solving trig equations in different intervals.' }
  ],
  finance: [
    { id: 'vid-fin-1', title: 'Compound Interest', url: 'https://www.youtube.com/embed/6xQKk2VJ0hI', year: '2024', fileSize: 'N/A', description: 'Understanding compound interest calculations.' },
    { id: 'vid-fin-2', title: 'Annuities', url: 'https://www.youtube.com/embed/t0mUo59a7mQ', year: '2024', fileSize: 'N/A', description: 'Future and present value of annuities explained.' }
  ],
  mechanics: [
    { id: 'vid-mech-1', title: 'Newton\'s Second Law', url: 'https://www.youtube.com/embed/WzvhuQ5RWJE', year: '2024', fileSize: 'N/A', description: 'Understanding F=ma with exam examples.' },
    { id: 'vid-mech-2', title: 'Work, Energy & Power', url: 'https://www.youtube.com/embed/9Bv_3f5b720', year: '2024', fileSize: 'N/A', description: 'Applying the Work-Energy theorem.' },
    { id: 'vid-mech-3', title: 'Momentum & Impulse', url: 'https://www.youtube.com/embed/4W01l4xNUjY', year: '2024', fileSize: 'N/A', description: 'Conservation of momentum problems.' }
  ],
  electrostatics: [
    { id: 'vid-elec-1', title: 'Ohm\'s Law & Circuits', url: 'https://www.youtube.com/embed/PCR7XiT5Q3M', year: '2024', fileSize: 'N/A', description: 'Understanding series and parallel circuits.' },
    { id: 'vid-elec-2', title: 'Electrostatics', url: 'https://www.youtube.com/embed/x1-SibwIPq4', year: '2024', fileSize: 'N/A', description: 'Coulombs Law and electric fields.' }
  ],
  chemistry: [
    { id: 'vid-chem-1', title: 'Organic Chemistry', url: 'https://www.youtube.com/embed/U7wgLUPEto8', year: '2024', fileSize: 'N/A', description: 'IUPAC naming and functional groups.' },
    { id: 'vid-chem-2', title: 'Chemical Bonding', url: 'https://www.youtube.com/embed/sJv3kS3tQjI', year: '2024', fileSize: 'N/A', description: 'Ionic, covalent and metallic bonds.' }
  ],
  dna: [
    { id: 'vid-bio-1', title: 'DNA & Protein Synthesis', url: 'https://www.youtube.com/embed/8kK2zwjRV0M', year: '2024', fileSize: 'N/A', description: 'Comprehensive genetics overview.' },
    { id: 'vid-bio-2', title: 'Mitosis & Meiosis', url: 'https://www.youtube.com/embed/L0KU5YcNQVs', year: '2024', fileSize: 'N/A', description: 'Cell division explained.' }
  ],
  ecosystems: [
    { id: 'vid-eco-1', title: 'Energy Flow', url: 'https://www.youtube.com/embed/YYtygoR6W0M', year: '2024', fileSize: 'N/A', description: 'Food chains, webs and energy pyramids.' },
    { id: 'vid-eco-2', title: 'Biomes of SA', url: 'https://www.youtube.com/embed/LpCELgA7e9A', year: '2024', fileSize: 'N/A', description: 'South African biomes and biodiversity.' }
  ],
  history: [
    { id: 'vid-hist-1', title: 'Cold War Overview', url: 'https://www.youtube.com/embed/5r3el2ehalb', year: '2024', fileSize: 'N/A', description: 'Causes and events of the Cold War.' },
    { id: 'vid-hist-2', title: 'Apartheid Era', url: 'https://www.youtube.com/embed/hq9JJpWIyyo', year: '2024', fileSize: 'N/A', description: 'South African history 1948-1994.' }
  ],
  geography: [
    { id: 'vid-geo-1', title: 'Mapwork Skills', url: 'https://www.youtube.com/embed/4W01l4xNUjY', year: '2024', fileSize: 'N/A', description: 'Topographic map interpretation.' },
    { id: 'vid-geo-2', title: 'Climate & Weather', url: 'https://www.youtube.com/embed/DOyT0PbZ0wQ', year: '2024', fileSize: 'N/A', description: 'Atmospheric circulation and weather systems.' }
  ],
  business: [
    { id: 'vid-bus-1', title: 'Marketing 4Ps', url: 'https://www.youtube.com/embed/k3V9Bj1u9qM', year: '2024', fileSize: 'N/A', description: 'Understanding the marketing mix.' },
    { id: 'vid-bus-2', title: 'Financial Statements', url: 'https://www.youtube.com/embed/yqVgEqIJeIM', year: '2024', fileSize: 'N/A', description: 'Reading and analyzing financial statements.' }
  ],
  default: [
    { id: 'vid-gen-1', title: 'CAPS Topic Overview', url: 'https://www.youtube.com/embed/g2O2kVJBao8', year: '2024', fileSize: 'N/A', description: 'General overview of the topic for exam preparation.' }
  ]
};

const getResource = (title: string, type: 'pastPapers' | 'studyNotes' | 'videoTutorials'): Resource[] => {
  const t = title.toLowerCase();
  
  if (type === 'pastPapers') {
    if (t.includes('math')) return pastPapers.mathematics;
    if (t.includes('physics') || t.includes('mechanics') || t.includes('electro') || t.includes('optics')) return pastPapers.physics;
    if (t.includes('life') || t.includes('dna') || t.includes('evolution') || t.includes('cell')) return pastPapers.lifeSciences;
    if (t.includes('accounting')) return pastPapers.accounting;
    if (t.includes('geography') || t.includes('climate') || t.includes('geomorph')) return pastPapers.geography;
    if (t.includes('economics') || t.includes('demand') || t.includes('market')) return pastPapers.economics;
    return pastPapers.default;
  }
  
  if (type === 'studyNotes') {
    if (t.includes('calculus') || t.includes('different') || t.includes('integr')) return studyNotes.calculus;
    if (t.includes('algebra') || t.includes('factor') || t.includes('log')) return studyNotes.algebra;
    if (t.includes('finance') || t.includes('interest') || t.includes('depreciation')) return studyNotes.finance;
    if (t.includes('trig') || t.includes('geometry')) return studyNotes.trig;
    if (t.includes('mechanics') || t.includes('motion') || t.includes('newton') || t.includes('momentum') || t.includes('work') || t.includes('energy')) return studyNotes.mechanics;
    if (t.includes('electro') || t.includes('circuit') || t.includes('ohm')) return studyNotes.electrostatics;
    if (t.includes('dna') || t.includes('genetic') || t.includes('inherit')) return studyNotes.dna;
    if (t.includes('ecosystem') || t.includes('biodiversity') || t.includes('food') || t.includes('energy flow')) return studyNotes.ecosystems;
    if (t.includes('accounting') || t.includes('balance') || t.includes('income')) return studyNotes.accounting;
    return studyNotes.default;
  }
  
  if (type === 'videoTutorials') {
    if (t.includes('calculus') || t.includes('different') || t.includes('integr')) return videoTutorials.calculus;
    if (t.includes('algebra') || t.includes('factor') || t.includes('log')) return videoTutorials.algebra;
    if (t.includes('trig') || t.includes('geometry') || t.includes('angle')) return videoTutorials.trig;
    if (t.includes('finance') || t.includes('interest')) return videoTutorials.finance;
    if (t.includes('mechanics') || t.includes('motion') || t.includes('newton') || t.includes('momentum')) return videoTutorials.mechanics;
    if (t.includes('electro') || t.includes('circuit') || t.includes('ohm')) return videoTutorials.electrostatics;
    if (t.includes('chemistry') || t.includes('organic') || t.includes('bond')) return videoTutorials.chemistry;
    if (t.includes('dna') || t.includes('genetic') || t.includes('cell') || t.includes('mitosis')) return videoTutorials.dna;
    if (t.includes('ecosystem') || t.includes('biodiversity') || t.includes('food')) return videoTutorials.ecosystems;
    if (t.includes('history') || t.includes('cold war') || t.includes('apartheid')) return videoTutorials.history;
    if (t.includes('geography') || t.includes('map') || t.includes('climate')) return videoTutorials.geography;
    if (t.includes('business') || t.includes('marketing') || t.includes('management')) return videoTutorials.business;
    return videoTutorials.default;
  }
  
  return [];
};

export const injectMockResources = (topic: Topic): Topic => {
  const title = topic.title;
  const modifiedTopic = { ...topic };
  
  modifiedTopic.resources = {
    pastPapers: getResource(title, 'pastPapers'),
    studyNotes: getResource(title, 'studyNotes'),
    videoTutorials: getResource(title, 'videoTutorials')
  };
  
  return modifiedTopic;
};
