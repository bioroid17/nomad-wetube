import express from "express"; // "express"라는 패키지를 express라는 이름으로 import함

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
  return res.send("<h1>I still love you.</h1>");
};
const handleLogin = (req, res) => {
  return res.send({ message: "Login here." });
};

app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
