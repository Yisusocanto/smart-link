import { Router } from "express";
import { tokenRequired } from "../middleware/tokenRequired.js";
import {
  createLink,
  getAllLinks,
  redirectToURL,
  toggleStatus,
} from "../controllers/linkController.js";
import { tokenOptional } from "../middleware/tokenOptional.js";

export const linkRouter: Router = Router();

linkRouter.use(tokenOptional);

linkRouter.post("/", createLink);
linkRouter.get("/:alias", redirectToURL);
linkRouter.get("/:alias/toggle-status", toggleStatus);

linkRouter.get("/", getAllLinks, tokenRequired);
