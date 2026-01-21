
import { CurriculumData, Topic, Resource } from '../types';

// Central Resource Database mapping provided JSON structure to Topic format
export const CURRICULUM_DATA: CurriculumData = {
  '12': {
    'Mathematics': [
      {
        id: 'm12-gen',
        title: 'Core Resources',
        resources: {
          pastPapers: [
            { id: 'm12-pp23', title: '2023 Past Paper P1', url: 'https://www.education.gov.za/LinkClick.aspx?fileticket=math-p1-2023', year: '2023', fileSize: '1.4MB' }
          ],
          studyNotes: [
            { id: 'm12-guide', title: 'Mind the Gap Study Guide', url: 'https://www.education.gov.za/SelfStudyGuidesGrade10-12.aspx', year: '2024', fileSize: '5.2MB' }
          ],
          videoTutorials: []
        }
      }
    ],
    'Physical Sciences': [
      {
        id: 'p12-gen',
        title: 'Core Resources',
        resources: {
          pastPapers: [
            { id: 'p12-pp23-p1', title: 'Physics P1 2023', url: 'https://www.education.gov.za/LinkClick.aspx?fileticket=phys-p1-2023', year: '2023', fileSize: '1.8MB' },
            { id: 'p12-pp23-p2', title: 'Chemistry P2 2023', url: 'https://www.education.gov.za/LinkClick.aspx?fileticket=chem-p2-2023', year: '2023', fileSize: '1.6MB' }
          ],
          studyNotes: [
            { id: 'p12-guide', title: 'Physical Science Study Guide', url: 'https://www.education.gov.za/SelfStudyGuidesGrade10-12.aspx', year: '2024', fileSize: '4.8MB' }
          ],
          videoTutorials: []
        }
      }
    ],
    'Geography': [
      {
        id: 'g12-gen',
        title: 'Core Resources',
        resources: {
          pastPapers: [
            { id: 'g12-pp23', title: 'Geography P1 2023', url: 'https://www.education.gov.za/LinkClick.aspx?fileticket=geog-p1-2023', year: '2023', fileSize: '2.1MB' }
          ],
          studyNotes: [
            { id: 'g12-guide', title: 'Geography Study Guide', url: 'https://www.education.gov.za/SelfStudyGuidesGrade10-12.aspx', year: '2024', fileSize: '3.9MB' }
          ],
          videoTutorials: []
        }
      }
    ]
  },
  '11': {
    'Life Sciences': [
      {
        id: 'l11-gen',
        title: 'Core Resources',
        resources: {
          pastPapers: [],
          studyNotes: [
            { id: 'l11-notes', title: 'Grade 11 Life Sciences Notes', url: '#', year: '2024', fileSize: '3.1MB' },
            { id: 'l11-guide', title: 'Life Sciences Study Guide', url: 'https://www.education.gov.za/SelfStudyGuidesGrade10-12.aspx', year: '2024', fileSize: '4.2MB' }
          ],
          videoTutorials: []
        }
      }
    ],
    'Mathematics': [
       {
        id: 'm11-gen',
        title: 'Core Resources',
        resources: {
          pastPapers: [{ id: 'm11-pp23', title: '2023 Past Paper', url: '#', year: '2023', fileSize: '1.2MB' }],
          studyNotes: [{ id: 'm11-guide', title: 'Mathematics Study Guide', url: 'https://www.education.gov.za/SelfStudyGuidesGrade10-12.aspx', year: '2024', fileSize: '4.5MB' }],
          videoTutorials: []
        }
      }
    ]
  },
  '10': {
    'Mathematics': [
      {
        id: 'm10-gen',
        title: 'Core Resources',
        resources: {
          pastPapers: [{ id: 'm10-pp23', title: '2023 Past Paper', url: '#', year: '2023', fileSize: '1.1MB' }],
          studyNotes: [{ id: 'm10-guide', title: 'Mathematics Study Guide', url: 'https://www.education.gov.za/SelfStudyGuidesGrade10-12.aspx', year: '2024', fileSize: '3.8MB' }],
          videoTutorials: []
        }
      }
    ]
  }
};
