# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev          # Start development server with Turbopack (localhost:3000)
npm run build        # Create optimized production build
npm start            # Start production server
npm run lint         # Run ESLint
```

## Architecture Overview

This is a **Next.js 15 App Router** application built as a lead generation platform for Teamdesk AI automation agency.

### Technology Stack
- Next.js 15.3.4 with App Router (React 19)
- TypeScript with strict mode
- Tailwind CSS 4 for styling
- Nodemailer for email notifications
- Turbopack for fast development

### Key Architectural Patterns

**1. Server vs Client Components**
- Most pages are Server Components (layout.tsx, page.tsx, about/page.tsx)
- Client Components are marked with `'use client'` and used only for interactivity:
  - `OnboardingForm.tsx` - Multi-step form with React state
  - `Modal.tsx` - Modal dialog component

**2. API Route Architecture**
- Single API endpoint: `/api/send-email` (POST)
- Serverless function pattern
- Sends form submissions to alexandre@teamdesk.app via SMTP
- Requires environment variables for SMTP configuration

**3. Form Flow Architecture**
The OnboardingForm implements a **3-step auto-advancing questionnaire**:
- Step 1: Business Type Selection (9 options)
- Step 2: Business Size Selection (5 options)
- Step 3: Pain Point Selection (8 presets + custom textarea)

**Auto-advance logic**: Selecting an option automatically transitions to the next step without button clicks. Uses blur animations with cubic-bezier timing functions.

**State management**: Local React state (useState) tracks:
- Current step and display step (for animations)
- Form data (businessType, businessSize, painPoint, otherPainPoint)
- Modal visibility and submission state

**4. Styling Architecture**
- CSS variables defined in `globals.css` for theming
- Tailwind utility classes for component styling
- Dark mode support via `prefers-color-scheme`
- Design inspired by Catalis Webflow template

### Directory Structure

```
app/
├── layout.tsx           # Root layout with font configuration (Inter + Roboto)
├── page.tsx             # Landing page (Hero, Stats, Features, Form)
├── globals.css          # Global styles and CSS variables
├── about/
│   └── page.tsx         # About page with founder bio
└── api/
    └── send-email/
        └── route.ts     # Email submission endpoint
components/
├── OnboardingForm.tsx   # 3-step questionnaire (client component)
└── Modal.tsx            # Reusable modal (client component)
```

## Environment Configuration

Required environment variables in `.env.local`:

```bash
SMTP_HOST=smtp.gmail.com        # SMTP server hostname
SMTP_PORT=587                   # Port (587 for TLS, 465 for SSL)
SMTP_SECURE=false               # true for 465, false for 587
SMTP_USER=your-email@gmail.com  # SMTP username
SMTP_PASS=your-app-password     # SMTP password (use App Password for Gmail with 2FA)
SMTP_FROM=your-email@gmail.com  # Sender email address
```

Gmail requires App Passwords if 2FA is enabled. Generate at: https://myaccount.google.com/apppasswords

## Design System

### Color Palette (CSS Variables)
- `--accent: #4d65ff` - Primary blue accent
- `--accent-dark: #3d52e6` - Darker blue for hover states
- `--dark-bg: #0f1419` - Dark background
- `--light-gray: #f5f5f7` - Light gray background
- `--border-color: #e5e5e5` - Border color

### Typography
- **Headings**: Inter (400, 600, 700 weights)
- **Body text**: Roboto (400, 500, 600 weights)
- Loaded via Next.js font optimization in layout.tsx

## API Endpoint Details

### POST `/api/send-email`

**Request Body:**
```json
{
  "businessType": "string",
  "businessSize": "string",
  "painPoint": "string",
  "otherPainPoint": "string",
  "additionalInfo": "string"
}
```

**Response:**
- Success: `{ "success": true }` (200)
- Error: `{ "error": "Failed to send email" }` (500)

**Email sent to:** alexandre@teamdesk.app

**Implementation notes:**
- Uses Nodemailer with SMTP transport
- Formats form data as HTML email
- SMTP credentials loaded from environment variables
- Connection errors (ECONNREFUSED) indicate missing or incorrect SMTP configuration

## Component Architecture Notes

### OnboardingForm.tsx
- **Client component** with complex state management
- Implements custom animation system with blur transitions
- Auto-advance logic: Each selection triggers immediate step transition
- Modal integration for optional additional context before submission
- Error handling with fallback email display on submission failure

### Modal.tsx
- Reusable modal with backdrop blur
- Prevents body scroll when open
- Click-outside-to-close functionality
- Uses React Portal for proper DOM positioning

### Landing Page (page.tsx)
Main sections:
1. Sticky header with navigation
2. Hero with decorative corner elements and floating cards
3. Stats section (80% reduction, $70k savings, 99% increase)
4. Features grid (4 cards with icons)
5. Get Started section embedding OnboardingForm
6. Footer

## Important Context

- **Brand**: Teamdesk AI - AI-powered automation agency
- **Owner**: Alexandre Saussier (alexandre@teamdesk.app)
- **Design Inspiration**: Catalis Webflow Template
- **Purpose**: Lead generation through interactive questionnaire
- **No authentication/database**: Submissions sent directly via email
