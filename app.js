const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs"),
  readline = require("readline"),
  stream = require("stream");
const nodemailer = require("nodemailer");
var directTransport = require("nodemailer-direct-transport");

// async..await is not allowed in global scope, must use a wrapper
var transport = nodemailer.createTransport(
  directTransport({
    // should be the hostname machine IP address resolves to
  })
);
const cheackYahoo = async (code, userEmail) => {
  try {
    let info = await transport.sendMail({
      from: "magcano@gmail.com",
      to: userEmail,
      subject: "Hello ✔",
      text: `Your verification code Is ${code}`,
    });

    console.log("_________done___________");
    console.log(
      `_${info.rejected}____${info.response}__ ${info.envelope}_ ${info.pending}_____${userEmail}______________`
    );
    console.log(info.response);
    console.log(info.envelope);
    console.log(info.pending);
    console.log(info.rejected);

    fs.writeFileSync("succes.txt", userEmail);
  } catch (error) {
    let reasone = error.errors
      .toString()
      .includes("552 1 Requested mail action aborted, mailbox not found");

    if (reasone === true) {
      console.log("_________not good___________");
      console.log(`__________${userEmail}______________`);
      fs.writeFileSync("bounce.txt", userEmail);
    } else {
      console.log("_________some thing went wrong___________", error);
      fs.writeFileSync("bounce.txt", userEmail);
    }
  }
};

var lineReader = require("readline").createInterface({
  input: fs.createReadStream("./emails.txt", {
    highWaterMark: 10,
  }),
});

lineReader.on("line", (line) => {
  lineReader.pause(); // pause reader
  // Resume 5ms later
  setTimeout(() => {
    cheackYahoo(11, line);
    lineReader.resume();
  }, 2000);
  console.log(line);
});
// rl.on("line", function (line) {
//   //Do your stuff ...
//   //Then write to outstream
//   setTimeout(() => {
//     //cheackYahoo(11, line);
//   }, 2000);
// });

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
