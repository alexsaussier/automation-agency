import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessType, businessSize, painPoint, otherPainPoint, additionalInfo } = body;

    // Create transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Format the email content
    const emailContent = `
      <h2>New Lead from Teamdesk AI Onboarding Form</h2>

      <h3>Business Information:</h3>
      <ul>
        <li><strong>Business Type:</strong> ${businessType || 'Not specified'}</li>
        <li><strong>Business Size:</strong> ${businessSize || 'Not specified'}</li>
      </ul>

      <h3>Pain Points:</h3>
      <ul>
        ${painPoint ? `<li><strong>Selected:</strong> ${painPoint}</li>` : ''}
        ${otherPainPoint ? `<li><strong>Custom Challenge:</strong> ${otherPainPoint}</li>` : ''}
      </ul>

      ${additionalInfo ? `
        <h3>Additional Information:</h3>
        <p>${additionalInfo}</p>
      ` : ''}
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'asaussier99@gmail.com',
      subject: `New Lead: ${businessType} - ${businessSize}`,
      html: emailContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
