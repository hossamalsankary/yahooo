import fetch from "node-fetch";
import express from "express";
import fs from "fs";
import readline from "readline";
import stream from "stream";
import { Headers } from "node-fetch";
import { error } from "console";
import http from "node:http";
import https from "node:https";
import cron from "node-cron";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

var myHeaders = new Headers();
myHeaders.append("Accept", " */*");
myHeaders.append("Accept-Encoding", "gzip, deflate, br");
myHeaders.append("Accept-Language", "en-US,en;q=0.5");
myHeaders.append("Connection", "keep-alive");
myHeaders.append(
  "Cookie",
  "A3=d=AQABBCHik2ICEK43DLe9RY8POtRVVKm4UGgFEgEBAQEzlWKdYgAAAAAA_eMAAAcIIeKTYqm4UGg&S=AQAAAs84LD_4hNksYxe048L_8k8; GUC=AQEBAQFilTNinUIduwQu; A1=d=AQABBCHik2ICEK43DLe9RY8POtRVVKm4UGgFEgEBAQEzlWKdYgAAAAAA_eMAAAcIIeKTYqm4UGg&S=AQAAAs84LD_4hNksYxe048L_8k8; cmp=t=1654044398&j=0&u=1---; B=6gk5ol5h97oh1&b=3&s=d8; A1S=d=AQABBCHik2ICEK43DLe9RY8POtRVVKm4UGgFEgEBAQEzlWKdYgAAAAAA_eMAAAcIIeKTYqm4UGg&S=AQAAAs84LD_4hNksYxe048L_8k8&j=WORLD; AS=v=1&s=qMzJuwtK&d=A629d8332|DX7rROv.2SohAyZGHl8FR1BmTZs2CWuIR42fM.OVX3flFwhxol0XeKvTAcPk8ue3MhUZphjViupqF4mgm5eqJAmV4PWRabRVVIWodR6LUF0NJ5VD3t15FeP1K5S7GKLW3GamfgWBX31HXkRidweYBnml50POixQrviUSPPkCZPukYAPsFGQk3i2AKCUP1cVE8iAAHpyaDtpf5ZMoxYAansZ6T2Ma9FYUPfWxqP5pS9Nnq0sclOYZr2y2rggTUwt_P0yIbZrlKzo3tI_w6gA9OWTGO76YhKFnJOdv1rQWPBjj4jRuhy9CBBqoe0x7KdGYyqB.RjXjH_poUDan0OoDTzDRiafOKBuuapZIvp9oQdOWgzkuHmpjqy3pncVu2vKfNFfX35nyVAzMBAwh7nETPFxKaSV7nMHC9ukARgmNSdP7HMBy6BGQR7OFBSfwWYGqx_mixfNHzh_JC8ErJWS6UKjCZ5AKQ.9bT3Rzgvoq5qXV2Dj3ocOFAHcN5jR0.5jGmCk8rOtOYeUk1r97NKjCZV97FpdCvSo5tOlhSnMrEywDyRYWzlG3VS5qvxLxMJBAHvk2ldGx8u_fzPdEsuJSSXABTjPlq2oU0tgqskeL2lZqc.c5gMXYZ27XWnlwXZSDEJN6VwUjYr.znfm6jUHuRSLCUnVUME2GesxJFXQHkze2ntP352FQ6.KWzwWPrLJ9ho0uujDBiTIGFhmFnKNiZWRRRj35ICn58b2V1DfFqpT.bvOH9KZUj9degaw1KdVq1JwkW6aak3Pk7_ad5c7Jm6KzHGpSNZq64UmiGwAx2tsCKww3Kj4HBULV8fK8pucGCZQB.Jo-~A; A1=d=AQABBDEznGICEH1nD8r-Mukis_nUgiJ-cMkFEgEBAQGEnWKmYgAAAAAA_eMAAA&S=AQAAAldFkGl8ZKilBu9RdgJxDaQ; A1S=d=AQABBDEznGICEH1nD8r-Mukis_nUgiJ-cMkFEgEBAQGEnWKmYgAAAAAA_eMAAA&S=AQAAAldFkGl8ZKilBu9RdgJxDaQ&j=WORLD; A3=d=AQABBDEznGICEH1nD8r-Mukis_nUgiJ-cMkFEgEBAQGEnWKmYgAAAAAA_eMAAA&S=AQAAAldFkGl8ZKilBu9RdgJxDaQ; GUC=AQEBAQFinYRipkIf9QSg"
);
myHeaders.append("Host", "login.yahoo.com");
myHeaders.append(
  "Referer",
  "https://login.yahoo.com/account/create?.intl=us&.lang=en-US&src=ym&activity=mail-direct&pspid=159600001&.done=https%3A%2F%2Fmail.yahoo.com%2Fd&specId=yidregsimplified&done=https%3A%2F%2Fmail.yahoo.com%2Fd"
);
myHeaders.append("Sec-Fetch-Dest", "empty");
myHeaders.append("Sec-Fetch-Mode", "cors");
myHeaders.append("Sec-Fetch-Site", "same-origin");
myHeaders.append("TE", "trailers");
myHeaders.append(
  "User-Agent",
  "Mozilla/5.0 (X11; Linux x86_64; rv:101.0) Gecko/20100101 Firefox/101.0"
);
myHeaders.append("X-Requested-With", "XMLHttpRequest");

