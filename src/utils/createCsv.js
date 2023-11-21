
const fs = require('fs');
const path = require('path');
const randomstring = require('randomstring');

// Function to generate a random MSISDN
function generateMSISDN() {
  return '0' + randomstring.generate({
    length: 10,
    charset: 'numeric'
  });
}

// Function to generate a random quantity
function generateQuantity() {
  return Math.floor(Math.random() * 100) + 1;
}

// Function to generate a random narration
function generateNarration() {
  return randomstring.generate({
    length: 50,
    charset: 'alphanumeric'
  });
}

// Number of entries to generate
const numEntries = 1000000;

// Directory for the data files
const dataDir = 'data';

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// File path
const filePath = path.join(dataDir, 'one_million_entries.csv');

// Create WriteStream to the CSV file
const writeStream = fs.createWriteStream(filePath);

// Write header to the CSV file
writeStream.write('MSISDN,quantity,narration\n', 'utf-8');

// Generate and write entries to the CSV file
for (let i = 0; i < numEntries; i++) {
  const entry = `${generateMSISDN()},${generateQuantity()},${generateNarration()}\n`;
  writeStream.write(entry, 'utf-8');
}

// Close the WriteStream
writeStream.end();

console.log(`CSV file with ${numEntries} entries generated at: ${filePath}`);