import axios from "axios";

const SIGNUP_EMAIL_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>You're on the LeetGo Waitlist!</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #20C030 0%, #32963C 100%); padding: 40px 30px; text-align: center;">
                            <div style="margin-bottom: 15px;">
                                <span style="display: inline-block; color: #ffffff; font-size: 48px; font-weight: 700; font-family: 'Courier New', monospace;">&lt;/&gt;</span>
                            </div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                                You're on the Waitlist!
                            </h1>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px; color: #2B412D; font-size: 24px; font-weight: 600;">
                                Thanks for joining LeetGo!
                            </h2>

                            <p style="margin: 0 0 20px; color: #366B3B; font-size: 16px; line-height: 1.6;">
                                We're excited to have you on our waitlist! LeetGo is an AI-powered platform designed to help you sharpen your data structures and algorithms skills with fresh, unique problems you've never seen before.
                            </p>

                            <p style="margin: 0 0 30px; color: #366B3B; font-size: 16px; line-height: 1.6;">
                                We're currently in development and working hard to build an exceptional experience for problem solvers like you. You'll be among the first to know when we launch!
                            </p>

                            <!-- Features Section -->
                            <div style="background-color: #f8fdf9; border-left: 4px solid #00EB17; padding: 20px; margin: 0 0 30px; border-radius: 6px;">
                                <h3 style="margin: 0 0 15px; color: #2B412D; font-size: 18px; font-weight: 600;">
                                    What to expect when we launch:
                                </h3>
                                <ul style="margin: 0; padding-left: 20px; color: #366B3B; font-size: 15px; line-height: 1.8;">
                                    <li style="margin-bottom: 8px;">Solve AI-generated DSA problems tailored to your skill level</li>
                                    <li style="margin-bottom: 8px;">Pin and star your favorite problems for later review</li>
                                    <li style="margin-bottom: 8px;">Share problems with friends and the community</li>
                                    <li style="margin-bottom: 8px;">Track your progress and improvement over time</li>
                                    <li style="margin-bottom: 0;">Practice with problems you've never encountered before</li>
                                </ul>
                            </div>

                            <!-- Info Box -->
                            <div style="background-color: #f0fdf4; border: 2px solid #20C030; padding: 20px; margin: 0 0 30px; border-radius: 8px; text-align: center;">
                                <p style="margin: 0; color: #2B412D; font-size: 16px; font-weight: 600;">
                                    We'll send you an email as soon as LeetGo is ready to go!
                                </p>
                            </div>

                            <p style="margin: 0 0 20px; color: #366B3B; font-size: 16px; line-height: 1.6;">
                                In the meantime, feel free to spread the word and invite others who might be interested in leveling up their coding skills. Remember, LeetGo is all about learning and growth—not competition.
                            </p>

                            <p style="margin: 0; color: #366B3B; font-size: 16px; line-height: 1.6;">
                                Thanks for your patience and support!<br>
                                <strong style="color: #2B412D;">The LeetGo Team</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #2B332B; padding: 30px; text-align: center;">
                            <p style="margin: 0 0 10px; color: #ffffff; font-size: 14px; opacity: 0.9;">
                                © 2026 LeetGo. All rights reserved.
                            </p>
                            <p style="margin: 0; color: #ffffff; font-size: 12px; opacity: 0.7;">
                                You received this email because you joined the LeetGo waitlist.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

const VERIFICATION_EMAIL_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - LeetGo</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #20C030 0%, #32963C 100%); padding: 40px 30px; text-align: center;">
                            <div style="margin-bottom: 15px;">
                                <span style="display: inline-block; color: #ffffff; font-size: 48px; font-weight: 700; font-family: 'Courier New', monospace;">&lt;/&gt;</span>
                            </div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                                Verify Your Email
                            </h1>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px; color: #2B412D; font-size: 24px; font-weight: 600;">
                                Almost there!
                            </h2>

                            <p style="margin: 0 0 20px; color: #366B3B; font-size: 16px; line-height: 1.6;">
                                Thanks for signing up for LeetGo! Please verify your email address by clicking the button below.
                            </p>

                            <p style="margin: 0 0 30px; color: #366B3B; font-size: 16px; line-height: 1.6;">
                                This helps us ensure the security of your account and confirm that you own this email address.
                            </p>

                            <!-- CTA Button -->
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="{{VERIFICATION_LINK}}" style="display: inline-block; background: linear-gradient(135deg, #20C030 0%, #00EB17 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; font-size: 18px; font-weight: 600; border-radius: 8px; box-shadow: 0 4px 12px rgba(32, 192, 48, 0.3);">
                                    Verify Email
                                </a>
                            </div>

                            <p style="margin: 30px 0 20px; color: #366B3B; font-size: 14px; line-height: 1.6;">
                                If the button doesn't work, copy and paste this link into your browser:
                            </p>

                            <div style="background-color: #f8fdf9; border: 1px solid #20C030; padding: 15px; border-radius: 6px; word-break: break-all;">
                                <a href="{{VERIFICATION_LINK}}" style="color: #32963C; font-size: 14px; text-decoration: none;">{{VERIFICATION_LINK}}</a>
                            </div>

                            <p style="margin: 30px 0 0; color: #888888; font-size: 14px; line-height: 1.6;">
                                If you didn't create an account with LeetGo, you can safely ignore this email.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #2B332B; padding: 30px; text-align: center;">
                            <p style="margin: 0 0 10px; color: #ffffff; font-size: 14px; opacity: 0.9;">
                                © 2026 LeetGo. All rights reserved.
                            </p>
                            <p style="margin: 0; color: #ffffff; font-size: 12px; opacity: 0.7;">
                                This verification link will expire in 24 hours.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  withCredentials: true,
});

export { API_URL, SIGNUP_EMAIL_HTML, VERIFICATION_EMAIL_HTML, axiosClient };
