import "reflect-metadata";
import http from "http";
import Crons from "../crons";
(async () => {
  try {
    http
      .createServer(function (_req, res) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("Health check\n");
        res.end();
      })
      .listen(8080);
    Crons.start();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
