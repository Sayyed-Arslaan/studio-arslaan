/**
 * Google Apps Script for Contact Form Integration
 * 
 * Setup Instructions:
 * 1. Go to https://script.google.com/
 * 2. Create a new project and name it "Portfolio Contact Form"
 * 3. Replace the default code with this script
 * 4. Create a Google Sheet for storing submissions
 * 5. Get the Sheet ID from the URL (the long string between /d/ and /edit)
 * 6. Replace 'YOUR_SHEET_ID_HERE' with your actual sheet ID
 * 7. Save the script (Ctrl+S)
 * 8. Click "Deploy" > "New deployment"
 * 9. Choose "Web app" as the type
 * 10. Set execute permissions to "Anyone"
 * 11. Click "Deploy" and copy the web app URL
 * 12. Replace the GOOGLE_SCRIPT_URL in ContactForm.tsx with your web app URL
 */

// Replace with your Google Sheet ID
const SHEET_ID = 'YOUR_SHEET_ID_HERE';
const SHEET_NAME = 'Contact Form Submissions';

function doPost(e) {
  try {
    console.log('Received POST request');
    console.log('Parameters:', e.parameter);
    
    // Get the form data
    const formData = e.parameter;
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      throw new Error('Missing required fields');
    }
    
    // Get or create the spreadsheet
    const sheet = getOrCreateSheet();
    
    // Get current timestamp
    const timestamp = new Date();
    const formattedTimestamp = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    
    // Prepare the row data with all form fields
    const rowData = [
      formattedTimestamp,                    // Timestamp
      formData.name || '',                   // Name
      formData.email || '',                  // Email
      formData.phone || '',                  // Phone
      formData.company || 'Not provided',    // Company
      formData.subject || '',                // Project Type
      formData.budget || 'Not specified',   // Budget
      formData.message || '',                // Message
      formData.source || 'Portfolio Website', // Source
      'New',                                 // Status
      formData.timestamp || formattedTimestamp // Form timestamp
    ];
    
    console.log('Row data to insert:', rowData);
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Send email notification
    sendEmailNotification(formData, formattedTimestamp);
    
    console.log('Form submitted successfully');
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Form submitted successfully',
        timestamp: formattedTimestamp
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
      
  } catch (error) {
    console.error('Error processing form:', error);
    
    // Return error response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Failed to submit form: ' + error.toString(),
        details: error.stack
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Google Apps Script is working',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

function getOrCreateSheet() {
  let spreadsheet;
  
  try {
    // Try to open existing spreadsheet
    spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    console.log('Opened existing spreadsheet');
  } catch (error) {
    // If sheet doesn't exist, create a new one
    spreadsheet = SpreadsheetApp.create('Portfolio Contact Form Submissions');
    console.log('Created new spreadsheet with ID: ' + spreadsheet.getId());
    console.log('Please update SHEET_ID in the script with: ' + spreadsheet.getId());
  }
  
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    // Create the sheet if it doesn't exist
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    console.log('Created new sheet: ' + SHEET_NAME);
    
    // Add headers
    const headers = [
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Company',
      'Project Type',
      'Budget',
      'Message',
      'Source',
      'Status',
      'Form Timestamp'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format headers
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('white');
    headerRange.setHorizontalAlignment('center');
    
    // Set column widths
    sheet.setColumnWidth(1, 150); // Timestamp
    sheet.setColumnWidth(2, 120); // Name
    sheet.setColumnWidth(3, 200); // Email
    sheet.setColumnWidth(4, 130); // Phone
    sheet.setColumnWidth(5, 150); // Company
    sheet.setColumnWidth(6, 180); // Project Type
    sheet.setColumnWidth(7, 120); // Budget
    sheet.setColumnWidth(8, 300); // Message
    sheet.setColumnWidth(9, 100); // Source
    sheet.setColumnWidth(10, 80); // Status
    sheet.setColumnWidth(11, 150); // Form Timestamp
    
    // Freeze header row
    sheet.setFrozenRows(1);
    
    // Add data validation for Status column
    const statusRange = sheet.getRange(2, 10, 1000, 1);
    const statusRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['New', 'In Progress', 'Completed', 'Archived'])
      .build();
    statusRange.setDataValidation(statusRule);
  }
  
  return sheet;
}

