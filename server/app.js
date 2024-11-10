import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import taskRoutes from "./routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/tasks", taskRoutes);

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
