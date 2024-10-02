import type { EducationProps } from './components/atoms/Education'
import type { HeaderProps } from './components/atoms/Header'
import type { PortfolioProps } from './components/atoms/Portfolio'
import type { ExperienceProps } from './components/cells/Experience'

export interface Data {
  header: HeaderProps
  summary: string
  experiences: ExperienceProps[]
  education: EducationProps
  portfolio: PortfolioProps['links']
}

export const data: Data = {
  header: {
    firstName: 'Ruston',
    middleName: 'D.',
    lastName: 'Emperua',
    address: 'V.A. Seno St., Cubacub, Mandaue City, Cebu, Philippines',
    mobileNumber: '09499094740',
    links: [
      {
        text: 'rustonemperua26@gmail.com',
        url: 'mailto: rustonemperua26@gmail.com'
      },
      {
        text: 'https://github.com/stonix26',
        url: 'https://github.com/stonix26'
      },
      {
        text: 'https://utopia-components-docs.vercel.app',
        url: 'https://utopia-components-docs.vercel.app'
      }
    ]
  },
  summary:
    'Experienced Frontend Developer with over 7 years of professional experience, specializing in React and TypeScript for the past 3 years. Proficient in building and managing scalable UI components, optimizing web performance, and integrating front-end and back-end systems. Adept at working with modern frameworks like ReactJS, TailwindCSS, and NodeJS, with a strong foundation in full-stack development. Demonstrated expertise in delivering mobile-responsive, user-friendly web applications, and maintaining high code quality in collaborative environments.',
  experiences: [
    {
      companyName: 'Accountable.ph',
      companyLogo:
        'https://media.licdn.com/dms/image/v2/C4E0BAQGRZKCNzhZTrQ/company-logo_200_200/company-logo_200_200/0/1630598732094/accountableph_logo?e=1735776000&v=beta&t=GKXTEtO_mZPgRiJ4DcagI5_SG-aQ_7ArsbnamP7qWG0',
      location: 'London, England',
      locationType: 'Remote',
      roles: [
        {
          role: 'Full-stack Developer',
          employmentType: 'Full-time',
          startDate: '2024-07-15',
          descriptions: [
            'Migrating GatsbyJS marketing website to NextJS.',
            'Maintaining WordPress marketing site and accounting portal (Express.js & React.js).'
          ],
          skills: [
            'GatsbyJS',
            'Next.js',
            'Express.js',
            'React.js',
            'TypeScript',
            'WordPress'
          ]
        },
        {
          role: 'Full-stack Developer',
          employmentType: 'Part-time',
          startDate: '2023-06-12',
          endDate: '2024-07-12',
          descriptions: ['Managed CMS applications and posted content.'],
          skills: ['Front-End Development', 'GatsbyJS', 'React.js', 'WordPress']
        }
      ]
    },
    {
      companyName: 'DNA Micro Software Inc.',
      companyLogo:
        'https://media.licdn.com/dms/image/v2/C560BAQFiSuhnEU9Giw/company-logo_200_200/company-logo_200_200/0/1673238286771/dnamicrosoftwareinc_logo?e=1735776000&v=beta&t=GvwqVVOq_n-QZVp7nxZyRN80HyBNWByrz9RNnUmLIyI',
      location: 'St. Moritz Road, Gorordo Ave., Cebu City, Philippines',
      locationType: 'On-site',
      roles: {
        role: 'Software Engineer - UI',
        employmentType: 'Full-time',
        startDate: '2020-09-28',
        endDate: '2024-07-04',
        descriptions: [
          'Developed UI components using React, TypeScript, Tailwind CSS, and documented them with Storybook for testing.',
          'Managed monorepo using Turborepo for reusable components and published to a local private NPM registry with Verdaccio.',
          'Automated package versioning with changesets CLI.',
          'Integrated backend APIs to support front-end functionalities.',
          'Assisted the marketing team in maintaining old WordPress websites.'
        ],
        skills: [
          'React.js',
          'TypeScript',
          'JavaScript',
          'Tailwind CSS',
          'REST APIs',
          'Storybook'
        ]
      }
    },
    {
      companyName: 'Human IQ',
      location:
        'Unit 602, 6th Floor, Ayala Life - FGU Building, Cebu Business Park, Cebu City, Philippines',
      locationType: 'On-site',
      roles: {
        role: 'Full-stack Web Developer',
        employmentType: 'Full-time',
        startDate: '2019-07-03',
        endDate: '2020-08-25',
        descriptions: [
          'Revamped old WordPress websites using GatsbyJS to improve speed and SEO.',
          'Developed an e-commerce food ordering website with WooCommerce.',
          'Collaborated on building portal applications with ReactJS and NodeJS (Express).',
          'Managed WordPress websites and domains with Plesk Obsidian, performing regular updates on plugins and databases.'
        ],
        skills: [
          'E-Commerce',
          'React.js',
          'GatsbyJS',
          'GraphQL',
          'WordPress',
          'Woocommerce'
        ]
      }
    },
    {
      companyName: 'eLink Systems & Concepts Corporation',
      companyLogo:
        'https://media.licdn.com/dms/image/v2/C4D0BAQFQQODmnPrPDQ/company-logo_200_200/company-logo_200_200/0/1630536716101?e=1735776000&v=beta&t=F4q6y9dMGpO-auKeXHJNaFcKp1TGx0zHTDpciDNrGcM',
      location: 'Samar Loop, Cebu Business Park, Cebu City, Philippines',
      locationType: 'On-site',
      roles: {
        role: 'Web Developer',
        employmentType: 'Full-time',
        startDate: '2018-02-01',
        endDate: '2019-05-01',
        descriptions: [
          'Developed WordPress websites from PSD to mobile-friendly sites, utilizing theme builders like Elementor and Divi.',
          'Created clean interfaces and intuitive interactions in collaboration with designers.',
          'Developed an internal project tracker app using VueJS and Firebase.'
        ],
        skills: [
          'WordPress',
          'Woocommerce',
          'Divi',
          'Elementor',
          'Laravel',
          'PHP',
          'Vue.js',
          'Firebase'
        ]
      }
    },
    {
      companyName: 'Binary Ideas Creative Solutions',
      location: 'F. Ramos Ext., Capitol Site, Cebu City, Philippines',
      locationType: 'On-site',
      roles: {
        role: 'Junior Developer',
        employmentType: 'Full-time',
        startDate: '2017-02-13',
        endDate: '2018-02-23',
        descriptions: [
          'Developed and maintained WordPress websites.',
          'Maintained Laravel applications.',
          'Worked closely with senior developers, gaining advanced coding skills.'
        ],
        skills: ['WordPress', 'HTML5', 'CSS3', 'Laravel', 'MySQL']
      }
    },
    {
      companyName: 'Biz1 Global Solutions, Inc.',
      location:
        '3rd Floor, Lao Building, Arnaiz Avenue, Makati City, Philippines',
      locationType: 'On-site',
      roles: {
        role: 'Back-end Developer',
        employmentType: 'Contract',
        startDate: '2016-07-07',
        endDate: '2017-01-27',
        descriptions: [
          'Maintained ERP systems using Odoo/OpenERP, Python, and XML.',
          'Created Odoo QWeb reports for data visualizations.',
          "Contributed to enhancing the system's UI/UX and responsive application development."
        ],
        skills: ['Odoo', 'Python', 'XML', 'OpenERP', 'PostgreSQL']
      }
    }
  ],
  education: {
    course: 'Bachelor of Science in Computer Science',
    schoolName: 'Western Mindanao State University - Malangas Campus',
    schoolYear: 'SY 2011 - 2016'
  },
  portfolio: [
    {
      src: 'https://utopia-components-docs.vercel.app/?path=/docs/my-resume--docs',
      text: 'https://utopia-components-docs.vercel.app'
    },
    {
      src: 'https://www.accountable.ph',
      text: 'https://www.accountable.ph'
    },
    {
      src: 'ttps://ruston-emperua.netlify.app/',
      text: 'ttps://ruston-emperua.netlify.app'
    },
    {
      src: 'https://stonix26.github.io',
      text: 'https://stonix26.github.io'
    }
  ]
}
