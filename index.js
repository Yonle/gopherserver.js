//
// Copyright (c) 2022 Yonle
//
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.

// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
// REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
// AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
// INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
// LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
// OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
// PERFORMANCE OF THIS SOFTWARE.
//

const net = require('net');
const render = require('./render.js');
const menu = require("./menu.js");

module.exports = function gopherServer(cb, opt) {
  if (typeof(opt) === "function") {
    cb = opt;
    delete opt;
  }

  if (typeof(cb) === "object") opt = cb;
  let server = new net.createServer(opt);

  server.on('connection', soc => {
    soc.send = function send(m) {
      soc.write(render(m));
      soc.end('\n.');
      return soc.destroy();
    };

    soc.menu = function sendMenuEntry(m, n) {
      soc.write(menu(m, n));
      return soc.end("\n");
      //return soc.destroy();
    }

    function readURL(url) {
      if (!soc.url) soc.url = url.toString().replace(RegExp('\r\n', "g"), '');
      soc.query = soc.url.split("\t").slice(1)[0];
      soc.removeListener('data', readURL);

      if (soc.query) soc.url = soc.url.split("\t")[0];
      if (typeof(cb) === 'function') cb(soc);
      server.emit('request', soc);
    }
    soc.on('data', readURL);
  });

  return server;
}

module.exports.render = render;
module.exports.menu = menu;
