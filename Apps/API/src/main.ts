import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "finario-api", ts: new Date().toISOString() });
});

app.get("/api/ping", (_req, res) => {
  res.json({ pong: true });
});

app.listen(port, () => {
  console.log(`[finario-api] listening on :${port}`);
});
