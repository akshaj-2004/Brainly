import express from "express";
import cors from "cors";
import "./db";                    

import userRoutes from "./routes/UserRoutes";
import crudRoutes from "./routes/crudRoutes";
import { PORT } from "./config";

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(crudRoutes);

app.listen(PORT, () => {
  console.log("app started on port 3000");
});
