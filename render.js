//
// Copyright (c) 2022 Yonle
//
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
// REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
// AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
// INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
// LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
// OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
// PERFORMANCE OF THIS SOFTWARE.
//

const types = '0123456789+TgI:;dhijprswPX'.split('');

module.exports = function encode(s) {
  let gen = s.split('\n').map((i, l) => {
    let type = i.slice(0, 1);
    let tabs = i.split('\t');

    if (type === "!") return i = 'i' + i.slice(1) + '\tTITLE\tnull.host\t1';
    if (type === "%") return i = i.slice(1);
    if (!types.includes(type)) i = 'i' + i + `\tnull.host\t1`;
    return i;
  }).join('\n');

  return gen;
}
