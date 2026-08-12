import type { InferredResumeSchema } from '@/types'

export const SAMPLE_RESUME: InferredResumeSchema = {
  header: {
    profilePicture: undefined,
    firstName: 'Alex',
    middleName: 'R.',
    lastName: 'Rivera',
    address: 'Madrid, Spain',
    mobileNumber: '+34 612 345 678',
    links: [
      { text: 'alexrivera.dev', url: 'https://alexrivera.dev', type: 'React' },
      { text: 'alex@alexrivera.dev', url: 'alex@alexrivera.dev', type: 'Mail' },
      {
        text: 'in/alexrivera',
        url: 'https://www.linkedin.com/in/alexrivera',
        type: 'LinkedIn'
      },
      {
        text: 'github.com/alexrivera',
        url: 'https://github.com/alexrivera',
        type: 'Github'
      }
    ]
  },
  summary:
    'Full-stack engineer with 7+ years of experience building fast, accessible web products. Comfortable owning features end to end, from design handoff to production metrics, and passionate about mentoring junior engineers.',
  experiences: [
    {
      companyName: 'Nimbus Labs',
      companyLogo: undefined,
      location: 'Madrid, Spain',
      locationType: 'Hybrid',
      roles: [
        {
          role: 'Senior Front-end Engineer',
          employmentType: 'Full-time',
          startDate: '2022-03-01',
          endDate: undefined,
          descriptions: [
            {
              description:
                'Led the migration of a legacy dashboard to React and TypeScript, cutting page load time by 40%.'
            },
            {
              description:
                'Introduced a component library used across three product teams, reducing duplicate UI code by 60%.'
            }
          ],
          skills: [
            { skill: 'React' },
            { skill: 'TypeScript' },
            { skill: 'Vite' }
          ]
        }
      ]
    },
    {
      companyName: 'Brightsoft',
      companyLogo: undefined,
      location: 'Seville, Spain',
      locationType: 'Remote',
      roles: [
        {
          role: 'Front-end Developer',
          employmentType: 'Full-time',
          startDate: '2019-06-01',
          endDate: '2022-02-28',
          descriptions: [
            {
              description:
                'Shipped customer-facing marketing and e-commerce sites used by over a million monthly visitors.'
            },
            {
              description:
                'Collaborated with designers to build a design system and accessibility review checklist.'
            }
          ],
          skills: [{ skill: 'JavaScript' }, { skill: 'Node.js' }]
        }
      ]
    }
  ],
  additionalSkills: [
    { skill: 'React' },
    { skill: 'TypeScript' },
    { skill: 'Node.js' },
    { skill: 'GraphQL' },
    { skill: 'Accessibility' }
  ],
  education: [
    {
      course: 'BSc Computer Science',
      schoolName: 'Universidad Politécnica de Madrid',
      schoolYear: '2014 – 2018',
      gpa: '3.7'
    }
  ],
  projects: [
    {
      name: 'Open-source resume builder',
      type: 'Open Source',
      link: {
        src: 'https://github.com/stonix26/react-pdf-resume',
        label: 'GitHub'
      },
      description:
        'A configurable resume generator that renders a styled PDF client-side with React and TypeScript.',
      techStack: [{ tech: 'React' }, { tech: 'Vite' }, { tech: 'react-pdf' }]
    }
  ],
  reference: [
    {
      name: 'Maria García',
      company: 'Nimbus Labs',
      role: 'Engineering Manager',
      contactNumber: '+34 600 123 456'
    }
  ]
}