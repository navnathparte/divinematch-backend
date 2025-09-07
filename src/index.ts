import express from "express";
import connectDB from "./config/db";
import routes from "./routes/route";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.status(200).send({
    message: "health service is working smoothly",
  });
});

app.use("/api", routes);

connectDB();
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
