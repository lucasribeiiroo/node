import http from "node:http";
import { Transform } from "node:stream";

class Negative extends Transform {
  _transform(chunk, encoding, callback) {
    const n = Number(chunk.toString()) * -1;

    console.log(n);
    callback(null, Buffer.from(String(n)));
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();
  console.log(fullStreamContent);
  return res.end(fullStreamContent);
});

server.listen(3334);
