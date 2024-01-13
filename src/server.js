import express from "express"; // "express"라는 패키지를 express라는 이름으로 import함

const PORT = 4000;

const app = express();

const gossipMiddleware = (req, res, next) => {
  console.log(`Someone is going to: ${req.url}`);
  next();
};

const handleHome = (req, res) => {
  return res.send("I love middlewares");
};

app.get("/", gossipMiddleware, handleHome);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
