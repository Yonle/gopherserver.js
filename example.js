const gopherServer = require(".");
const server = gopherServer();

server.on('request', soc => {
  if (!soc.url && soc.query === "$") return soc.menu({
    INFO: "1Menu\tlocalhost\t2000",
    ADMIN: "\n Admin: Me"
  });

  soc.send("Hello world!");
});

server.on('error', console.error);

server.listen(2000);
