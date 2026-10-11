import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import bookRoute from "./routes/bookRoute.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import helmet from "helmet";


const app = express();
app.use(helmet());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute)
app.use("/api/books", bookRoute);

app.use(notFound);
app.use(errorHandler);

export default app;