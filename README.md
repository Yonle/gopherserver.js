# gopherserver.js
A gopher server written in javascript.

- [Install](#install)
- [API](#api)
  - [`gopherserver([options][, connectionListener])`](#gopherserveroptions-connectionlistener)
    - [Event: `request`](#event-request)
      - [`socket.url`](#socketurl)
      - [`socket.query`](#socketquery)
      - [`socket.send(map)`](#socketsendmap)
      - [`socket.menu(menu, [n])`](#socketmenumenu-n)
  - [`gopherserver.render(str)`](#gopherserverrenderstr)
  - [`gopherserver.menu(menu, [n])`](#gopherservermenumenu-n)
- [Example](#example)
- [Known Issues](#known-issues)

# Install

```sh
npm install --save gopherserver.js
```

# API

## `gopherserver([options][, connectionListener])`
- `options` [`<Object>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) See [net.createServer([options][, connectionListener])](https://nodejs.org/api/net.html#netcreateserveroptions-connectionlistener)
- `connectionListener` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Automatically set as a listener for the [`request`](#event-request) event.
- Returns: [`<net.Server>`](https://nodejs.org/api/net.html#class-netserver)

## Event: `request`
- [`<net.Socket>`](https://nodejs.org/api/net.html#class-netsocket) The connection object

Emitted when a new request is made.

### `socket.url`
A string of requested URL path. Could also a CCSO Nameserver query if this url begin with `query`.

```js
socket.url // "/"
socket.url // ""
socket.url // "/pathname/"
socket.url // "query Hello world"
```

### `socket.query`
A full-text search query string. Only available when client is requesting with mode `7`.

```js
socket.query // Lorem ipsum dolor sit amet
socket.query // What is NodeJS?
socket.query // Hello world
```

### `socket.send(map)`
A function to send a rendered gophermap to client. Can only be called once.

```js
let map = `!My Gopher server

Hello world, This is my gopher server!`;

socket.send(map);
```

### `socket.menu(menu, [n])`
A function to send a rendered menu entity to client. Can only be called once.

```js
socket.menu({
  INFO: "1Menu\tlocalhost\t2000",
  ADMIN: "\n Admin: Me"
}, -2);

// +-2
// +INFO: 1Menu	localhost	2000
// +ADMIN:
//  Admin: Me
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

## `gopherserver.menu(menu, [n])`
A function that used by [`socket.menu(menu)`](#socketmenumenu) to render a string into gopher menu entity.

# Example

```js
const gopherServer = require("gopherserver.js");
const server = gopherServer();

server.on('request', soc => {
  if (!soc.url && soc.query === "$") { // Client is requesting menu entity
    return soc.menu({
      INFO: "1Main Menu\tlocalhost\t2000",
      ADMIN: "\n Admin: Me"
    }, -2);
  }

  soc.send("Hello world!");
});

server.on('error', console.error);

server.listen(2000);
```

# Known issues
- __**(Help wanted)**__ The rendered string of [`gopherserver.menu(menu, [n])`](#gopherservermenumenu-n) **may** still have some problems at several clients.

