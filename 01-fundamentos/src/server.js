import { randomUUID } from "crypto";
import http from "http";

const user = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    return res
      .setHeader("content-type", "application-json")
      .writeHead(200)
      .end(JSON.stringify(user));
  }

  if (method === "POST" && url === "/users") {
    user.push({
      name: "Lucas",
      id: randomUUID(),
      idade: 29,
    });
    return res
      .setHeader("content-type", "application-json")
      .writeHead(201)
      .end(JSON.stringify(user));
  }

  return res.writeHead(404).end("Not found");
});

server.listen(3333);
