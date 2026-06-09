import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const PLAN_DETAILS = {
  hobby: { name: 'Hobby', credits: 50 },
  pro: { name: 'Pro', credits: 150 },
  studio: { name: 'Studio', credits: 350 },
};

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
            <td style="background-color:#1a1a1a;padding:32px 40px 24px;border-bottom:2px solid #f97316;">
              <h1 style="margin:0;font-size:28px;letter-spacing:2px;">
                <span style="color:#ffffff;font-weight:900;">EASY</span><span style="color:#f97316;font-weight:900;">VECTOR</span><span style="color:#f97316;font-weight:900;">.AI</span>
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="color:#ffffff;font-size:22px;margin:0 0 16px;">Welcome aboard!</h2>
              <p style="color:#cccccc;font-size:15px;line-height:1.6;margin:0 0 24px;">
                Your <strong style="color:#f97316;">${planInfo.name} plan</strong> is now active and you have <strong style="color:#ffffff;">${planInfo.credits} credits</strong> ready to use.
              </p>

              <!-- Getting started box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#252525;border-radius:6px;margin-bottom:32px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="color:#f97316;font-size:13px;font-weight:bold;letter-spacing:1px;margin:0 0 16px;text-transform:uppercase;">Getting Started</p>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;">
                          <span style="color:#f97316;font-size:15px;margin-right:10px;">1.</span>
                          <span style="color:#cccccc;font-size:15px;">Go to your <a href="https://easyvector.ai/dashboard" style="color:#f97316;text-decoration:none;">dashboard</a></span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;">
                          <span style="color:#f97316;font-size:15px;margin-right:10px;">2.</span>
                          <span style="color:#cccccc;font-size:15px;">Drag and drop your bitmap image (JPG, PNG, BMP, GIF, TIFF, WebP)</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;">
                          <span style="color:#f97316;font-size:15px;margin-right:10px;">3.</span>
                          <span style="color:#cccccc;font-size:15px;">Choose your output format — SVG, PDF, EPS, or DXF</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;">
                          <span style="color:#f97316;font-size:15px;margin-right:10px;">4.</span>
                          <span style="color:#cccccc;font-size:15px;">Hit Trace Image and download your vector file</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background-color:#f97316;border-radius:4px;">
                    <a href="https://easyvector.ai/dashboard" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:bold;text-decoration:none;letter-spacing:1px;text-transform:uppercase;">Go to Dashboard</a>
                  </td>
                </tr>
              </table>

              <p style="color:#cccccc;font-size:15px;line-height:1.6;margin:0 0 8px;">
                If you run into any problems or have questions, just reply to this email — you'll reach me directly.
              </p>
              <p style="color:#cccccc;font-size:15px;line-height:1.6;margin:0;">
                Thanks for signing up,<br/>
                <span style="color:#ffffff;">Jamie</span><br/>
                <span style="color:#888888;font-size:13px;">EasyVector.ai</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #2a2a2a;">
              <p style="color:#555555;font-size:12px;margin:0;line-height:1.6;">
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
