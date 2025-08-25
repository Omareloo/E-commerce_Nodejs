export const signUp =(link ,name) =>  `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Activation</title>
  <style>
    /* Base styles */
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333333;
      background-color: #f7f7f7;
      margin: 0;
      padding: 0;
    }
    
    /* Email container */
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
    }
    
    /* Header section */
    .header {
      background-color: #2563eb;
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    
    /* Content section */
    .content {
      padding: 30px;
    }
    
    .content h2 {
      color: #2563eb;
      margin-top: 0;
      font-size: 20px;
    }
    
    .content p {
      margin-bottom: 20px;
      font-size: 15px;
    }
    
    /* Activation button */
    .activate-btn {
      display: inline-block;
      background-color: #2563eb;
      color: white !important;
      text-decoration: none;
      padding: 12px 30px;
      border-radius: 6px;
      font-weight: 600;
      margin: 25px 0;
      text-align: center;
      transition: background-color 0.3s;
    }
    
    .activate-btn:hover {
      background-color: #1d4ed8;
    }
    
    /* Footer section */
    .footer {
      background-color: #f1f5f9;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
    }
    
    /* Mobile responsiveness */
    @media only screen and (max-width: 600px) {
      .container {
        width: 100%;
        border-radius: 0;
      }
      
      .content {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Our Service!</h1>
    </div>
    
    <div class="content">
      <h2>Account Activation Required</h2>
      
      <p>Dear <strong>${name}</strong>,</p>
      
      <p>Thank you for registering with us. To complete your registration, please activate your account by clicking the button below:</p>
      
      <div style="text-align: center;">
        <a href="${link}" class="activate-btn">Activate Account</a>
      </div>
      
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p style="word-break: break-all; color: #2563eb; font-size: 14px; background-color: #f1f5f9; padding: 10px; border-radius: 4px;">${link}</p>
      
      <p>If you didn't request this account, please ignore this email.</p>
      
      <p>Best regards,<br>Support Team</p>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      <p><a href="#" style="color: #2563eb; text-decoration: none;">Unsubscribe</a> | <a href="#" style="color: #2563eb; text-decoration: none;">Privacy Policy</a></p>
    </div>
  </div>
</body>
</html>
`