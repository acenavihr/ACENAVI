import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, timezone, preferredTimes, message } = body

    // Validate required fields
    if (!name || !email || !timezone || !preferredTimes) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email to your team
    const teamEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1F44FF; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🎯 New Custom Demo Request</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280;">Name:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                    ${name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280;">Email:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                    <a href="mailto:${email}" style="color: #1F44FF; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280;">Timezone:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                    ${timezone}
                  </td>
                </tr>
              </table>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0 0 10px 0;"><strong style="color: #6b7280;">Preferred Times:</strong></p>
              <p style="margin: 0; white-space: pre-wrap; background: #f9fafb; padding: 15px; border-radius: 6px; border-left: 4px solid #1F44FF;">${preferredTimes}</p>
            </div>
            
            ${message ? `
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0;"><strong style="color: #6b7280;">Additional Message:</strong></p>
                <p style="margin: 0; white-space: pre-wrap; background: #f9fafb; padding: 15px; border-radius: 6px;">${message}</p>
              </div>
            ` : ''}
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">
                💡 <strong>Quick Action:</strong> Reply directly to this email to reach ${name} at ${email}
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
            <p>ACENAVI Custom Booking System</p>
          </div>
        </body>
      </html>
    `

    // Email to customer (confirmation)
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1F44FF; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">✅ Request Received!</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
            <p style="font-size: 16px; margin-top: 0;">Hi ${name},</p>
            
            <p style="font-size: 16px;">Thank you for your interest in ACENAVI! We've received your custom demo request and will reach out within <strong>24 hours</strong> to schedule a time that works perfectly for you.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 14px;"><strong>Your Request Details:</strong></p>
              
              <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 10px;">
                <p style="margin: 0; font-size: 14px;"><strong>Timezone:</strong> ${timezone}</p>
              </div>
              
              <div style="background: #f9fafb; padding: 15px; border-radius: 6px;">
                <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Your Preferred Times:</strong></p>
                <p style="margin: 0; font-size: 14px; white-space: pre-wrap; color: #6b7280;">${preferredTimes}</p>
              </div>
            </div>
            
            <div style="background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #1F44FF; margin: 20px 0;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                <strong>What's Next?</strong><br>
                Our team will review your availability and send you calendar invite options that match your timezone and schedule.
              </p>
            </div>
            
            <p style="font-size: 16px;">In the meantime, feel free to explore our <a href="https://acenavi.in" style="color: #1F44FF; text-decoration: none;">website</a> or reply to this email with any questions.</p>
            
            <p style="font-size: 16px;">Looking forward to showing you how ACENAVI can transform your HR operations!</p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 14px;">
                Best regards,<br>
                <strong>The ACENAVI Team</strong>
              </p>
              <p style="margin: 10px 0 0 0; font-size: 14px;">
                <a href="mailto:contact@acenavi.in" style="color: #1F44FF; text-decoration: none;">contact@acenavi.in</a><br>
                <a href="https://acenavi.in" style="color: #1F44FF; text-decoration: none;">acenavi.in</a>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
            <p>© 2025 ACENAVI. All rights reserved.</p>
          </div>
        </body>
      </html>
    `

    // Send email to your team
    await resend.emails.send({
      from: 'ACENAVI <contact@acenavi.in>',
      to: 'acenavidemo@gmail.com',
      replyTo: email,
      subject: `🎯 Custom Demo Request from ${name} (${timezone})`,
      html: teamEmailHtml,
    })

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'ACENAVI <contact@acenavi.in>',
      to: email,
      subject: '✅ We Received Your ACENAVI Demo Request',
      html: customerEmailHtml,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending custom booking email:', error)
    return NextResponse.json(
      { error: 'Failed to send request' },
      { status: 500 }
    )
  }
}