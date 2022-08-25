const gopherServer = require("./server");
const server = gopherServer();

server.on('request', soc => {
  soc.send("Hello world!");
});

server.on('error', console.error);

server.listen(2000);
