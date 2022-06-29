const SMTPServer = require("smtp-server").SMTPServer;
const simpleParser = require("mailparser").simpleParser;
const fs = require("fs");
const linkParser = require("./linkParser");
const { bot } = require("./TelegramBot");
let linkCount = 0;

const HOST = "0.0.0.0";
// const PORT = 2525;
const PORT = 4650;
// const HOST = "192.168.89.255";

function onData(stream, session, callback) {
    simpleParser(stream, {})
        .then(async (parsed) => {
            try {
                const link = linkParser(parsed.text);
                linkCount++;
                console.log(parsed.to.text + " " + linkCount);
                // admins.forEach((admin) => {
                //     bot.sendMessage(admin, linkCount + "\n" + link);
                // });
                fs.appendFileSync("links.txt", `${link}\n`);
                fs.writeFileSync(
                    `./letters/${parsed.to.text}.json`,
                    JSON.stringify(parsed, null, 2)
                );
                callback();
            } catch (err) {
                callback();
            }
        })
        .catch((err) => {
            console.log(err);
            callback(err);
        });
}

const server = new SMTPServer({
    secure: true,
    key: fs.readFileSync("./cert/privkey1.pem"),
    cert: fs.readFileSync("./cert/cert1.pem"),
    onData,
    authOptional: true,
    disabledCommands: ["AUTH"],
});

server.listen(PORT, HOST, () => {
    console.log("Server works!");
});