var file = "<file contents here>";

const httpAgent = new http.Agent({
  keepAlive: true,
});
const httpsAgent = new https.Agent({
  keepAlive: true,
});

var requestOptions = {
  method: "GET",
  agent: function (_parsedURL) {
    if (_parsedURL.protocol == "http:") {
      return httpAgent;
    } else {
      return httpsAgent;
    }
  },

  headers: myHeaders,

  // redirect: "follow",
};
let limit = 42;
let linenum = 0;
let speed = 150;

const yahooChecker = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(
        `https://login.yahoo.com/account/module/create/suggestions?acrumb=qMzJuwtK&yid=${email}`,
        requestOptions
      );

      resolve(response.json());
    } catch (error) {
      if (
        error.toString().includes("Unexpected token r in JSON at position 0")
      ) {
        error = "sme";
        resolve(error);
      } else {
        reject(error);
      }
    }
  });
};

const colectSuggestion = (email, fun) => {
  let suggestionListProm = [];

  let emailName = email.toString().substring(0, email.indexOf("@"));
  let emailNamewithout = email.toString().substring(0, email.indexOf("@") - 2);

  let suggs = [];
  for (let index = 0; index < limit; index++) {
    suggestionListProm.push(yahooChecker(emailNamewithout));
  }
  Promise.all(suggestionListProm)
    .then((data) => {
      suggestionListProm = [];
      data.forEach((ob) => {
        if (ob.suggestionList) {
          suggs.push(...ob.suggestionList);
        }
      });

      //console.log(suggs);
      console.log("looking in ==>" + suggs.length);

      if (suggs.includes(emailName)) {
        var logger = fs.createWriteStream("bounce.txt", {
          flags: "a", // 'a' means appending (old data will be preserved)
        });
        logger.write(`${emailName}@yahoo.com \n`);
        console.log("bounce");
        fun();
      } else {
        var logger = fs.createWriteStream("succes.txt", {
          flags: "a", // 'a' means appending (old data will be preserved)
        });
        logger.write(`${emailName}@yahoo.com \n`);
        console.log("not bounce");

        fun();
      }
    })
    .catch((error) => {
      console.log(error);
      lineReader.pause();
     

      setTimeout(() => {
        colectSuggestion(email, () => {
          console.log(
            "-----------------err-----------------------------------",
            linenum,
            "--------------------------------------------------"
          );
          lineReader.resume();
        });
      }, 20000);

      colectSuggestion(line, () => {
        console.log(
          "----------------------------------------------------",
          linenum,
          "--------------------------------------------------"
        );
      });

      // colectSuggestion(email, () => {
      //   console.log("socket hang up", "limit", limit);
      // });
      console.log("-----------------I will Pass------------------");
    });
};

//kelly_soccer35
var lineReader = readline.createInterface({
  input: fs.createReadStream("./emails.txt", {
    highWaterMark: 10,
  }),
});

lineReader.on("line", (line) => {
  lineReader.pause(); // pause reader
  // Resume 5ms later
  setTimeout(() => {
    colectSuggestion(line, () => {
      console.log(
        "----------------------------------------------------",
        linenum,
        "--------------------------------------------------"
      );
      lineReader.resume();
    });

    if (speed <= 300) {
      speed = 300;
    }
    if (limit <= 40) {
      limit = 40;
    }
  }, speed);
  console.log(line);
  linenum++;
});

app.listen(8000, () => {
  console.log("Example app listening on port port!");
});

//Run app, then load http://localhost:port in a browser to see the output.
