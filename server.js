const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const app = express();
const port = 3000;

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/convert', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Convert the uploaded video to audio
    const inputBuffer = req.file.buffer;
    const outputPath = 'output.mp3';

    ffmpeg()
        .input(inputBuffer)
        .toFormat('mp3')
        .on('end', () => {
            // Serve the audio file for download
            res.download(outputPath, 'output.mp3', () => {
                // Delete the temporary audio file
                fs.unlinkSync(outputPath);
            });
        })
        .save(outputPath);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
