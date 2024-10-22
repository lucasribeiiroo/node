import { randomUUID } from "crypto";
import http from "http";
import { json } from "./middlewares/json.js";

const user = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    return res.writeHead(200).end(JSON.stringify(user));
  }
  console.log(req.body);
  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;
    user.push({
      name,
      id: randomUUID(),
      email,
    });

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end("Not found");
});

server.listen(3333);
