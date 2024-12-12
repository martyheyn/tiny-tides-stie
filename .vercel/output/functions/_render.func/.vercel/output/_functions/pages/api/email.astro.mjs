import nodemailer from 'nodemailer';
export { r as renderers } from '../../chunks/_@astro-renderers_B5H1KkQD.mjs';

function validEmail(email) {
  return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)
}

async function sendEmail(name, body) {
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
    from: `Website Inquiry`,
    to: SMTP_USER,
    subject: `New Inquiry: ${name}`,
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

const POST = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const phone = data.get("phone");
  const email = data.get("email");
  const message = data.get("message");
  if (typeof email !== "string" || !validEmail(email)) {
    return new Response(
      JSON.stringify({ success: false, error: "Email is not valid. " }),
      {
        status: 500
      }
    );
  }
  const body = `
      Name: ${name}
      Phone: ${phone}
      Email: ${email}
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
  try {
    await sendEmail(name, body);
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
