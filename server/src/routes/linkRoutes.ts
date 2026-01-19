import { Router } from "express";
import { tokenRequired } from "../middleware/tokenRequired.js";
import {
  createLink,
  deleteLink,
  getAllLinks,
  linkStats,
  redirectToURL,
  toggleStatus,
} from "../controllers/linkController.js";
import { tokenOptional } from "../middleware/tokenOptional.js";

export const linkRouter: Router = Router();

linkRouter.use(tokenOptional);

linkRouter.get("/", tokenRequired, getAllLinks); // Order matters! Specific routes first.
linkRouter.post("/", createLink);
linkRouter.get("/stats", tokenRequired, linkStats);
linkRouter.get("/:alias", redirectToURL);
linkRouter.delete("/:alias", deleteLink);
linkRouter.get("/:alias/toggle-status", toggleStatus);
