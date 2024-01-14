import express from "express"; // "express"라는 패키지를 express라는 이름으로 import함
import morgan from "morgan"; // "morgan"으로부터 import만 가능하면 이름은 상관없음

const PORT = 4000;

const app = express();
const logger = morgan("dev");

const home = (req, res) => {
  console.log("I will respond");
  return res.send("hello");
};
const login = (req, res) => {
  return res.send("login");
};
app.use(logger);
app.get("/", home);
app.get("/login", login);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
