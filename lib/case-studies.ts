export const caseStudies = [
  {
    slug: 'automated-blog-content-law-firm',
    industry: '⚖️ Law Firm',
    cadence: 'Weekly',
    title: 'Automated blog & LinkedIn content engine',
    summary: 'Monitors legal news, drafts articles and posts, emails finished content — zero manual work.',
    timeSaved: '5h',
    timeSavedLabel: 'per week',
    timeSavedFull: '5 hours saved weekly',
    flow: [
      { logo: '/logos/n8n.png',    label: 'Scrape news' },
      { logo: '/logos/openai.png', label: 'AI drafts' },
      { logo: '/logos/gmail.svg',  label: 'Email sent' },
    ],
    stack: [
      { logo: '/logos/n8n.png',    name: 'n8n' },
      { logo: '/logos/openai.png', name: 'OpenAI' },
    ],
    challenge: [
      'The firm wanted to publish timely legal commentary but did not want lawyers or staff spending time reviewing local legal news every week.',
      'Their team needed a way to consistently pick the most relevant legal developments, turn them into client-facing content, and prepare social distribution without adding more work.',
    ],
    solution: [
      'We built an automation that scrapes local legal news sources and filters the stories most relevant to the law firm.',
      'The workflow then generates a full blog article, creates a matching LinkedIn post, and sends the finished content by email to the client for review.',
      'The full process runs automatically every week, so the client does not need to monitor sources, shortlist stories, or write first drafts.',
    ],
    outcome: [
      'The firm saves around 5 hours every week on news selection and content writing.',
      'They get a reliable publishing rhythm without assigning billable staff to repetitive editorial work.',
    ],
  },
  {
    slug: 'marketing-asset-tracker-sport-retailer',
    industry: '🏪 Sport Retailer',
    cadence: 'Continuous',
    title: 'Marketing asset performance tracker',
    summary: 'Searches the internet for campaign asset usage and feeds findings into a dashboard.',
    timeSaved: '15h+',
    timeSavedLabel: 'per week',
    timeSavedFull: '15+ hours saved weekly',
    flow: [
      { logo: '/logos/n8n.png',      label: 'Web search' },
      { logo: '/logos/openai.png',   label: 'AI analysis' },
      { logo: '/logos/Airtable.png', label: 'Dashboard' },
    ],
    stack: [
      { logo: '/logos/n8n.png',    name: 'n8n' },
      { logo: '/logos/openai.png', name: 'OpenAI' },
    ],
    challenge: [
      'The retailer invests heavily in worldwide marketing assets such as photo shoots, banners, and campaign visuals.',
      'Their central team had limited visibility into whether local entities and retail partners were actually using those assets online.',
      'Checking usage manually required assigning junior analyst time to repetitive global internet research.',
    ],
    solution: [
      "We built a workflow that searches the internet worldwide for the retailer's marketing assets and campaign traces.",
      'The automation compiles the findings into a dashboard so the team can monitor who uses which assets, where they are being used, and how often they appear.',
      'This gives the marketing team a structured view of asset adoption across markets without manual research cycles.',
    ],
    outcome: [
      'The team now knows which assets perform, who uses them most, and where to focus future campaign efforts.',
      'The workflow saves more than 15 hours per week by removing the need for manual monitoring and reporting.',
    ],
  },
  {
    slug: 'internal-legal-newsletter-law-firm',
    industry: '⚖️ Law Firm',
    cadence: 'Weekly',
    title: 'Internal legal newsletter',
    summary: 'Scrapes regulation sources, compiles a digest, and distributes it to all lawyers automatically.',
    timeSaved: '10h+',
    timeSavedLabel: 'per week',
    timeSavedFull: '10+ hours saved weekly',
    flow: [
      { logo: '/logos/n8n.png',    label: 'Scrape sources' },
      { logo: '/logos/openai.png', label: 'AI digest' },
      { logo: '/logos/gmail.svg',  label: 'Newsletter' },
    ],
    stack: [
      { logo: '/logos/n8n.png',    name: 'n8n' },
      { logo: '/logos/openai.png', name: 'OpenAI' },
    ],
    challenge: [
      'Lawyers were spending hours every week checking local websites such as Journal de Monaco and Legimonaco to stay current on regulatory developments.',
      'The work was important but repetitive, and it pulled legal staff away from higher-value client work.',
    ],
    solution: [
      'We built an automation that scrapes major local legal news websites on a recurring basis.',
      'It selects the most important developments, compiles them into an easy-to-read and nicely formatted newsletter, and distributes it weekly to all lawyers.',
      'This ensures the team stays informed without having to manually monitor multiple sources.',
    ],
    outcome: [
      'The firm saves more than 10 hours every week across its legal team.',
      'Lawyers stay up to date through a single consistent briefing instead of fragmented manual research.',
    ],
  },
];

export type CaseStudy = (typeof caseStudies)[0];
