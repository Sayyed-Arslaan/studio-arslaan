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
    // Get the form data
    const formData = e.parameter;
    
    // Get or create the spreadsheet
    const sheet = getOrCreateSheet();
    
    // Prepare the row data with all form fields
    const rowData = [
      new Date().toLocaleString(), // Timestamp
      formData.name || '',
      formData.email || '',
      formData.phone || '',
      formData.company || '',
      formData.subject || '',
      formData.budget || '',
      formData.timeline || '',
      formData.message || '',
      formData.source || 'Portfolio Website',
      'New' // Status
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Send email notification (optional)
    sendEmailNotification(formData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Form submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Failed to submit form: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet() {
  let spreadsheet;
  
  try {
    // Try to open existing spreadsheet
    spreadsheet = SpreadsheetApp.openById(SHEET_ID);
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
    
    // Add headers
    const headers = [
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Company',
      'Project Type',
      'Budget',
      'Timeline',
      'Message',
      'Source',
      'Status'
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
    sheet.setColumnWidth(3, 180); // Email
    sheet.setColumnWidth(4, 120); // Phone
    sheet.setColumnWidth(5, 150); // Company
    sheet.setColumnWidth(6, 120); // Project Type
    sheet.setColumnWidth(7, 100); // Budget
    sheet.setColumnWidth(8, 100); // Timeline
    sheet.setColumnWidth(9, 300); // Message
    sheet.setColumnWidth(10, 100); // Source
    sheet.setColumnWidth(11, 80);  // Status
    
    // Freeze header row
    sheet.setFrozenRows(1);
  }
  
  return sheet;
}

function sendEmailNotification(formData) {
  try {
    // Replace with your email address
    const YOUR_EMAIL = 'arslaan.developer@gmail.com';
    
    const subject = `New Contact Form Submission: ${formData.subject || 'General Inquiry'}`;
    
    const body = `
New contact form submission from your portfolio website:

Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}
Project Type: ${formData.subject || 'Not provided'}
Budget: ${formData.budget || 'Not provided'}
Timeline: ${formData.timeline || 'Not provided'}

Message:
${formData.message || 'No message provided'}

Submitted at: ${new Date().toLocaleString()}
Source: ${formData.source || 'Portfolio Website'}

---
This email was automatically generated from your portfolio contact form.
    `;
    
    // Send email notification
    MailApp.sendEmail({
      to: YOUR_EMAIL,
      subject: subject,
      body: body
    });
    
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
      '$5,000 - $10,000',
      '1 month',
      'This is a test submission to verify the setup.',
      'Test',
      'Test'
    ];
    
    sheet.appendRow(testData);
    console.log('✅ Test data added successfully!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.toString());
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
    sheet.getRange(rowNumber, 11).setValue('Read'); // Status column
  } catch (error) {
    console.error('Error marking as read:', error.toString());
  }
}