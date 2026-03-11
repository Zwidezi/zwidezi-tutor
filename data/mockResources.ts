import { Topic } from '../types.ts';

// Helper to inject mock resources into an existing topic
export const injectMockResources = (topic: Topic): Topic => {
    // Common math/science topics get specific videos and pdfs
    const title = topic.title.toLowerCase();

    const modifiedTopic = { ...topic };

    if (title.includes('calculus')) {
        modifiedTopic.resources = {
            pastPapers: [
                { id: 'math-p1-2023', title: 'Mathematics P1 2023', url: 'https://pdfobject.com/pdf/sample.pdf', memoUrl: 'https://pdfobject.com/pdf/sample.pdf', year: '2023', fileSize: '2.4 MB' },
                { id: 'math-p1-2022', title: 'Mathematics P1 2022', url: 'https://pdfobject.com/pdf/sample.pdf', memoUrl: 'https://pdfobject.com/pdf/sample.pdf', year: '2022', fileSize: '1.8 MB' }
            ],
            studyNotes: [
                { id: 'calc-notes', title: 'First Principles Summary', url: 'https://pdfobject.com/pdf/sample.pdf', year: '2024', fileSize: '0.5 MB' }
            ],
            videoTutorials: [
                { id: 'vid-calc1', title: 'Calculus: First Principles', url: 'https://www.youtube.com/embed/5y0k_P_hRTo', year: '2023', fileSize: 'N/A', description: 'Step-by-step guide to deriving functions using first principles.' },
                { id: 'vid-calc2', title: 'Cubic Functions & Turning Points', url: 'https://www.youtube.com/embed/Pzh3eO1_DqU', year: '2023', fileSize: 'N/A', description: 'How to sketch cubic graphs and find local maxima/minima.' }
            ]
        };
    } else if (title.includes('mechanics') || title.includes('motion') || title.includes('momentum')) {
        modifiedTopic.resources = {
            pastPapers: [
                { id: 'phys-p1-2023', title: 'Physics P1 2023', url: 'https://pdfobject.com/pdf/sample.pdf', memoUrl: 'https://pdfobject.com/pdf/sample.pdf', year: '2023', fileSize: '3.1 MB' }
            ],
            studyNotes: [
                { id: 'mech-notes', title: 'Newton\'s Laws Cheatsheet', url: 'https://pdfobject.com/pdf/sample.pdf', year: '2024', fileSize: '1.2 MB' }
            ],
            videoTutorials: [
                { id: 'vid-mech1', title: 'Newton\'s Second Law Explained', url: 'https://www.youtube.com/embed/WzvhuQ5RWJE', year: '2022', fileSize: 'N/A', description: 'Understanding F=ma with exam-style inclined plane examples.' },
                { id: 'vid-mech2', title: 'Work, Energy & Power', url: 'https://www.youtube.com/embed/9Bv_3f5b720', year: '2022', fileSize: 'N/A', description: 'Applying the Work-Energy theorem to exam questions.' }
            ]
        };
    } else if (title.includes('trig') || title.includes('geometry')) {
        modifiedTopic.resources = {
            pastPapers: [
                { id: 'math-p2-2023', title: 'Mathematics P2 2023', url: 'https://pdfobject.com/pdf/sample.pdf', memoUrl: 'https://pdfobject.com/pdf/sample.pdf', year: '2023', fileSize: '2.8 MB' }
            ],
            studyNotes: [
                { id: 'trig-notes', title: 'Trig Identities & 3D Geometry', url: 'https://pdfobject.com/pdf/sample.pdf', year: '2024', fileSize: '0.8 MB' }
            ],
            videoTutorials: [
                { id: 'vid-trig1', title: 'Proving Trig Identities', url: 'https://www.youtube.com/embed/lVQc-jUjOaw', year: '2023', fileSize: 'N/A', description: 'Tricks and strategies for proving complex identities.' }
            ]
        };
    } else if (title.includes('life') || title.includes('dna') || title.includes('meiosis') || title.includes('reproduction')) {
        modifiedTopic.resources = {
            pastPapers: [
                { id: 'life-p1-2023', title: 'Life Sciences P1 2023', url: 'https://pdfobject.com/pdf/sample.pdf', memoUrl: 'https://pdfobject.com/pdf/sample.pdf', year: '2023', fileSize: '2.2 MB' }
            ],
            studyNotes: [
                { id: 'life-notes', title: 'Genetics Summary Notes', url: 'https://pdfobject.com/pdf/sample.pdf', year: '2024', fileSize: '1.2 MB' }
            ],
            videoTutorials: [
                { id: 'vid-life1', title: 'Understanding Life Sciences', url: 'https://www.youtube.com/embed/8kK2zwjRV0M', year: '2023', fileSize: 'N/A', description: 'A comprehensive crash course on genetics and DNA.' }
            ]
        };
    } else if (title.includes('accounting') || title.includes('companies') || title.includes('financial')) {
        modifiedTopic.resources = {
            pastPapers: [
                { id: 'acc-p1-2023', title: 'Accounting P1 2023', url: 'https://pdfobject.com/pdf/sample.pdf', memoUrl: 'https://pdfobject.com/pdf/sample.pdf', year: '2023', fileSize: '1.8 MB' }
            ],
            studyNotes: [
                { id: 'acc-notes', title: 'Cash Flow Statements Cheatsheet', url: 'https://pdfobject.com/pdf/sample.pdf', year: '2024', fileSize: '0.9 MB' }
            ],
            videoTutorials: [
                { id: 'vid-acc1', title: 'Mastering Financial Statements', url: 'https://www.youtube.com/embed/yqVgEqIJeIM', year: '2022', fileSize: 'N/A', description: 'How to build the Statement of Comprehensive Income.' }
            ]
        };
    } else if (title.includes('electro') || title.includes('chemistry')) {
        modifiedTopic.resources = {
            pastPapers: [
                { id: 'phys-p2-2023', title: 'Physical Sciences P2 (Chem) 2023', url: 'https://pdfobject.com/pdf/sample.pdf', memoUrl: 'https://pdfobject.com/pdf/sample.pdf', year: '2023', fileSize: '2.5 MB' }
            ],
            studyNotes: [
                { id: 'chem-notes', title: 'Organic Chemistry Rules', url: 'https://pdfobject.com/pdf/sample.pdf', year: '2024', fileSize: '1.5 MB' }
            ],
            videoTutorials: [
                { id: 'vid-chem1', title: 'Organic Chemistry Naming', url: 'https://www.youtube.com/embed/U7wgLUPEto8', year: '2023', fileSize: 'N/A', description: 'IUPAC naming conventions for organic molecules.' }
            ]
        };
    } else {
        // Generic fallback for other topics
        modifiedTopic.resources = {
            pastPapers: [
                { id: `gen-pp-${Date.now()}`, title: `${topic.title} Past Paper Extracts`, url: 'https://pdfobject.com/pdf/sample.pdf', year: '2022-2023', fileSize: '1.5 MB' }
            ],
            studyNotes: [
                { id: `gen-notes-${Date.now()}`, title: `${topic.title} Summary Notes`, url: 'https://pdfobject.com/pdf/sample.pdf', year: '2024', fileSize: '0.4 MB' }
            ],
            videoTutorials: [
                { id: `gen-vid-${Date.now()}`, title: `Mastering ${topic.title}`, url: 'https://www.youtube.com/embed/g2O2kVJBao8', year: '2023', fileSize: 'N/A', description: `A comprehensive overview of ${topic.title} for the CAPS curriculum.` }
            ]
        };
    }

    return modifiedTopic;
};
