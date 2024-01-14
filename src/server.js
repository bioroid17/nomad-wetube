import express from "express"; // "express"라는 패키지를 express라는 이름으로 import함

const PORT = 4000;

const app = express();

const home = (req, res) => res.send("hello");
app.get("/", home);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
