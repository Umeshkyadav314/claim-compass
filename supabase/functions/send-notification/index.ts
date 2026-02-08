import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface NotificationRequest {
  recipientEmail: string;
  insuredName: string;
  policyNumber: string;
  lossDate: string;
  submissionId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { recipientEmail, insuredName, policyNumber, lossDate, submissionId }: NotificationRequest = await req.json();

    if (!recipientEmail || !insuredName || !policyNumber) {
      throw new Error("Missing required fields");
    }

    // Check if Resend API key is configured
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.log("RESEND_API_KEY not configured - skipping email notification");
      return new Response(
        JSON.stringify({ success: true, message: "Email notifications not configured" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailResponse = await resend.emails.send({
      from: "ACORD Claims <noreply@resend.dev>", // Use resend.dev for testing
      to: [recipientEmail],
      subject: `Auto Loss Notice Submitted - ${policyNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a1a1a;">Auto Loss Notice Submitted</h1>
          <p>A new Automobile Loss Notice has been submitted with the following details:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Insured Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e5e5;">${insuredName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Policy Number:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e5e5;">${policyNumber}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Date of Loss:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e5e5;">${lossDate || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Submission ID:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e5e5;">${submissionId}</td>
            </tr>
          </table>
          
          <p style="color: #666;">This is an automated notification from the ACORD Auto Loss Notice system.</p>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">ACORD 2 (2016/10) © 1988-2016 ACORD CORPORATION</p>
        </div>
      `,
    });

    console.log("Notification email sent:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, emailResponse }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
