import express from "express";
import { bookBannerController, bookNewReleaseController, bookTagController, getBookController } from "../controllers/bookController.js";

const bookRoute = express.Router();

/* BOOKS */
bookRoute.get("/books", getBookController);
bookRoute.get('/banners', bookBannerController);
bookRoute.get('/new',   bookNewReleaseController);
//router.patch("/books/:id", );
//router.delete("/books/:id");

/* TAGS */
bookRoute.get("/tags", bookTagController);


export default bookRoute;