import nodemailer from "nodemailer";

export const sendEmailNotification = async (
  userEmails: string[],
  blood_group: string,
  location: string,
  contact: string
) => {
  if (
    !userEmails ||
    userEmails.length === 0 ||
    !blood_group ||
    !location ||
    !contact
  ) {
    throw new Error("Missing required parameters");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_APP_PASS,
    },
  });

  const mailOptions = (email: string) => ({
    from: `"Blood Donation Platform" <${process.env.EMAIL_USER}>`, // Better sender name
    to: email,
    subject: "Urgent: Blood Request Needed in Your Area",
    text: `Dear donor,

A blood donation request has been made for blood group ${blood_group}.

Location: ${location}
Contact: ${contact}

If you are available to donate, please reach out to the provided contact.

Thank you for your support.

Best Regards,
Blood Donation Team`,
    html: `
    <p>Dear donor,</p>
    <p>A blood donation request has been made for blood group <strong>${blood_group}</strong>.</p>
    <p><strong>Location:</strong> ${location}</p>
    <p><strong>Contact:</strong> ${contact}</p>
    <p>If you are available to donate, please reach out to the provided contact.</p>
    <p>Thank you for your support.</p>
    <p>Best Regards,<br>Blood Donation Team</p>
  `,
  });

  try {
    await Promise.all(
      userEmails.map((email) => transporter.sendMail(mailOptions(email)))
    );
    console.log(`Emails sent successfully to: ${userEmails.join(", ")}`);
  } catch (error) {
    console.error("Failed to send some emails:", error);
    throw new Error("Some emails failed to send");
  }
};
