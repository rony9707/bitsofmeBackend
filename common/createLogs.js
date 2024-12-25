const fs = require('fs');
const path = require('path');
const getCurrentDateTime = require('./getCurrentDateTime');

function getFileNameDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

function getRoute(route) {
  switch (route) {
    case 'register':
      return "register";
    case 'login':
      return "login";
    case 'getuser':
      return "getuser";
    case 'logout':
       return "logout";
    default:
      return "invalid Route";
  }
}

function createLogs({ route, LogMessage, originalUrl, username, ip }) {

  //Create the H1 and Title of the HTML FILZE
  const title = `${getRoute(route)}_log_${getFileNameDate()}`;

  //create file name
  const fileName = `${getRoute(route)}/log_${getFileNameDate()}`;

  // Get current date and time
  const getCurrentDate = getCurrentDateTime();

  // Log Entry data to replace with HTML template
  const logEntry = `
    <tr>
      <td>${getCurrentDate}</td>
      <td>${ip}</td>
      <td>${originalUrl}</td>
      <td>${username}</td>
      <td>${LogMessage}</td>
    </tr>
  `;

  // File path where log is saved
  const filePath = `./logs/${fileName}.html`;

  // Path of the HTML create log
  const templatePath = path.join(__dirname, '../mailTemplates/createLogs.html');

  // Check if the log file for the given route and date already exists
  if (!fs.existsSync(filePath)) {
    // If the file does not exist, create it using the log template

    // Read the HTML template file that contains the base structure for logs
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    const newContent = templateContent
      .replace(/{{FILE_NAME}}/g, title)
      .replace('{{LOG_ENTRIES}}', logEntry)
    fs.writeFileSync(filePath, newContent, 'utf8');
  } else {
    // If the log file already exists, update it by appending the new log entry

    // Read the existing content of the log file
    const existingContent = fs.readFileSync(filePath, 'utf8');

    const updatedContent = existingContent.replace('</tbody>', `${logEntry}</tbody>`);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
  }

}


module.exports = createLogs;
