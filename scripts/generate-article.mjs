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

  const systemPrompt = `You are a content writer for BrightBots, a boutique AI automation agency.
Write expert, practical blog articles about AI automation aimed at small and medium-sized business owners.
Your target reader runs a business with fewer than 100 employees, is not technical, and is time-poor.
They are curious about AI but don't know where to start and worry about cost and complexity.
Your writing style: clear, direct, reassuring, and concrete. Use specific numbers and real-world examples.
Never use jargon without explaining it. Focus on business outcomes (time saved, cost reduced, revenue gained) not technology.
Speak to a single reader — write "you" not "businesses". Make them feel the solution is within reach.`;

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
