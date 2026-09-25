import express from "express";
import { bookBannerController, bookNewReleaseController, bookPageController, bookTagController, getBookController } from "../controllers/bookController.js";

const bookRoute = express.Router();

/* BOOKS */
bookRoute.get("/", getBookController);
bookRoute.get('/banners', bookBannerController);
bookRoute.get('/new',   bookNewReleaseController);
bookRoute.get("/tags", bookTagController);
bookRoute.get('/:id', bookPageController);

/* TAGS */


export default bookRoute;