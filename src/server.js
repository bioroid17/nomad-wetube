import "./db";
import express from "express"; // "express"라는 패키지를 express라는 이름으로 import함
import morgan from "morgan"; // "morgan"으로부터 import만 가능하면 이름은 상관없음
import globalRouter from "./routers/globalRouter"; // 이름은 상관없음
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const PORT = 4000;
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
