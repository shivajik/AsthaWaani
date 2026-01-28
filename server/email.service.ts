import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
  }
  return transporter;
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export const sendContactFormNotification = async (
  name: string,
  email: string,
  subject: string,
  message: string,
  phone?: string
) => {
  const adminEmail = process.env.EMAIL;

  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedSubject = escapeHtml(subject);
  const escapedMessage = escapeHtml(message);
  const escapedPhone = phone ? escapeHtml(phone) : null;

  const mailOptions = {
    from: process.env.EMAIL,
    to: adminEmail,
    subject: `New Contact Form Submission: ${escapedSubject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
        <div style="background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1e40af; margin: 0; font-size: 28px; font-weight: bold;">New Contact Form Submission</h1>
            <div style="width: 60px; height: 4px; background-color: #3b82f6; margin: 10px auto; border-radius: 2px;"></div>
          </div>
          
          <div style="color: #374151; line-height: 1.6; font-size: 16px;">
            <p style="margin-bottom: 20px;">You have received a new message from your contact form:</p>
            
            <div style="background-color: #eff6ff; padding: 20px; border-radius: 6px; margin: 25px 0; border-left: 4px solid #3b82f6;">
              <p style="margin: 0 0 10px 0; color: #1e40af; font-weight: 500;">Contact Details:</p>
              <div style="color: #1e40af;">
                <p style="margin: 5px 0;"><strong>Name:</strong> ${escapedName}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${escapedEmail}</p>
                ${escapedPhone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${escapedPhone}</p>` : ""}
                <p style="margin: 5px 0;"><strong>Subject:</strong> ${escapedSubject}</p>
              </div>
            </div>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin: 25px 0;">
              <p style="margin: 0 0 10px 0; color: #374151; font-weight: 500;">Message:</p>
              <p style="margin: 0; color: #4b5563; white-space: pre-wrap;">${escapedMessage}</p>
            </div>
            
            <div style="background-color: #d1fae5; padding: 15px; border-radius: 6px; margin: 25px 0; border-left: 4px solid #10b981;">
              <p style="margin: 0; color: #065f46; font-size: 14px;">
                <strong>Quick Action:</strong> Reply directly to this email or reach out to ${escapedEmail} to respond to this inquiry.
              </p>
            </div>
          </div>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              This notification was sent from your Asthawaani contact form.
            </p>
          </div>
        </div>
      </div>
    `,
    replyTo: email,
  };

  const emailTransporter = getTransporter();
  if (!emailTransporter) {
    console.error("📧 Email transporter not initialized");
    throw new Error("Email transporter not initialized");
  }

  try {
    console.log(`📧 Attempting to send contact form email to: ${adminEmail}`);
    const info = await emailTransporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
};

export const sendVaktaApplicationNotification = async (
  name: string,
  email: string,
  phone: string,
  categories: string[],
  experience: string
) => {
  const adminEmail = process.env.EMAIL;

  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedPhone = escapeHtml(phone);
  const escapedExperience = escapeHtml(experience);
  const escapedCategories = categories.map(c => escapeHtml(c)).join(", ");

  const mailOptions = {
    from: process.env.EMAIL,
    to: adminEmail,
    subject: `New Vakta Application: ${escapedName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fef3c7; border-radius: 8px;">
        <div style="background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #c2410c; margin: 0; font-size: 28px; font-weight: bold;">New Vakta Application</h1>
            <div style="width: 60px; height: 4px; background-color: #ea580c; margin: 10px auto; border-radius: 2px;"></div>
          </div>
          
          <div style="color: #374151; line-height: 1.6; font-size: 16px;">
            <p style="margin-bottom: 20px;">You have received a new application from someone interested in joining as a Vakta:</p>
            
            <div style="background-color: #fff7ed; padding: 20px; border-radius: 6px; margin: 25px 0; border-left: 4px solid #ea580c;">
              <p style="margin: 0 0 10px 0; color: #c2410c; font-weight: 500;">Applicant Details:</p>
              <div style="color: #9a3412;">
                <p style="margin: 5px 0;"><strong>Name:</strong> ${escapedName}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${escapedEmail}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> ${escapedPhone}</p>
              </div>
            </div>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 6px; margin: 25px 0; border-left: 4px solid #f59e0b;">
              <p style="margin: 0 0 10px 0; color: #92400e; font-weight: 500;">Interested Categories:</p>
              <p style="margin: 0; color: #78350f;">${escapedCategories}</p>
            </div>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin: 25px 0;">
              <p style="margin: 0 0 10px 0; color: #374151; font-weight: 500;">Experience:</p>
              <p style="margin: 0; color: #4b5563; white-space: pre-wrap;">${escapedExperience}</p>
            </div>
            
            <div style="background-color: #d1fae5; padding: 15px; border-radius: 6px; margin: 25px 0; border-left: 4px solid #10b981;">
              <p style="margin: 0; color: #065f46; font-size: 14px;">
                <strong>Quick Action:</strong> Reply directly to this email or reach out to ${escapedEmail} / ${escapedPhone} to connect with this applicant.
              </p>
            </div>
          </div>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              This application was submitted from the Asthawaani "Apply as Vakta" page.
            </p>
          </div>
        </div>
      </div>
    `,
    replyTo: email,
  };

  const emailTransporter = getTransporter();
  if (!emailTransporter) {
    console.error("Email transporter not initialized");
    throw new Error("Email transporter not initialized");
  }

  try {
    console.log(`Attempting to send Vakta application email to: ${adminEmail}`);
    const info = await emailTransporter.sendMail(mailOptions);
    console.log("Vakta application email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Failed to send Vakta application email:", error);
    throw error;
  }
};