function sendEmailNotification(formData, timestamp) {
  try {
    // Replace with your email address
    const YOUR_EMAIL = 'arslaan.developer@gmail.com';
    
    const subject = `🚀 New Contact Form: ${formData.subject || 'General Inquiry'} - ${formData.name}`;
    
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
      <div style="background: linear-gradient(135deg, #00d4ff, #8b5cf6); padding: 20px; border-radius: 10px 10px 0 0;">
        <h2 style="color: white; margin: 0; text-align: center;">New Contact Form Submission</h2>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h3 style="color: #333; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">Contact Information</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555; width: 30%;">Name:</td>
            <td style="padding: 8px 0; color: #333;">${formData.name || 'Not provided'}</td>
          </tr>
          <tr style="background: #f8f9fa;">
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
            <td style="padding: 8px 0; color: #333;"><a href="mailto:${formData.email}" style="color: #00d4ff;">${formData.email || 'Not provided'}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
            <td style="padding: 8px 0; color: #333;"><a href="tel:${formData.phone}" style="color: #00d4ff;">${formData.phone || 'Not provided'}</a></td>
          </tr>
          <tr style="background: #f8f9fa;">
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td>
            <td style="padding: 8px 0; color: #333;">${formData.company || 'Not provided'}</td>
          </tr>
        </table>
        
        <h3 style="color: #333; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">Project Details</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555; width: 30%;">Project Type:</td>
            <td style="padding: 8px 0; color: #333;">${formData.subject || 'Not provided'}</td>
          </tr>
          <tr style="background: #f8f9fa;">
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Budget:</td>
            <td style="padding: 8px 0; color: #333;">${formData.budget || 'Not specified'}</td>
          </tr>
        </table>
        
        <h3 style="color: #333; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">Message</h3>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #00d4ff;">
          <p style="margin: 0; line-height: 1.6; color: #333;">${formData.message || 'No message provided'}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
          <p><strong>Submitted:</strong> ${timestamp}</p>
          <p><strong>Source:</strong> ${formData.source || 'Portfolio Website'}</p>
          <p style="margin-top: 15px;"><em>This email was automatically generated from your portfolio contact form.</em></p>
        </div>
      </div>
    </div>
    `;
    
    const plainBody = `
New contact form submission from your portfolio website:

CONTACT INFORMATION:
Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}

PROJECT DETAILS:
Project Type: ${formData.subject || 'Not provided'}
Budget: ${formData.budget || 'Not specified'}

MESSAGE:
${formData.message || 'No message provided'}

SUBMISSION DETAILS:
Submitted: ${timestamp}
Source: ${formData.source || 'Portfolio Website'}

---
This email was automatically generated from your portfolio contact form.
    `;
    
    // Send email notification
    MailApp.sendEmail({
      to: YOUR_EMAIL,
      subject: subject,
      body: plainBody,
      htmlBody: htmlBody
    });
    
    console.log('Email notification sent successfully');
    
  } catch (error) {
    console.error('Error sending email notification:', error);
    // Don't throw error here as form submission should still succeed
  }
}

// Test function to verify setup
function testSetup() {
  try {
    const sheet = getOrCreateSheet();
    console.log('✅ Setup successful!');
    console.log('Sheet name: ' + sheet.getName());
    console.log('Spreadsheet URL: ' + sheet.getParent().getUrl());
    console.log('Spreadsheet ID: ' + sheet.getParent().getId());
    
    // Test data insertion
    const testData = [
      new Date().toLocaleString(),
      'Test User',
      'test@example.com',
      '+1234567890',
      'Test Company',
      'Web Development',
      '$10,000 - $25,000',
      'This is a test submission to verify the setup.',
      'Test',
      'Test',
      new Date().toISOString()
    ];
    
    sheet.appendRow(testData);
    console.log('✅ Test data added successfully!');
    
    return 'Setup completed successfully!';
    
  } catch (error) {
    console.error('❌ Setup failed:', error.toString());
    return 'Setup failed: ' + error.toString();
  }
}

// Function to get all submissions (for analytics)
function getAllSubmissions() {
  try {
    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    return data;
  } catch (error) {
    console.error('Error getting submissions:', error.toString());
    return [];
  }
}

// Function to mark submission as read
function markAsRead(rowNumber) {
  try {
    const sheet = getOrCreateSheet();
    sheet.getRange(rowNumber, 10).setValue('In Progress'); // Status column
    return 'Marked as read successfully';
  } catch (error) {
    console.error('Error marking as read:', error.toString());
    return 'Error: ' + error.toString();
  }
}

// Function to clear test data
function clearTestData() {
  try {
    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    
    // Find and delete test rows
    for (let i = data.length; i >= 2; i--) { // Start from bottom, skip header
      if (data[i-1][1] === 'Test User' || data[i-1][9] === 'Test') {
        sheet.deleteRow(i);
      }
    }
    
    return 'Test data cleared successfully';
  } catch (error) {
    console.error('Error clearing test data:', error.toString());
    return 'Error: ' + error.toString();
  }
}