# gopherserver.js
A gopher server written in javascript.

# Install
```
npm install --save gopherserver.js
```

# API
- [`gopherserver([options][, connectionListener])`](#gopherserveroptions-connectionlistener)
  - [Event: `request`](#event-request)
    - [`socket.url`](#socketurl)
    - [`socket.send(map)`](#socketsendmap)
- [`gopherserver.render(str)`](#gopherserverrenderstr)

## `gopherserver([options][, connectionListener])`
- `options` [`<Object>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) See [net.createServer([options][, connectionListener])](https://nodejs.org/api/net.html#netcreateserveroptions-connectionlistener)
- `connectionListener` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Automatically set as a listener for the [`request`](#event-request) event.
- Returns: [`<net.Server>`](https://nodejs.org/api/net.html#class-netserver)

## Event: `request`
- [`<net.Socket>`](https://nodejs.org/api/net.html#class-netsocket) The connection object

Emitted when a new request is made.

### `socket.url`
A string of requested URL path. Could also a CCSO Query if this url begin with `query`.

```js
socket.url // "/"
socket.url // ""
socket.url // "/pathname/"
socket.url // "query Hello world"
```

### `socket.send(map)`
A function to send a rendered gophermap to client. Can only be called once.

```js
let map = `!My Gopher server

Hello world, This is my gopher server!`;

socket.send(map);
```

## `gopherserver.render(str)`
A function that used by [`socket.send(map)`](#socketsendmap) function to render a string into gophermap.

gophermap:
```
!My Gopher server

Hello world, This is my gopher server!
```

index.js:
```js
const gopherserver = require("gopherserver.js");
const fs = require("fs");

let file = fs.readFileSync("gophermap", "utf8");

gopherserver.render(file);
// iMy Gopher Server	TITLE	null.host	1
// i		null.host	1
// iHello world, This is my gopher server!	null.host	1
```

# Example

```js
const gopherServer = require("gopherserver.js");
const server = gopherServer();

server.on('request', soc => {
  soc.send("Hello world!");
});

server.on('error', console.error);

server.listen(2000);  
```
