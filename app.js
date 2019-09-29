const http = require("http");
const https = require("https");
let playerCount = 0;
let serverCount = 0;

setInterval(function() {
  https.get('https://servers-live.fivem.net/api/servers/', (resp) => {
    resp.setEncoding('utf8');
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      playerCount = 0;
      serverCount = 0;
      let newData = JSON.parse(data)
      newData.forEach((item, i) => {
        playerCount = playerCount + item.Data.clients;
        serverCount++;
      });
      console.log(playerCount, serverCount)
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}, 60000)



http.createServer(function(request, response){
    response.write(JSON.stringify({playerCount : playerCount, serverCount : serverCount}));
    response.end();
}).listen(3000);
