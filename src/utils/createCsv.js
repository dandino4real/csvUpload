// const fs = require('fs').promises;
// const path = require('path');
// const randomstring = require('randomstring');
// const { createWriteStream } = require('fs');

// // Constants and configuration
// const numEntries = 1000000;

// const dataDir = 'data';
// const filePath = path.join(dataDir, 'data.csv');

// // Ensure the data directory exists
// async function ensureDataDir() {
//   try {
//     await fs.mkdir(dataDir);
//   } catch (err) {
//     if (err.code !== 'EEXIST') {
//       throw err;
//     }
//   }
// }

// // Function to generate a random MSISDN starting with '080', '070', or '081'
// function generateMSISDN() {
//   const prefixes = ['080', '070', '081'];
//   const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];

//   return randomPrefix + randomstring.generate({
//     length: 7,
//     charset: 'numeric'
//   });
// }

// // Function to generate a random quantity
// function generateQuantity() {
//   return Math.floor(Math.random() * 100) + 1;
// }

// // Function to generate a random narration
// function generateNarration() {
//   return randomstring.generate({
//     length: 50,
//     charset: 'alphanumeric'
//   });
// }

// // Main function to generate and write entries
// async function generateEntries() {
//   await ensureDataDir();

//   const writeStream = createWriteStream(filePath, { encoding: 'utf-8' });

//   // Write header to the CSV file
//   writeStream.write('MSISDN,quantity,narration\n');

//   // Generate and write entries to the CSV file
//   for (let i = 0; i < numEntries; i++) {
//     const entry = `${generateMSISDN()},${generateQuantity()},${generateNarration()}\n`;
//     writeStream.write(entry);
//   }

//   // Close the WriteStream
//   writeStream.end();

//   console.log(`CSV file with ${numEntries} entries generated at: ${filePath}`);
// }

// // Run the main function
// generateEntries();



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