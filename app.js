import express from "express"
import { APP_PORT } from "./configs/EnvConfig.js";
import BookRouter from "./routers/BookRouter.js";
import { initStorage } from "./configs/StorageConfig.js";

const app= express();

app.use(express.json());

initStorage();

app.use("/books", BookRouter);

app.listen(APP_PORT,()=>{
          console.log(`App start successfully on port ${APP_PORT}`);
})