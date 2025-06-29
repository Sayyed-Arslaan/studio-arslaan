/**
 * Google Apps Script for Contact Form Integration
 * 
 * Instructions:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Create a Google Sheet and get its ID from the URL
 * 5. Replace 'YOUR_SHEET_ID_HERE' with your actual sheet ID
 * 6. Deploy as web app with execute permissions set to "Anyone"
 * 7. Copy the web app URL and use it in your ContactForm component
 */

// Replace with your Google Sheet ID
const SHEET_ID = 'YOUR_SHEET_ID_HERE';
const SHEET_NAME = 'Contact Form Submissions';

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get or create the spreadsheet
    const sheet = getOrCreateSheet();
    
    // Prepare the row data
    const rowData = [
      new Date(), // Timestamp
      data.name || '',
      data.email || '',
      data.phone || '',
      data.company || '',
      data.subject || '',
      data.message || '',
      data.source || 'Website'
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
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
    spreadsheet = SpreadsheetApp.create('Contact Form Submissions');
    console.log('Created new spreadsheet with ID: ' + spreadsheet.getId());
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
      'Subject',
      'Message',
      'Source'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format headers
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('white');
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, headers.length);
  }
  
  return sheet;
}

// Test function to verify setup
function testSetup() {
  try {
    const sheet = getOrCreateSheet();
    console.log('Setup successful! Sheet name: ' + sheet.getName());
    console.log('Spreadsheet URL: ' + sheet.getParent().getUrl());
  } catch (error) {
    console.error('Setup failed: ' + error.toString());
  }
}

// Function to get all submissions (optional)
function getAllSubmissions() {
  try {
    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    return data;
  } catch (error) {
    console.error('Error getting submissions: ' + error.toString());
    return [];
  }
}