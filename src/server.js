import express from "express"; // "express"라는 패키지를 express라는 이름으로 import함

const PORT = 4000;

const app = express();

const routerLogger = (req, res, next) => {
  console.log("PATH", req.path);
  next();
};
const methodLogger = (req, res, next) => {
  console.log("METHOD", req.method);
  next();
};
const home = (req, res) => {
  console.log("I will respond");
  return res.send("hello");
};
const login = (req, res) => {
  return res.send("login");
};
app.get("/", home);
app.use(methodLogger, routerLogger);
app.get("/login", login);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
