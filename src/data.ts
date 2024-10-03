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
            'Migrating the marketing website from Gatsby.js to Next.js to enhance performance and SEO.',
            'Maintaining and updating the WordPress marketing site and accounting portal using Express.js and React.js.',
            'Collaborating with stakeholders to deliver new features and ensure smooth deployments.'
          ],
          skills: [
            'Gatsby.js',
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
          descriptions: [
            'Managed CMS applications and content updates for the marketing website using Gatsby.js and React.js.',
            'Enhanced site performance and SEO through optimized code and best practices.',
            'Maintained the WordPress marketing site to ensure uptime and responsiveness.'
          ],
          skills: ['Gatsby.js', 'React.js', 'WordPress']
        }
      ]
    },
    {
      companyName: 'DNA Micro Software Inc.',
      companyLogo:
        'https://media.licdn.com/dms/image/v2/C560BAQFiSuhnEU9Giw/company-logo_200_200/company-logo_200_200/0/1673238286771/dnamicrosoftwareinc_logo?e=1735776000&v=beta&t=GvwqVVOq_n-QZVp7nxZyRN80HyBNWByrz9RNnUmLIyI',
      location: 'St. Moritz Road, Gorordo Ave., Cebu City, Philippines',
      locationType: 'On-site',
      roles: [
        {
          role: 'Full-stack Developer',
          employmentType: 'Full-time',
          startDate: '2024-01-29',
          endDate: '2024-07-04',
          descriptions: [
            'Integrated backend APIs with front-end components to support user-facing features.',
            'Developed secure REST APIs with Express.js to handle data interactions.',
            'Collaborated with teams to ensure the functionality of new features.'
          ],
          skills: ['XState', 'Redux', 'Redux Toolkit', 'REST API', 'Express.js']
        },
        {
          role: 'Team Lead - UI',
          employmentType: 'Full-time',
          startDate: '2022-10-03',
          endDate: '2024-01-24',
          descriptions: [
            'Led the migration of the component library from TSDX to Turborepo to improve build and deployment times.',
            'Guided the team in adopting best practices for UI/UX and responsive design.',
            'Conducted code reviews and mentored junior developers.'
          ],
          skills: [
            'Turborepo',
            'Changesets CLI',
            'PnPM',
            'Storybook',
            'Leadership'
          ]
        },
        {
          role: 'Assistant Team Lead - UI',
          employmentType: 'Full-time',
          startDate: '2021-11-01',
          endDate: '2022-09-30',
          descriptions: [
            'Assisted in building and refining the component library using React.js and TypeScript.',
            'Provided technical guidance and supported team members in UI development.',
            'Documented and tested components using Storybook for streamlined development.'
          ],
          skills: ['React.js', 'TypeScript', 'Storybook', 'Leadership']
        },
        {
          role: 'Senior Software Engineer - UI',
          employmentType: 'Full-time',
          startDate: '2021-03-01',
          endDate: '2021-10-29',
          descriptions: [
            'Initiated the development of a scalable, reusable React component library for use across multiple projects.',
            'Implemented Tailwind CSS for rapid UI development and ensured consistency in design across various projects.',
            'Collaborated with backend teams to create seamless integrations between front-end components and APIs.'
          ],
          skills: [
            'React.js',
            'TypeScript',
            'TSDX',
            'Tailwind CSS',
            'Sass',
            'SCSS',
            'Node.js',
            'Yarn',
            'NPM'
          ]
        },
        {
          role: 'Software Engineer - UI',
          employmentType: 'Full-time',
          startDate: '2020-09-28',
          endDate: '2021-02-26',
          descriptions: [
            'Provided support for marketing by maintaining and enhancing WordPress websites to improve user engagement.',
            'Optimized existing websites for mobile responsiveness and performance using Sass/SCSS and modern CSS practices.'
          ],
          skills: ['WordPress', 'Sass', 'SCSS', 'Mobile Responsive']
        }
      ]
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
          'Revamped old WordPress websites using Gatsby.js to improve speed and SEO.',
          'Developed an e-commerce food ordering website with WooCommerce.',
          'Collaborated on building portal applications with ReactJS and NodeJS (Express).',
          'Managed WordPress websites and domains with Plesk Obsidian, performing regular updates on plugins and databases.'
        ],
        skills: [
          'JavaScript',
          'React.js',
          'Gatsby.js',
          'GraphQL',
          'Node.js',
          'Express.js',
          'PHP',
          'WordPress',
          'Woocommerce',
          'SEO'
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
          'MySQL',
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
        skills: ['WordPress', 'HTML5', 'CSS3', 'PHP', 'Laravel', 'MySQL']
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
      src: 'https://stonix26.github.io',
      text: 'https://stonix26.github.io'
    }
  ]
}
