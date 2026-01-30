# Teamdesk AI Website

A modern Next.js website for Teamdesk AI, an automation agency that helps businesses discover AI-powered automation solutions tailored to their needs. Design inspired by the Catalis Webflow template.

## Features

### Interactive Questionnaire
- **Auto-advancing Form**: No buttons needed - questions automatically transition when selections are made
- **Smooth Blur Animations**: Questions elegantly fade out and new ones fade in with blur effects
- **Three-step Flow**:
  - Business type selection
  - Business size selection
  - Pain point identification with multiple choice and custom input options

### Modern Design
- **Catalis-Inspired Aesthetic**: Clean, professional layout based on the Catalis Webflow template
- **Blue Accent Color** (#4d65ff): Professional blue highlights matching modern SaaS design
- **Premium Typography**: Inter for headings, Roboto for body text
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Dark Mode Support**: Automatic dark mode based on system preferences
- **Sticky Navigation**: Header with smooth backdrop blur
- **Card-Based UI**: Clean cards with hover effects and shadows

## Getting Started

### Prerequisites

- Node.js 18+ installed on your system
- npm or yarn package manager

### Installation

The project is already set up. To install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

The page auto-updates as you edit files with Turbopack hot reloading.

### Build for Production

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```
automation-agency/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with Inter & Roboto fonts
│   │   ├── page.tsx         # Landing page with hero & navigation
│   │   └── globals.css      # Global styles with Catalis color scheme
│   └── components/
│       └── OnboardingForm.tsx  # Auto-advancing form with animations
├── public/                  # Static assets
├── package.json
├── tsconfig.json           # TypeScript configuration
└── next.config.ts          # Next.js configuration
```

## Design System

### Color Palette
- **Accent**: #4d65ff (Blue)
- **Accent Dark**: #3d52e6
- **Dark Background**: #0f1419
- **Light Gray**: #f5f5f7
- **Border**: #e5e5e5

### Typography
- **Headings**: Inter (400, 600, 700)
- **Body**: Roboto (400, 500, 600)
- **Sizes**: Responsive from text-sm to text-7xl

### Components
- Rounded corners (rounded-xl, rounded-2xl)
- Border width: 2px for emphasis
- Shadow: Multiple levels with accent/opacity variations
- Hover states: Border color, shadow, and text color transitions

## Next Steps

### Future Enhancements

1. **Follow-up Questions**: Implement conditional questions based on initial answers
2. **Backend Integration**: Connect form to a database or CRM system (e.g., Airtable, Supabase)
3. **Email Notifications**: Send form submissions via email service
4. **Analytics**: Integrate Google Analytics or Plausible
5. **Additional Pages**:
   - About page with team and mission
   - Services/Solutions showcase
   - Case studies and testimonials
   - Pricing tiers
   - Contact form
6. **Blog Section**: Add a blog with CMS integration
7. **Mobile Menu**: Implement hamburger menu for mobile navigation

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Fonts**: Inter and Roboto from Google Fonts
- **Development**: Turbopack for fast refresh
- **Design Inspiration**: Catalis Webflow Template

## Design References

The visual design is inspired by the [Catalis Webflow Template](https://webflow.com/templates/html/catalis-website-template), adapting its clean, professional aesthetic for a modern automation agency brand.

## Learn More

To learn more about Next.js:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

Private project for Teamdesk AI.
