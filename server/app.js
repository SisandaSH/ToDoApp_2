import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import taskRoutes from "./routes.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:8000", 
  })
);
app.use(bodyParser.json());

app.use("/tasks", taskRoutes);

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
