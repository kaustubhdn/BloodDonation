const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

app.get('/convert', async (req, res) => {
    const videoURL = req.query.videoURL;

    try {
        // Get the video info to extract the audio stream
        const videoInfo = await ytdl.getInfo(videoURL);
        const audioURL = ytdl.chooseFormat(videoInfo.formats, { quality: 'highestaudio' }).url;
        console.log("Video Info:", videoInfo);
        // Return the audio URL to the client
        res.json({ success: true, audioURL });
    } catch (error) {
        console.error("Error converting video to audio:", error);
        res.json({ success: false });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
