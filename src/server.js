import express from "express"; // "express"라는 패키지를 express라는 이름으로 import함
import morgan from "morgan"; // "morgan"으로부터 import만 가능하면 이름은 상관없음
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter"; // 이름은 상관없음
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Hello!",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/wetube" }),
  })
);

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
