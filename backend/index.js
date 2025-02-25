import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/health", (req, res) => {
  res.send("Server is working");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
