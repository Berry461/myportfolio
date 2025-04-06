//import { EmailTemplate } from "../../components/EmailTemplate";
/*import { NextResponse } from "next/server";
import { Resend } from "resend";

// Access the API key from the environment variable
const resend = new Resend(process.env.RESEND_API_KEY);
console.log("Resend API Key:", process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    console.log("Request received"); // Debugging log

    const { email, subject, message } = await request.json();
    console.log("Form data:", { email, subject, message }); // Debugging log

    // Validate input
    if (!email || !subject || !message) {
      console.error("Missing required fields");
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", // Use Resend's default email
      to: ["ogunmorotiopeyemi1@gmail.com"], // Recipient email address
      subject: subject, // Email subject
      text: email, // Email body
      html: `<p>${email}</p>`,
       // Email body in HTML
      });

    // Handle errors
    if (error) {
      console.error("Resend error:", error);
      console.error("Resend error details:", JSON.stringify(error, null, 2)); // Log detailed error response
      return NextResponse.json(
        { message: "Failed to send email", error: error.message },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", data); // Debugging log

    // Return a success response
    return NextResponse.json(
      { message: "Email sent successfully!", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error); // Debugging log
    console.error("Error details:", JSON.stringify(error, null, 2)); // Log detailed error response
    return NextResponse.json(
      { message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}*/

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    console.log("Request received"); // Debugging log

    const { email, subject, message } = await request.json();
    //console.log("Form data:", { email, subject, message }); // Debugging log

    // Validate input
    if (!email || !subject || !message) {
      console.error("Missing required fields");
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Improved email template
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #7c3aed;">New Message From Your Portfolio</h2>
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; margin-top: 1rem;">
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 1px solid #e5e7eb; margin: 1rem 0;">
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line; background-color: white; padding: 1rem; border-radius: 0.25rem;">${message}</p>
        </div>
        <p style="margin-top: 1rem; color: #6b7280; font-size: 0.875rem;">
          This message was sent via your portfolio contact form.
        </p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["ogunmorotiopeyemi1@gmail.com"],
      subject: `Portfolio Message: ${subject}`,
      reply_to: email,
      html: emailHtml,
      text: `New message from ${email}\n\nSubject: ${subject}\n\nMessage:\n${message}`
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { 
          message: "Failed to send email",
          error: error.message,
          details: error 
        },
        { status: 500 }
      );
    }

    console.log("Email sent successfully. Resend response:", data);
    return NextResponse.json(
      { 
        message: "Email sent successfully!",
        data: {
          id: data.id,
          subject: subject
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { 
        message: "Internal server error",
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

