
// module.exports = router;
const express = require('express');
const multer = require('multer');
const csvParser = require('fast-csv');
const mongoose = require('mongoose');
const stream = require('stream');
const util = require('util');
const EntryModel = require('../models/csvModel');
const pipeline = util.promisify(require('stream').pipeline);

const router = express.Router();

// Set up Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to normalize MSISDN to international format
function convertMSISDN(msisdn) {
  return `+234${msisdn.slice(1)}`;
}

// Function to process the CSV file
async function parseCSV(buffer) {
  const entries = [];

  return new Promise((resolve, reject) => {
    const readStream = new stream.Readable();
    readStream._read = () => {};
    readStream.push(buffer);
    readStream.push(null);

    readStream
      .pipe(csvParser.parse({ headers: true }))
      .on('data', (row) => {
        const msisdn = convertMSISDN(row.MSISDN);

        entries.push({
          msisdn,
          quantity: parseInt(row.quantity),
          narration: row.narration,
        });
      })
      .on('end', () => resolve(entries))
      .on('error', reject);
  });
}

router.post('/upload', upload.single('csvFile'), async (req, res) => {
  try {
    // Check if a file is provided
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Stream and parse the CSV file
    const entries = await parseCSV(req.file.buffer);

 

    // Save entries to the database in batches
    const batchSize = 100; // Adjust as needed
    for (let i = 0; i < entries.length; i += batchSize) {
      const batch = entries.slice(i, i + batchSize);

    

      await EntryModel.insertMany(batch);
    }

    res.status(200).send('File uploaded, and entries saved to the database.');
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error processing the file: ${error.message}`);
  }
});

module.exports = router;
