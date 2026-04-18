import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  throw new Error("Missing RESEND_API_KEY environment variable.");
}

const resend = new Resend(resendApiKey);

export default resend;