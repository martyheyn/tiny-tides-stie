import nodemailer from 'nodemailer';
export { r as renderers } from '../../chunks/_@astro-renderers_DX37PFz5.mjs';

function validEmail(email) {
  return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)
}

async function sendEmail(name, body, ooo, email) {
  const SMTP_USER = "tinytidestherapy@gmail.com";
  const SMTP_PASS = "bgzihhaeucmjzdsq";
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });
  const mailOptions = {
    from: `Tiny Tides Therapy`,
    to: `${!ooo ? SMTP_USER : email}`,
    subject: `${!ooo ? `New Inquiry: ${name}` : "Out of Office"}`,
    text: body
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

const hearAboutUsMap = (hearAboutUs) => {
  switch (hearAboutUs) {
    case "google":
      return "Google";
    case "facebook":
      return "Facebook";
    case "instagram":
      return "Instagram";
    case "friend-family":
      return "Friends or Family";
    case "tummy-time":
      return "Tummy Time";
    case "other":
      return "Other";
    default:
      return "Other";
  }
};
const POST = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const phone = data.get("phone");
  const email = data.get("email");
  const birthDate = data.get("birthDate");
  const hearAboutUs = data.get("hearAboutUs");
  const hearAboutUsOther = data.get("hearAboutUsOther");
  const location = data.get("location");
  const locationOther = data.get("locationOther");
  const referral = data.get("referral");
  const message = data.get("message");
  if (typeof email !== "string" || !validEmail(email)) {
    return new Response(
      JSON.stringify({ success: false, error: "Email is not valid. " }),
      {
        status: 500
      }
    );
  }
  if (!birthDate) {
    console.error("Birth date is required.");
    return new Response(
      JSON.stringify({
        message: "Missing required fields"
      }),
      { status: 400 }
    );
  }
  const babyAge = timeDifference(birthDate.toString());
  const body = `
      Name: ${name}
      Phone: ${phone}
      Email: ${email}
      Patient Age: ${babyAge}
      Location: ${locationOther ? locationOther : location}
      How did you hear about us: ${hearAboutUsOther ? hearAboutUsOther : hearAboutUsMap(hearAboutUs)}
      ${referral ? `Referral: ${referral}` : ""}
      Mesage: ${message}
    `;
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields"
      }),
      { status: 400 }
    );
  }
  const oooMessage = `Thank you so much for reaching out! I will be out of the office until the Spetember 22nd and will reach back out to you then. Thank you for your patience! Have a great day :)
  
  I will get back to you as I return. Looking forward to connecting!`;
  try {
    await sendEmail(name, body, false, email);
    await sendEmail(name, oooMessage, true, email);
    return new Response(
      JSON.stringify({
        success: true
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ success: false, errors: error }), {
      status: 500
    });
  }
};
function timeDifference(dateString) {
  const givenDate = new Date(dateString);
  const currentDate = /* @__PURE__ */ new Date();
  let years = currentDate.getFullYear() - givenDate.getFullYear();
  let months = currentDate.getMonth() - givenDate.getMonth();
  let days = currentDate.getDate() - givenDate.getDate();
  if (days < 0) {
    months -= 1;
    const lastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    days += lastMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const parts = [];
  if (years)
    parts.push(`${Math.abs(years)} ${Math.abs(years) > 1 ? "years" : "year"}`);
  if (months)
    parts.push(
      `${Math.abs(months)} ${Math.abs(months) > 1 ? "months" : "month"}`
    );
  if (days)
    parts.push(`${Math.abs(days)} ${Math.abs(days) > 1 ? "days" : "day"}`);
  return parts.join(", ");
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
