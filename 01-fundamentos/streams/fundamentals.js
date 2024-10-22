import { Readable, Transform, Writable } from "node:stream";

class OneToHundred extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 5) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}

class Multiply extends Writable {
  _write(chunk, encoding, callback) {
    const n = Number(chunk.toString()) * 10;
    console.log(n);
    callback();
  }
}

new OneToHundred().pipe(new Negative()).pipe(new Multiply());
