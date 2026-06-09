import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const PLAN_DETAILS = {
  hobby: { name: 'Hobby', credits: 50 },
  pro: { name: 'Pro', credits: 150 },
  studio: { name: 'Studio', credits: 350 },
};

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 622 218" style="height:48px;width:auto;display:block;">
  <defs><style>.st0{fill:#e68734}.st1{fill:#fff}</style></defs>
  <rect class="st0" x="551.4" y="22.8" width="4.7" height="20.5" rx="2.3" ry="2.3" transform="translate(7.6 130.2) rotate(-13.5)"/>
  <rect class="st0" x="565.7" y="32.8" width="21.2" height="4.7" rx="2.1" ry="2.1" transform="translate(247.7 509.9) rotate(-58.8)"/>
  <path class="st0" d="M529.4,75.5v2c0,.2.2.4.5.4s.2,0,.3,0c2.5-2.3,6.2-5.5,11-9.6,1.6-1.4,3.6-2.1,6-2.1,5.6,0,9.5,2.4,11.6,7.7,0,0,.2.2.4,0h0c9.2-8.9,24.5-5.9,21.2,9.8-.8,3.9-1.6,8.1-2.2,12.6-.4,3.1-.5,5.6-.2,7.3,0,.8.4,1.5.8,2.1,8.9,14.2,10.9,27.7,5,43.8-4,10.7-8.9,20.3-14.7,28.7-4.4,6.4-17.2,9.5-25,10.1-10.7.9-21.3-.8-30.2-7.1-4.2-3-8.1-7.4-11.8-13.4-4.9-7.9-8.6-16.5-8.6-25.8v-19.3c0-10.1,2.6-15.1,9.9-21.2.4-.3.6-.8.6-1.3v-26.7c0-3.4,2.5-7.5,5.1-10.4,3.9-4.3,8.1-9,12.6-14.2,2.2-2.5,4.3-4.1,6.4-4.8,5.3-1.7,10.5.5,13.3,5.4,2.7,4.8,1.2,10-2.6,14.2-1.8,2-4.8,5.4-8.9,10.2-.4.4-.6,1-.6,1.6h.1ZM508.8,96.1c0,.2.1.3.3.3h.2l15.1-13.3c.3-.2.4-.6.4-.9v-8.4c0-.8.3-1.5.9-2.1,2.6-2.7,6-6.6,10.2-11.7,4.8-5.8,1-12.9-6.3-11.3-1,.2-2.2,1.2-3.8,2.9-6.4,7.2-11.5,13.1-15.2,17.8-.4.5-.7,1.1-1,1.7-.5,1.5-.8,2.8-.8,4,0,8,0,15.1-.1,21.1h0ZM556.6,135.7c3.3,2.1,5.2,4.7,5.8,7.8,1.8,9.7-8.3,17.2-16.6,12.2-2.3-1.4-6.5-4.5-12.6-9.3-.2-.2-.9.3-2,1.5-.9.9-2.3,1-3.3.2h0c-1-.9-1.1-2.4-.3-3.4,0,0,0-.1.2-.2l3.5-3.3c.8-.8,2.1-.9,3-.2,7.4,5.7,11.9,9.1,13.6,10.2,5.7,3.9,12.4-2.3,9.5-8.3-.4-.8-1.7-2.1-4-3.9-9.5-7.4-14.8-11.4-15.7-12-2.1-1.5-4.1-1.5-5.8,0-4.5,4-8.1,7.2-10.9,9.6-.9.8-2.3.7-3.1-.2h0c-.8-1-.7-2.4.2-3.3,3.9-3.7,7.5-7,10.9-9.8,4.7-4,8.8-2.3,13.5,1.5,2.1,1.7,4.2,3.3,6.4,4.8,3.8,2.6,8.5,1.6,10.2-2.8,1.6-4-.7-6.7-4.1-9.2-2.8-1.9-8.5-6.2-17.1-12.9-1.1-.8-2.6-.8-3.6,0l-14.1,12.4c-.9.8-2.3.7-3.2-.2h0c-.8-1.1-.7-2.5.2-3.3,8.7-7.7,20.2-17.9,34.5-30.5,2.5-2.2,3.5-4.5,3-6.9-1-4.8-5.5-6.4-9.8-4.4-.3,0-.5.3-.7.5-14.8,12.9-27.9,24.5-39.3,34.6-5.4,4.8-6.7,8.5-6.6,15.6v20.1c0,2.7.2,4.7.6,6.1,3.7,12.7,11.8,27.4,24.6,32.2,11.5,4.4,23.5,3.9,36-1.3,2.4-1,5.4-3.2,6.8-5.4,3.4-5.2,6.6-10.9,9.4-17.2,6.6-14.7,10-26.6,3.2-41.1-.8-1.6-2.4-4.7-4.8-9.1-.4-.7-.6-1.4-.7-2.1-1-7,1.2-15.9,2.7-23.3.4-2,0-3.9-.9-5.6-2.7-4.7-10.6-1-13,1.9-6.9,8.3-9.4,20.2-10.5,31,0,.3,0,.6.4.8,2.7,1.9,5.4,3.9,7.9,6.1,7,5.9,5.1,16.1-3.2,19.5-.2,0-.3.3-.2.5,0,0,0,.1,0,.2v-.2ZM549.5,91.1l-9.6,8.5c-.2.2-.2.6,0,.8h0l6.3,4.7h.4c0,0,3.5-13.6,3.5-13.6,0-.2,0-.5-.3-.5h-.4,0Z"/>
  <rect class="st0" x="577.1" y="52.2" width="21.4" height="4.6" rx="2.2" ry="2.2" transform="translate(3.8 140.8) rotate(-13.7)"/>
  <path class="st1" d="M112,119.6c0,3.1,0,5.5.6,7.2.9,3.4,5,4.2,7.4,2.6,3.1-2.1,2.3-7.9.8-10.7-4.1-7.7-12.5-11.4-16.5-19.2-3.1-5.9-3.5-12.3-1.4-19.2,2.7-9,14.4-10.9,21.7-8,7.7,3,9.1,10.5,9.1,18s-.3.7-.7.7h-9.6c-.4,0-.7-.3-.7-.7h0c0-3.1,0-7.7-3.7-8.3-3.5-.6-5.5,1-6,4.9-1.2,9.2,10.8,15.5,15.9,22.7,4.3,5.9,5.6,12.5,4.1,19.6-2.2,10.5-12.3,13.7-21.7,11-9.3-2.7-10.8-12.2-10.2-20.5,0-.3.3-.6.6-.6h9.5c.3,0,.6.3.6.6h.2Z"/>
  <path class="st0" d="M271.7,94.8c-.1-2.4,1-9.7-2.5-12.3-.3-.2-.6-.4-.9-.4-4.3-1-6.8,1.5-6.8,5.5-.1,12.5-.1,24.8,0,37,0,3.1,1.5,5.7,5,5.8,4.1.1,4.9-3.2,5.1-7.1v-8.3c0-.4.3-.7.7-.7h9.1c.5,0,.9.4.9.8v9.9c-.6,10.9-6.1,16.1-16.6,15.9-10.1-.3-15.3-5.7-15.6-16.4v-35.9c0-11.9,7-18.7,19.1-17.1,13,1.7,13.6,12.4,13.2,23.4,0,.4-.3.7-.7.7h-9.3c-.4,0-.7-.3-.7-.7h0Z"/>
  <path class="st0" d="M354.2,125.9c0,8.3-6.7,14.9-14.9,14.9h-2.9c-8.3,0-14.9-6.7-14.9-14.9h0v-39.7c0-8.3,6.7-14.9,14.9-14.9h2.9c8.3,0,14.9,6.7,14.9,14.9h0v39.7ZM342.9,86.8c0-2.7-2.2-5-4.9-5h-.3c-2.7,0-5,2.2-5,4.9h0v38.6c0,2.7,2.2,5,4.9,5h.3c2.7,0,5-2.2,5-4.9h0v-38.6Z"/>
  <path class="st1" d="M57.5,140h-28.6c-.3,0-.5-.2-.5-.5v-66.9c0-.3.2-.5.5-.5h28.6c.3,0,.5.2.5.5h0v9.4c0,.3-.2.5-.5.5h-17.1c-.3,0-.5.2-.5.5v16.8c0,.3.2.5.5.5h13.4c.3,0,.5.2.5.5v9.5c0,.3-.2.5-.5.5h-13.4c-.3,0-.5.2-.5.5h0v17.8c0,.3.2.5.5.5h17.1c.3,0,.5.2.5.5v9.2c0,.3-.2.5-.5.5v.2Z"/>
  <path class="st1" d="M87.8,140c-.3,0-.6-.2-.7-.6l-1.6-10.8c0-.4-.4-.7-.8-.7h-11c-.3,0-.6.2-.6.5l-1.6,10.9c0,.3-.3.6-.7.6h-9.4c-.3,0-.6-.3-.6-.6h0l10.7-66.7c0-.3.3-.6.7-.6h15.1c.4,0,.7.3.8.7l10.6,66.5c0,.4-.2.7-.6.8h-10.4,0ZM79.3,118h4.3c0,0,.2,0,.2-.2h0c-2.8-19.5-4.3-29.3-4.4-29.3s-1.7,9.8-4.5,29.3c0,0,0,.2.2.3h4.3,0Z"/>
  <path class="st1" d="M154.5,100.2l7.2-27.5c.1-.4.5-.7.9-.7h9.5c.4,0,.7.3.7.7v.2l-13.1,43.9c-.1.4-.2.9-.2,1.3v21.1c0,.4-.3.6-.7.6h-10.2c-.4,0-.6-.3-.7-.6v-18.8c0-1.7-.2-3.2-.5-4.3-3.7-12.7-8-27.2-12.9-43.5,0-.3,0-.7.4-.8h11c.3,0,.7.2.7.6l7.3,27.6c0,0,.2.2.3.2,0,0,.2,0,.2-.2v.2Z"/>
  <path class="st0" d="M193.5,123l7.4-50.2c0-.4.4-.8.9-.8h8.9c.5,0,1,.4,1,1v.2l-10.6,66.4c0,.3-.3.5-.5.5h-15.2c-.3,0-.5-.2-.6-.5l-10.7-66.6c0-.4.2-.8.6-.9h10.2c.2,0,.5.2.5.4l8.1,50.5h0Z"/>
  <path class="st0" d="M244.4,129.7c.4,0,.7.3.7.7v9c0,.4-.3.7-.7.7h-28.2c-.4,0-.7-.3-.7-.7h0v-66.9c0-.2.2-.4.4-.4h28.6c.3,0,.6.3.6.6h0v9.2c0,.3-.3.6-.6.6h-17.1c-.2,0-.4.2-.4.4v17c0,.3.2.5.5.5h13c.5,0,1,.5,1,1v8.9c0,.3-.3.6-.6.6h-13.3c-.3,0-.5.2-.5.5h0v17.8c0,.3.2.5.5.5h16.9,0Z"/>
  <path class="st0" d="M301.6,72h16.1c.3,0,.5.2.5.5v9.3c0,.3-.2.6-.5.6h-10.1c-.2,0-.4.2-.4.4v56.5c0,.3-.2.6-.5.6h-10.2c-.3,0-.6-.3-.5-.6v-56.5c0-.2-.2-.4-.4-.4h-10.1c-.3,0-.6-.2-.6-.5h0v-9.3c0-.3.2-.5.5-.5h16.2Z"/>
  <path class="st0" d="M386.7,106.5c-.1,0-.2.3-.1.4h.1c3.3,2.2,5.2,5.3,5.7,9.5.4,3.8.6,8.7.4,14.6,0,3,.3,5.8,1.1,8.3,0,.3,0,.5-.3.6h-10.8c-.3,0-.6-.2-.7-.6-1.4-7.1-.7-14.7-1-21.1-.1-2.5-1.8-4.6-4.3-5.3l-2.6-.7c-1.1-.3-2.2.4-2.5,1.5v25.6c0,.3-.2.5-.5.5h-10.5c-.3,0-.5-.2-.5-.5h0v-67.1c0-.2.2-.4.3-.4h13.8c5.7,0,9.7.7,12.1,2.1,6.8,4,6.5,12.6,6.1,19.9-.2,4.8-1.5,10.1-5.9,12.5v.2ZM371.6,82.8v19c0,.2.2.4.5.4h3.7c3,0,5.5-2.5,5.5-5.6h0v-8.7c0-3.1-2.5-5.6-5.5-5.6h-3.7c-.2,0-.4.2-.4.4h-.1Z"/>
  <path class="st1" d="M438,127.9h-10.9c-.3,0-.6.2-.6.6l-1.8,11c0,.3-.3.5-.6.6h-9.3c-.4,0-.6-.3-.6-.7h0l10.6-66.7c0-.3.3-.5.6-.5h15.2c.3,0,.6.2.6.5l10.7,66.7c0,.4-.2.7-.5.7h-10.3c-.3,0-.6-.2-.6-.6l-1.8-11c0-.3-.3-.5-.6-.6h-.1ZM432.5,118h4.2c.1,0,.2,0,.2-.2h0c-2.8-19.4-4.3-29.2-4.4-29.2-.2,0-1.7,9.7-4.5,29.2,0,0,0,.2.2.3h4.3Z"/>
  <rect class="st1" x="456" y="72" width="11.3" height="68" rx=".6" ry=".6"/>
  <rect class="st1" x="398.8" y="129.8" width="10.9" height="10.9" rx=".7" ry=".7"/>
</svg>`;

export async function sendWelcomeEmail({ email, plan }) {
  const planInfo = PLAN_DETAILS[plan] || { name: 'Pro', credits: 150 };

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to EasyVector.ai</title>
</head>
<body style="margin:0;padding:0;background-color:#0f0f0f;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f0f0f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#1a1a1a;border-radius:8px;overflow:hidden;max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background-color:#1a1a1a;padding:24px 36px 20px;border-bottom:2px solid #e68734;">
              ${LOGO_SVG}
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px;">
              <h2 style="color:#ffffff;font-size:20px;margin:0 0 14px;font-weight:500;">Welcome aboard!</h2>
              <p style="color:#cccccc;font-size:14px;line-height:1.7;margin:0 0 24px;">
                Your <strong style="color:#e68734;">${planInfo.name} plan</strong> is now active and you have <strong style="color:#ffffff;">${planInfo.credits} credits</strong> ready to use.
              </p>

              <!-- Getting started box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#252525;border-radius:6px;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px;">
                    <p style="color:#e68734;font-size:12px;font-weight:bold;letter-spacing:1px;margin:0 0 14px;text-transform:uppercase;">Getting started</p>
                    <table cellpadding="0" cellspacing="0">
                      <tr><td style="padding:5px 0;"><span style="color:#e68734;font-size:14px;margin-right:10px;">1.</span><span style="color:#cccccc;font-size:14px;">Go to your <a href="https://easyvector.ai/dashboard" style="color:#e68734;text-decoration:underline;">dashboard</a></span></td></tr>
                      <tr><td style="padding:5px 0;"><span style="color:#e68734;font-size:14px;margin-right:10px;">2.</span><span style="color:#cccccc;font-size:14px;">Drag and drop your bitmap image (JPG, PNG, BMP, GIF, TIFF, WebP)</span></td></tr>
                      <tr><td style="padding:5px 0;"><span style="color:#e68734;font-size:14px;margin-right:10px;">3.</span><span style="color:#cccccc;font-size:14px;">Choose your output format — SVG, PDF, EPS, or DXF</span></td></tr>
                      <tr><td style="padding:5px 0;"><span style="color:#e68734;font-size:14px;margin-right:10px;">4.</span><span style="color:#cccccc;font-size:14px;">Hit Trace Image and download your vector file</span></td></tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background-color:#e68734;border-radius:4px;">
                    <a href="https://easyvector.ai/dashboard" style="display:inline-block;padding:12px 28px;color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;letter-spacing:1px;text-transform:uppercase;">Go to Dashboard</a>
                  </td>
                </tr>
              </table>

              <p style="color:#cccccc;font-size:14px;line-height:1.7;margin:0 0 6px;">
                If you run into any problems or have questions, just reply to this email — we're here to help.
              </p>
              <p style="color:#cccccc;font-size:14px;line-height:1.7;margin:0;">
                Thanks for signing up,<br/>
                <span style="color:#ffffff;">The EasyVector Support Team</span><br/>
                <span style="color:#888888;font-size:12px;">support@easyvector.ai</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 36px;border-top:1px solid #2a2a2a;">
              <p style="color:#555555;font-size:11px;margin:0;line-height:1.6;">
                EasyVector.ai is a product of Signsaver Ltd, registered in the UK.<br/>
                You're receiving this because you signed up at <a href="https://easyvector.ai" style="color:#555555;">easyvector.ai</a>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const { data, error } = await resend.emails.send({
    from: 'EasyVector.ai <support@easyvector.ai>',
    to: email,
    subject: `Welcome to EasyVector.ai — your ${planInfo.name} plan is active`,
    html,
  });

  if (error) {
    console.error('Failed to send welcome email:', error);
    throw error;
  }

  console.log('Welcome email sent to', email, '— ID:', data?.id);
  return data;
}
