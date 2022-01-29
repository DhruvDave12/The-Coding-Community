const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req,res) => {
    res.send("Connected to backend");
})

app.post('/check-connection', (req,res) => {
    console.log("You have connected React with Node successfully");
    res.redirect('/');
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})


