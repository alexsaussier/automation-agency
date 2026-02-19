#!/usr/bin/env node
/**
 * Daily blog article generator using Claude claude-sonnet-4-6.
 * Picks a new topic each run, generates a markdown article, saves it to
 * content/blog/, then commits and pushes to production automatically.
 *
 * Usage: node scripts/generate-article.mjs
 * Requires: ANTHROPIC_API_KEY env var (or set in .env.local)
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// Load .env.local for local development
const envFile = path.join(ROOT, '.env.local');
if (fs.existsSync(envFile)) {
  const lines = fs.readFileSync(envFile, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

// ---------------------------------------------------------------------------
// Topics list — cycles through all before repeating
// ---------------------------------------------------------------------------
const TOPICS = [
  { title: 'AI Automation for Restaurants: Cut Costs and Delight Customers', category: 'Restaurants & Food Service' },
  { title: 'How Retail Stores Are Using AI to Manage Inventory and Boost Sales', category: 'Retail' },
  { title: 'AI in Medical Clinics: Automating Appointments, Records, and Billing', category: 'Healthcare' },
  { title: 'How Law Firms Save Hours Every Week with AI Document Automation', category: 'Legal' },
  { title: 'AI for Real Estate Agents: From Lead Follow-up to Contract Generation', category: 'Real Estate' },
  { title: 'How Hotels Are Using AI to Transform the Guest Experience', category: 'Hospitality' },
  { title: 'AI in Manufacturing: Quality Control and Predictive Maintenance', category: 'Manufacturing' },
  { title: 'Logistics Companies Using AI to Optimize Routes and Cut Delivery Costs', category: 'Logistics' },
  { title: 'How Accounting Firms Are Automating Reconciliation and Reporting with AI', category: 'Accounting' },
  { title: 'AI for Marketing Agencies: Automate Campaigns and Reporting', category: 'Marketing' },
  { title: 'E-commerce Personalization: How AI Increases Average Order Value', category: 'E-commerce' },
  { title: 'Insurance Companies Using AI to Speed Up Claims Processing', category: 'Insurance' },
  { title: 'AI for Construction: Project Management and Safety Compliance Automation', category: 'Construction' },
  { title: 'How Car Dealerships Use AI to Convert More Leads and Service Customers', category: 'Automotive' },
  { title: 'AI for Gyms and Fitness Studios: Member Retention on Autopilot', category: 'Fitness' },
  { title: 'Beauty Salons and Spas: Using AI to Automate Bookings and Client Follow-ups', category: 'Beauty & Wellness' },
  { title: 'AI Automation for Veterinary Clinics: Free Up Time for What Matters', category: 'Veterinary' },
  { title: 'How Schools and Universities Are Automating Administrative Work with AI', category: 'Education' },
  { title: 'Non-Profit Organizations Using AI to Scale Impact Without Scaling Headcount', category: 'Non-Profit' },
  { title: 'Financial Advisors Using AI to Automate Client Reporting and Onboarding', category: 'Finance' },
  { title: 'AI Customer Service: How to Handle 80% of Tickets Without a Human', category: 'Customer Service' },
  { title: 'Automating Invoice Processing with AI: From Receipt to Payment in Minutes', category: 'Finance' },
  { title: 'AI-Powered HR Onboarding: Give New Hires a Great First Day Automatically', category: 'Human Resources' },
  { title: 'How AI Can Manage Your Email Inbox and Prioritize What Matters', category: 'Productivity' },
  { title: 'Social Media Automation with AI: Consistent Presence Without the Work', category: 'Marketing' },
  { title: 'AI for Lead Generation: Qualify and Nurture Prospects While You Sleep', category: 'Sales' },
  { title: 'Smart Inventory Management: How AI Prevents Stockouts and Overstock', category: 'Operations' },
  { title: 'AI Contract Review: How Small Businesses Can Access Enterprise-Grade Legal Checks', category: 'Legal' },
  { title: 'Expense Reporting Automation: Save Your Team Hours Every Month with AI', category: 'Finance' },
  { title: 'How AI Scheduling Assistants Eliminate the Back-and-Forth of Meeting Planning', category: 'Productivity' },
  { title: 'Eliminating Manual Data Entry: How AI Extracts and Routes Information Automatically', category: 'Operations' },
  { title: 'Automated Business Reporting: Get the Insights You Need Without Building Dashboards', category: 'Analytics' },
  { title: 'Supply Chain Resilience: Using AI to Anticipate Disruptions Before They Happen', category: 'Logistics' },
  { title: 'AI Customer Feedback Analysis: Turn Reviews into Actionable Improvements', category: 'Customer Experience' },
  { title: 'AI Sales Forecasting: How Small Businesses Can Predict Revenue with Confidence', category: 'Sales' },
  { title: 'Document Management Automation: Never Lose a File or Miss a Deadline Again', category: 'Operations' },
  { title: 'AI Compliance Monitoring: Stay Ahead of Regulations Without a Dedicated Team', category: 'Compliance' },
  { title: 'Marketing Campaign Automation: How AI Handles Testing, Optimization, and Reporting', category: 'Marketing' },
  { title: 'AI Appointment Scheduling for Service Businesses: Reduce No-Shows by 60%', category: 'Operations' },
  { title: 'Performance Management Automation: How AI Helps Managers Give Better Feedback', category: 'Human Resources' },
  { title: 'AI for Small Businesses: The 5 Automations That Pay for Themselves in 30 Days', category: 'Small Business' },
  { title: 'How Startups Are Using AI Automation to Compete with Much Larger Companies', category: 'Startups' },
  { title: 'Freelancers and AI: Automate the Admin Work to Focus on the Creative Work', category: 'Freelancing' },
  { title: 'Healthcare Administration: How AI Reduces Paperwork Burden for Medical Staff', category: 'Healthcare' },
  { title: 'AI for Property Management: Automate Maintenance Requests, Leases, and Rent Collection', category: 'Real Estate' },
  { title: 'Restaurant Menu Optimization with AI: Increase Margins and Reduce Waste', category: 'Restaurants & Food Service' },
  { title: 'How Retail Stores Use AI to Personalize the In-Store and Online Experience', category: 'Retail' },
  { title: 'AI-Powered Guest Communication for Hotels: From Booking to Checkout', category: 'Hospitality' },
  { title: 'Manufacturing Defect Detection with AI: Catch Problems Before They Reach Customers', category: 'Manufacturing' },
  { title: 'AI for Dental Practices: Automate Reminders, Billing, and Treatment Plans', category: 'Healthcare' },
  { title: 'How Event Planners Use AI to Coordinate Vendors, Guests, and Logistics', category: 'Events' },
  { title: 'AI for Trucking Companies: Driver Scheduling, Route Optimization, and Compliance', category: 'Logistics' },
  { title: 'Automated Client Reporting for Marketing Agencies: Impress Clients and Save Time', category: 'Marketing' },
  { title: 'AI in E-commerce: Automated Returns, Refunds, and Customer Support', category: 'E-commerce' },
  { title: 'How IT Teams Use AI to Automate Helpdesk Tickets and Incident Response', category: 'IT & Tech' },
  { title: 'AI for Recruitment: Screen Candidates Faster Without Bias', category: 'Human Resources' },
  { title: 'Accounting Automation: Close the Books Faster with AI-Powered Month-End Processing', category: 'Accounting' },
  { title: 'AI for Property Inspections: Automated Reports, Photo Analysis, and Compliance Checks', category: 'Real Estate' },
  { title: 'How Spas and Wellness Centers Use AI to Increase Repeat Business', category: 'Beauty & Wellness' },
  { title: 'AI for Language Schools: Automate Enrollment, Scheduling, and Student Progress Tracking', category: 'Education' },

  // ── Enterprise & multi-tool workflow integration ────────────────────────
  { title: 'How Law Firms Are Connecting Slack, Email, and Their CMS with AI to Never Miss a Deadline', category: 'Workflow Integration' },
  { title: 'The Connected Office: How AI Ties Together Slack, Email, and Your Project Management Tools', category: 'Workflow Integration' },
  { title: 'From Inbox to Action: How AI Agents Route Emails into Slack, Notion, and Your CRM Automatically', category: 'Workflow Integration' },
  { title: 'How to Build a Single Source of Truth Across Tools with AI Workflow Automation', category: 'Workflow Integration' },
  { title: 'Slack as Your Command Center: How AI Can Trigger Actions Across Every Tool Your Team Uses', category: 'Workflow Integration' },
  { title: 'Connecting Your CRM, Email, and Calendar with AI: The End of Copying and Pasting', category: 'Workflow Integration' },
  { title: 'How AI Workflow Agents Replace the Manual Work Between Your Business Tools', category: 'Workflow Integration' },
  { title: 'Legal Workflow Automation: How Law Firms Connect Their Document Systems, Email, and Billing Tools', category: 'Legal' },
  { title: 'Multi-Tool Automation for Consultancies: Syncing Client Portals, Emails, and Invoicing with AI', category: 'Workflow Integration' },
  { title: 'How Office Teams at Growing Companies Automate Approvals Across Email, Slack, and ERP Systems', category: 'Workflow Integration' },
  { title: 'AI Agents That Sit Between Your Tools: The New Way Teams Eliminate Repetitive Hand-offs', category: 'Workflow Integration' },
  { title: 'From Contract Signed to Project Kicked Off: Automating the Handover Workflow with AI', category: 'Workflow Integration' },
  { title: 'How to Automate Your Client Onboarding Across HubSpot, Slack, and Google Drive with AI', category: 'Workflow Integration' },
  { title: 'The Notification Problem: How AI Cuts Down on Tool Overload by Routing Alerts Intelligently', category: 'Workflow Integration' },
  { title: 'How Growing SMEs Use AI to Stitch Together Their Tech Stack Without Hiring More Ops Staff', category: 'Workflow Integration' },
  { title: 'AI-Powered Meeting Follow-ups: From Transcript to Tasks in Notion, Slack, and Your CRM', category: 'Workflow Integration' },
  { title: 'How Real Estate Agencies Connect Their CRM, Email, and Document Tools with AI Workflows', category: 'Real Estate' },
  { title: 'Automated Reporting Pipelines: How AI Pulls Data from Multiple Tools and Delivers a Single Digest', category: 'Analytics' },
  { title: 'How HR Teams Use AI to Connect Applicant Tracking, Slack Onboarding, and Payroll Tools Seamlessly', category: 'Human Resources' },
  { title: 'The Ops Team of the Future: Using AI Agents to Orchestrate Work Across Your Entire Tool Stack', category: 'Workflow Integration' },

  // ── Tool-specific integrations (high search volume) ─────────────────────
  { title: 'Zapier vs AI Agents: Which Is Right for Your Business?', category: 'Workflow Integration' },
  { title: 'How to Automate Your HubSpot CRM with AI: Less Data Entry, More Selling', category: 'Workflow Integration' },
  { title: 'Microsoft 365 and AI Automation: Making Teams, Outlook, and SharePoint Work Together', category: 'Workflow Integration' },
  { title: 'Google Workspace Automation: How AI Connects Gmail, Calendar, Drive, and Sheets', category: 'Workflow Integration' },
  { title: 'Notion + AI: How to Turn Your Workspace into a Self-Updating Knowledge Hub', category: 'Workflow Integration' },
  { title: 'How to Automate Monday.com with AI: Projects That Update Themselves', category: 'Workflow Integration' },
  { title: 'Airtable + AI Agents: Turning Your Database into an Automated Workflow Engine', category: 'Workflow Integration' },
  { title: 'Salesforce Automation with AI: Beyond What the Platform Does Out of the Box', category: 'Workflow Integration' },
  { title: 'Pipedrive + AI: Never Let a Lead Go Cold Again', category: 'Sales' },
  { title: 'Make vs AI Agents: Understanding the Difference and When to Use Each', category: 'Workflow Integration' },
  { title: 'Connecting Shopify, Your Email Platform, and CRM with AI Workflows', category: 'E-commerce' },
  { title: 'QuickBooks + AI: Automating the Accounting Work Behind Your Business', category: 'Accounting' },
  { title: 'Xero + AI: How to Automate Your Bookkeeping, Invoicing, and Cash Flow Alerts', category: 'Accounting' },
  { title: 'How AI Ties Together Your Project Management, Time Tracking, and Invoicing Tools', category: 'Workflow Integration' },
  { title: 'Automating Your Google Ads, Analytics, and Reporting Pipeline with AI', category: 'Marketing' },

  // ── Industries not yet covered ───────────────────────────────────────────
  { title: 'AI Automation for Architecture Firms: From RFI to Project Handover Without the Admin', category: 'Architecture' },
  { title: 'How PR Agencies Use AI to Monitor Coverage, Draft Releases, and Report to Clients', category: 'PR & Communications' },
  { title: 'AI for Wealth Management: Automating Client Communication and Portfolio Reporting', category: 'Finance' },
  { title: 'AI for Home Services Businesses: Booking, Dispatch, and Follow-up on Autopilot', category: 'Home Services' },
  { title: 'AI Automation for Management Consulting Firms: Research, Proposals, and Client Reporting', category: 'Consulting' },
  { title: 'How Franchise Businesses Use AI to Standardize Operations Across Every Location', category: 'Franchise' },
  { title: 'Interior Design Firms Using AI to Automate Client Proposals and Project Updates', category: 'Interior Design' },
  { title: 'AI for Media Companies: Automating Content Distribution, Tagging, and Rights Management', category: 'Media' },
  { title: 'How Cleaning and Facilities Management Companies Use AI to Schedule and Track Work', category: 'Facilities' },
  { title: 'AI for Private Equity and Investment Firms: Automating Deal Flow and Portfolio Monitoring', category: 'Finance' },
  { title: 'AI for Landscaping and Garden Service Companies: Win More Jobs, Spend Less Time on Admin', category: 'Home Services' },
  { title: 'SaaS Companies Using AI to Automate Customer Onboarding and Reduce Churn', category: 'IT & Tech' },
  { title: 'AI for Recruitment Agencies: Automate Candidate Sourcing, Screening, and Client Updates', category: 'Human Resources' },
  { title: 'How Translation and Localization Agencies Use AI to Automate the Admin and Scale Output', category: 'Professional Services' },
  { title: 'AI for Physiotherapy and Allied Health Clinics: Automate Bookings, Notes, and Follow-ups', category: 'Healthcare' },

  // ── Educational / definitional (heavily cited by AI search engines) ──────
  { title: 'What Is an AI Agent? A Plain-English Guide for Business Owners', category: 'AI Explained' },
  { title: 'What Is Workflow Automation? (And Why It Is Different from What You Probably Think)', category: 'AI Explained' },
  { title: 'AI Agents vs Chatbots: What Is the Difference and Which One Does Your Business Need?', category: 'AI Explained' },
  { title: 'RPA vs AI Agents: Why the New Generation of Automation Is Far More Flexible', category: 'AI Explained' },
  { title: 'What Does an AI Automation Agency Actually Do — And Do You Need One?', category: 'AI Explained' },
  { title: 'The 7 Types of Business Tasks AI Can Fully Automate Today', category: 'AI Explained' },
  { title: 'How AI Agents Actually Work: A No-Jargon Explanation for Business Owners', category: 'AI Explained' },
  { title: 'What Is a Trigger-Based Workflow? The Concept Behind Every Great Automation', category: 'AI Explained' },
  { title: 'What Is Agentic AI? Why the Next Wave of Automation Goes Far Beyond Simple Rules', category: 'AI Explained' },
  { title: 'AI Automation vs Traditional Software: Why the Difference Matters for Your Business', category: 'AI Explained' },

  // ── Buyer-intent / ROI / cost (attract people actively evaluating) ───────
  { title: 'How Much Does AI Automation Cost for a Small Business? A Realistic Breakdown', category: 'Getting Started' },
  { title: 'AI Automation ROI: What to Realistically Expect in Your First Year', category: 'Getting Started' },
  { title: 'Build vs Buy vs Outsource: How to Choose the Right AI Automation Approach', category: 'Getting Started' },
  { title: 'When Does Hiring Make More Sense Than Automating? An Honest Guide', category: 'Getting Started' },
  { title: 'How Long Does It Take to Implement AI Automation in a Small Business?', category: 'Getting Started' },
  { title: 'The Hidden Cost of Not Automating: What Manual Work Actually Costs Your Business', category: 'Getting Started' },
  { title: 'AI Automation on a Budget: What You Can Realistically Achieve for Under €1,000 a Month', category: 'Getting Started' },
  { title: 'How to Calculate the ROI of an AI Automation Project Before You Commit', category: 'Getting Started' },
  { title: 'Questions to Ask Before Hiring an AI Automation Agency', category: 'Getting Started' },
  { title: 'How to Write an AI Automation Brief: What to Tell an Agency to Get the Best Results', category: 'Getting Started' },

  // ── Pain-point / problem-driven (match how people actually search) ────────
  { title: 'Why Your Team Is Still Copying Data Between Tools — And How to Stop It for Good', category: 'Productivity' },
  { title: 'The Real Reason Your Client Onboarding Feels Chaotic — And How AI Fixes It', category: 'Operations' },
  { title: 'Why Leads Go Cold: How Inconsistent Follow-up Costs You Sales and How AI Solves It', category: 'Sales' },
  { title: 'If Your Business Runs on Spreadsheets, Here Is What AI Can Replace Today', category: 'Operations' },
  { title: 'Why Your Team Hates Status Update Meetings — And How AI Can Replace Them', category: 'Productivity' },
  { title: 'The Cost of Inbox Overload: How Unread Emails Are Slowing Your Entire Business Down', category: 'Productivity' },
  { title: 'When You Are the Bottleneck: How AI Agents Help Founders Delegate Without Hiring', category: 'Small Business' },
  { title: 'Why Important Tasks Keep Getting Pushed Back — And How Automation Forces Them to Happen', category: 'Productivity' },
  { title: 'The Hidden Reason Your Projects Keep Running Late (It Is Not What You Think)', category: 'Operations' },
  { title: 'Too Many Tools, Not Enough Time: How AI Tames Your Overloaded Tech Stack', category: 'Workflow Integration' },

  // ── End-to-end workflow patterns (enterprise search terms) ───────────────
  { title: 'Quote to Cash: How AI Automates the Entire Sales-to-Payment Pipeline', category: 'Workflow Integration' },
  { title: 'Procure to Pay: How AI Handles Purchase Requests, Approvals, and Vendor Payments', category: 'Workflow Integration' },
  { title: 'Hire to Onboard: Automating Every Step from Offer Letter to Day-One Productivity', category: 'Human Resources' },
  { title: 'Lead to Close: How AI Keeps Every Deal Moving Without Constant Manual Follow-up', category: 'Sales' },
  { title: 'Issue to Resolution: How AI Routes, Escalates, and Closes Support Tickets Automatically', category: 'Customer Service' },
  { title: 'The Monthly Close Workflow: How AI Goes from Raw Data to Board-Ready Report', category: 'Accounting' },
  { title: 'The Client Renewal Workflow: How AI Ensures You Never Let a Contract Lapse Silently', category: 'Operations' },
  { title: 'Order to Fulfilment: How AI Connects Your Sales Channel, Warehouse, and Courier', category: 'Operations' },

  // ── Solopreneur & founder angle ──────────────────────────────────────────
  { title: 'AI as Your First Employee: What to Automate Before You Make Your First Hire', category: 'Small Business' },
  { title: 'The Solopreneur AI Stack: How One Person Can Run a Business That Feels Much Bigger', category: 'Small Business' },
  { title: 'Scaling Without Hiring: How AI Lets Small Teams Handle Enterprise-Level Volume', category: 'Small Business' },
  { title: 'How to Protect Your Weekends: The Automations Every Small Business Owner Should Have', category: 'Small Business' },
  { title: 'Delegating to AI: A Practical Guide to Deciding What to Automate First', category: 'Getting Started' },

  // ── Emerging / forward-looking ───────────────────────────────────────────
  { title: 'AI Knowledge Management: How to Make Sure Expertise Does Not Leave When People Do', category: 'Operations' },
  { title: 'Competitive Intelligence on Autopilot: How AI Monitors Your Market While You Work', category: 'Strategy' },
  { title: 'Voice AI for Small Business: How Phone Calls Are Being Automated Without Losing the Human Touch', category: 'Customer Service' },
  { title: 'How AI Is Changing Internal Communication: Less Noise, Better Signal Across Your Team', category: 'Productivity' },
  { title: 'The Future of the Back Office: What AI Automation Means for Admin-Heavy Businesses', category: 'Operations' },
  { title: 'How AI Agents Are Replacing Entire Categories of SaaS Subscriptions', category: 'AI Explained' },
  { title: 'AI for Business Continuity: How Automation Keeps Things Running When Your Team Cannot', category: 'Operations' },
  { title: 'How to Build a Content Repurposing Machine with AI: One Article, Ten Formats', category: 'Marketing' },
  { title: 'Email Marketing Automation That Actually Feels Personal: The AI Approach', category: 'Marketing' },
  { title: 'AI-Powered Competitive Pricing: How Small Businesses Can React to Market Changes Automatically', category: 'Strategy' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const STATE_FILE = path.join(__dirname, 'topics-state.json');
const BLOG_DIR = path.join(ROOT, 'content/blog');

function loadState() {
  if (!fs.existsSync(STATE_FILE)) return { currentIndex: 0 };
  return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + '\n');
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function estimateReadTime(text) {
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

function today() {
  return new Date().toISOString().split('T')[0];
}

// ---------------------------------------------------------------------------
// Topic regeneration — called when all topics have been used once
// ---------------------------------------------------------------------------
async function regenerateTopics(client) {
  console.log('All topics used. Generating a fresh batch with AI...');

  const usedTitles = TOPICS.map((t) => `- ${t.title}`).join('\n');

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: `You are a content strategist for BrightBots, a boutique AI automation agency.

BrightBots targets two audiences:
1. SMB owners (restaurants, clinics, retail, law firms, real estate, etc.) with fewer than 100 employees who want to save time with AI
2. Office teams and growing SMEs already using multiple tools (Slack, CRM, email, project management) who want to automate the glue work between them

Generate exactly 80 new blog article topics for BrightBots that are different from the ones already written.
Focus on SEO value, AI search discoverability, and genuine usefulness to the target audiences.
Cover a diverse mix of: industries, use cases, tool-specific integrations, educational explainers, pain-point-driven angles, ROI/cost questions, and workflow patterns.

Articles already written (do NOT repeat these):
${usedTitles}

Return ONLY a valid JSON array, no other text. Each item must have "title" and "category" fields.
Example format:
[
  {"title": "How Plumbers Use AI to Automate Job Scheduling and Customer Follow-ups", "category": "Home Services"},
  {"title": "What Is a Webhook? The Building Block of Every Modern Automation", "category": "AI Explained"}
]`,
      },
    ],
  });

  const raw = message.content[0].type === 'text' ? message.content[0].text : '';
  // Extract JSON array from the response (handle any surrounding text)
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error('Could not parse topic list from Claude response.');
  }

  const newTopics = JSON.parse(jsonMatch[0]);
  if (!Array.isArray(newTopics) || newTopics.length === 0) {
    throw new Error('Claude returned an empty topic list.');
  }

  // Append new topics to the script file itself
  const scriptPath = fileURLToPath(import.meta.url);
  const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
  const insertionPoint = scriptContent.lastIndexOf('];');
  const topicsBlock =
    '\n\n  // ── Auto-generated fresh batch ─────────────────────────────────────────\n' +
    newTopics.map((t) => `  { title: ${JSON.stringify(t.title)}, category: ${JSON.stringify(t.category)} },`).join('\n') +
    '\n';
  const updatedScript =
    scriptContent.slice(0, insertionPoint) + topicsBlock + scriptContent.slice(insertionPoint);
  fs.writeFileSync(scriptPath, updatedScript);

  console.log(`Added ${newTopics.length} new topics to the script.`);
  return newTopics.length;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('Error: ANTHROPIC_API_KEY environment variable is not set.');
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });

  const count = parseInt(process.env.ARTICLE_COUNT || '1', 10);
  const state = loadState();

  // If we've used all topics, regenerate before continuing
  if (state.currentIndex >= TOPICS.length) {
    const added = await regenerateTopics(client);
    console.log(`Topic list refreshed with ${added} new topics. Continuing...`);
    // Re-import isn't possible in ESM, but TOPICS is already in scope —
    // the newly appended entries will be picked up on the NEXT daily run.
    // For this run, reset index to 0 so we start the new batch immediately.
    state.currentIndex = 0;
  }

  const systemPrompt = `You are a content writer for BrightBots, a boutique AI automation agency.
Write expert, practical blog articles about AI automation. You write for two types of readers — adapt based on the article topic:

1. SMB owners (restaurants, clinics, retail, etc.): non-technical, time-poor, fewer than 100 employees.
   They worry about cost and complexity. Make them feel AI is within reach. Reassuring, concrete, outcome-focused.

2. Office & enterprise workflow readers (law firms, consultancies, growing SMEs): they already use multiple tools
   (Slack, email, CRM, project management, CMS) and are frustrated by manual hand-offs between them.
   They are slightly more tech-aware but still not developers. They want efficiency and fewer dropped balls.
   Show them how AI agents can sit between tools and automate the glue work.

For both audiences:
- Write "you", not "businesses" or "companies" — address the reader directly
- Use specific numbers, time savings, and real-world examples
- Never use jargon without a plain-English explanation
- Focus on business outcomes: time saved, errors eliminated, revenue protected
- Keep it practical: readers should finish the article knowing exactly what to do next`;

  for (let i = 0; i < count; i++) {
    const topic = TOPICS[state.currentIndex % TOPICS.length];
    console.log(`[${i + 1}/${count}] Generating: "${topic.title}"`);

    const userPrompt = `Write a detailed blog article with the title: "${topic.title}"

Requirements:
- 900–1200 words
- Written in Markdown (use ## for section headings, no H1)
- Start directly with an engaging introduction paragraph (no preamble, no "Introduction" heading)
- Include 3–4 main sections with ## headings
- Use specific ROI figures, time savings, or cost estimates to make it concrete
- Include at least one practical example of a real business using this automation
- End the article body with a brief conclusion section (## Conclusion)
- Do NOT include the article title at the top (it will be added separately)
- Do NOT include a call-to-action section at the end

Output only the article body in Markdown. Nothing else.`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      messages: [{ role: 'user', content: userPrompt }],
      system: systemPrompt,
    });

    const articleContent = message.content[0].type === 'text' ? message.content[0].text : '';
    if (!articleContent) {
      console.error('Error: Claude returned empty content.');
      process.exit(1);
    }

    // Build excerpt from first paragraph
    const firstParagraph = articleContent.split('\n\n')[0].replace(/[#*_]/g, '').trim();
    const excerpt =
      firstParagraph.length > 200 ? firstParagraph.slice(0, 197) + '...' : firstParagraph;

    const dateStr = today();
    const slug = `${slugify(topic.title)}-${dateStr}`;
    const readTime = estimateReadTime(articleContent);

    // Build frontmatter + content
    const fileContent = `---
title: "${topic.title.replace(/"/g, '\\"')}"
date: "${dateStr}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
category: "${topic.category}"
slug: "${slug}"
readTime: "${readTime}"
---

${articleContent}
`;

    // Save file
    if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });
    const filename = `${dateStr}-${slugify(topic.title).slice(0, 60)}.md`;
    fs.writeFileSync(path.join(BLOG_DIR, filename), fileContent);
    console.log(`    Saved: ${filename}`);

    state.currentIndex += 1;
  }

  // Persist state once after all articles are written
  saveState(state);

  // Git commit and push
  console.log('Committing and pushing to production...');
  try {
    execSync('git add content/blog/ scripts/topics-state.json', { cwd: ROOT, stdio: 'inherit' });
    execSync(
      `git commit -m "feat(blog): add ${count} article${count > 1 ? 's' : ''} [${today()}]"`,
      { cwd: ROOT, stdio: 'inherit' }
    );
    execSync('git push', { cwd: ROOT, stdio: 'inherit' });
    console.log('Done! Article is live.');
  } catch (err) {
    console.error('Git error:', err.message);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
