const express = require("express");
const https = require("https");
const fs = require("fs");
const cors = require("express-cors");
const app = express();
const PORT = 5000;
const HTTPS_PORT = 4434;

app.use(cors());
app.use(express.json());
app.use(express.static("static"));

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

app.listen(PORT, () => {
    console.log(`Server works on port ${PORT}`);
});

const sslServer = https.createServer(
    {
        key: fs.readFileSync("./cert/privkey1.pem"),
        cert: fs.readFileSync("./cert/cert1.pem"),
    },
    app
);

sslServer.listen(HTTPS_PORT, () => {
    console.log(`Server works on port ${HTTPS_PORT}`);
})

module.exports = app;
