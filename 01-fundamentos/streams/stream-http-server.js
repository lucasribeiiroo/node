import http from "node:http";
import { Transform } from "node:stream";

class Negative extends Transform {
  _transform(chunk, encoding, callback) {
    const n = Number(chunk.toString()) * -1;

    console.log(n);
    callback(null, Buffer.from(String(n)));
  }
}

const server = http.createServer((req, res) => {
  return req.pipe(new Negative()).pipe(res);
});

server.listen(3334);
