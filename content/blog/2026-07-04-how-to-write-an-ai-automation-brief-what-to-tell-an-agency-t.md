---
title: "How to Write an AI Automation Brief: What to Tell an Agency to Get the Best Results"
date: "2026-07-04"
excerpt: "Most AI automation projects don't fail because the technology isn't ready. They fail because the brief was vague. If you walk into a conversation with an agency and say \"we want to automate some st..."
category: "Getting Started"
slug: "how-to-write-an-ai-automation-brief-what-to-tell-an-agency-to-get-the-best-results-2026-07-04"
readTime: "6 min read"
---

Most AI automation projects don't fail because the technology isn't ready. They fail because the brief was vague. If you walk into a conversation with an agency and say "we want to automate some stuff," you'll get a generic solution built around assumptions — and you'll spend weeks in back-and-forth trying to course-correct. The good news is that writing a strong automation brief doesn't require technical knowledge. It just requires you to think clearly about your own business. Here's exactly what to include.

## Start With the Problem, Not the Tool

The single biggest mistake people make when briefing an automation agency is leading with the solution they've already imagined. "We want a chatbot" or "we need something with ChatGPT" tells an agency what you think the answer is, not what the actual problem is. A good agency will work backwards from the problem — but only if you give them one to work from.

Describe the pain in plain language. Think about a task that happens repeatedly in your business, takes longer than it should, or keeps going wrong. Be specific about what "wrong" looks like. Is it data entered incorrectly into your CRM? Leads that go cold because nobody followed up within 48 hours? Invoices that sit in an inbox for two weeks before anyone acts on them?

A useful format: *"Every time [trigger event happens], someone manually [does this task], which takes [X minutes/hours], and when it goes wrong, [this is the consequence]."*

For example: "Every time a new enquiry comes in through our website, someone manually copies the details into our CRM, sends a holding email, and creates a task in Asana. This takes about 20 minutes per lead, and when we're busy, it sometimes doesn't happen for 24–48 hours. We've lost deals because of it."

That brief tells an agency almost everything they need to know to scope a solution. The trigger, the current process, the time cost, and the business consequence are all there.

## Map the Current Process Step by Step

Once you've defined the problem, document what actually happens today — every step, every person involved, every tool touched. You don't need a flowchart. A numbered list is fine.

This matters more than most people realise. An agency building an automation between your email, your CRM, and your invoicing software needs to understand the exact sequence of events. Missing a step — like the fact that a manager has to approve something before it moves forward — can cause an automation to break in production and require expensive fixes.

Walk through a recent real example. What was the trigger? Who did what next? Which tool did they log into? What did they type or copy? Where did the output go? If there are decision points ("if the order is over £500, it goes to the senior account manager"), write those down too. Decision points are where automation either adds the most value or requires the most careful design.

Also note the exceptions. Every business has them. "This is usually how it works, but if the client is on our VIP list, we handle it differently." Exceptions that aren't documented tend to become bugs.

## Be Honest About Your Tools and Your Data

Agencies can build automations on top of almost any modern software stack — but they need to know what they're working with. List every tool involved in the process you want to automate: your CRM, your email platform, your project management tool, your accounting software, your booking system. Include the plan or tier you're on, because API access (the technical connection that lets software talk to other software) is sometimes restricted to higher-tier plans.

One real-world example: a 12-person legal consultancy in Manchester wanted to automate their client onboarding. They briefed an agency clearly on the problem and the process, but forgot to mention they were using the entry-level tier of their CRM — one that didn't support the API connections required. Discovering this during the build added two weeks and roughly £800 in additional costs as they migrated to a higher plan and the agency re-scoped the work. A line in the original brief would have prevented it.

Also be honest about your data quality. If your CRM has inconsistent formatting, duplicate contacts, or missing fields, say so. Automations are only as reliable as the data they run on. An agency that knows your data is messy can build in cleaning steps or flag it as a pre-project task — saving you from an automation that technically works but produces garbage outputs.

## Define What Success Looks Like

A brief without a success metric is a project without an end point. Before you hand anything over to an agency, decide what "working" means to you in measurable terms.

This doesn't have to be complicated. Some useful examples:

- "This automation should process new leads in under 2 minutes, compared to the 20 minutes it takes now."
- "We want to reduce the number of missed follow-ups from roughly 30% of leads to zero."
- "The goal is to eliminate manual data entry between our booking system and our invoicing software entirely — currently that takes our admin team around 3 hours per week."

3 hours a week is 150 hours a year. At a fully-loaded staff cost of £25/hour, that's £3,750 in labour that could be redirected. When you frame success that way, it becomes much easier to evaluate whether the automation is worth the investment — and to make the case internally if you need sign-off from someone else.

Also include any non-negotiable constraints. Does the automation need to comply with GDPR requirements around data storage? Are there approval steps that must remain human? Is there a system you're contractually unable to replace? These constraints shape the entire design, so surface them early.

Finally, describe what a bad outcome looks like. "We don't want customers to receive duplicate emails." "We don't want orders to be processed without a stock check." "We don't want anything posted publicly without a human review." Knowing your failure conditions is just as useful as knowing your success conditions.

## Conclusion

The best automation briefs aren't technical documents — they're clear descriptions of a real business problem, written by someone who understands their own operations. If you can explain what triggers a process, what happens step by step, which tools are involved, and what success looks like, you've given an agency everything they need to build something that actually works. Spend an hour getting this right before your first meeting, and you'll save weeks of back-and-forth, reduce the risk of costly rework, and walk away with an automation that solves the problem you actually have — not the one someone guessed at.
