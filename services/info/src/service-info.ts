import express from "express";

const app = express();
const port = 3002;

app.get("/api/info", (req, res) => {
  console.log(`Received request to /api/info: ${req.method} ${req.url}`);
  res.status(200).send("Response from Service Info");
});

app.listen(port, () => {
  console.log(`Service Info listening on port ${port}`);
});
