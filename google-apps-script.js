/**
 * VITTORIO MILANO — GOOGLE APPS SCRIPT WEBHOOK
 * Google Sheet ID: 104sYL4M5wIJbJ6PiZlLUDfFAXXODoPFfmQAnX6gDP4c
 * Sheet Name: VM Leads
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/104sYL4M5wIJbJ6PiZlLUDfFAXXODoPFfmQAnX6gDP4c/edit
 * 2. Click on "Extensions" -> "Apps Script" in top menu.
 * 3. Delete any code inside Code.gs and paste this entire file.
 * 4. Click "Deploy" (blue button at top right) -> "New deployment".
 * 5. Click the Gear icon next to "Select type" -> select "Web app".
 * 6. Set Description: "VM Leads Webhook"
 * 7. Set "Execute as": "Me (your google account)"
 * 8. Set "Who has access": "Anyone"  <-- CRITICAL!
 * 9. Click "Deploy", then "Authorize access", choose your Google account, click Advanced -> "Go to Untitled project (unsafe)" -> Allow.
 * 10. Copy the "Web app URL" (starts with https://script.google.com/macros/s/...) and paste it in js/main.js!
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 30 seconds for other processes to finish
  lock.tryLock(30000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // If sheet has no rows yet, write headers
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp (Dubai Time)",
        "Full Name",
        "Phone / WhatsApp",
        "Email Address",
        "Commission of Interest",
        "Preferred Venue",
        "Preferred Date",
        "Preferred Time",
        "Sartorial Vision / Notes",
        "Lead Source"
      ];
      sheet.appendRow(headers);

      // Style header row
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#600C03");
      headerRange.setFontColor("#FAF8F1");
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    // Parse incoming data (handles both JSON and form data)
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    var now = new Date();
    var formattedDate = Utilities.formatDate(now, "Asia/Dubai", "yyyy-MM-dd HH:mm:ss");

    var fullName = data["Full Name"] || data["full_name"] || data["name"] || "";
    var phone = data["Phone Number"] || data["Phone / WhatsApp"] || data["phone"] || "";
    var email = data["Email Address"] || data["email"] || "";
    var service = data["Commission of Interest"] || data["service"] || "";
    var venue = data["Preferred Venue"] || data["venue"] || data["location"] || "";
    var date = data["Preferred Date"] || data["date"] || "Not specified";
    var time = data["Preferred Time"] || data["time"] || "-";
    var notes = data["Sartorial Vision / Notes"] || data["Sartorial Preferences / Notes"] || data["notes"] || "None";
    var source = data["Source"] || data["source"] || "Website Lead";

    // Append lead row
    sheet.appendRow([
      formattedDate,
      fullName,
      phone,
      email,
      service,
      venue,
      date,
      time,
      notes,
      source
    ]);

    // Format new row
    var lastRow = sheet.getLastRow();
    var newRowRange = sheet.getRange(lastRow, 1, 1, 10);
    newRowRange.setVerticalAlignment("middle");

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Lead recorded successfully",
      row: lastRow
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    name: "Vittorio Milano Leads Webhook",
    spreadsheet: "VM Leads"
  })).setMimeType(ContentService.MimeType.JSON);
}
