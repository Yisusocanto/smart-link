import { Router } from "express";
import { tokenRequired } from "../middleware/tokenRequired.js";
import {
  createLink,
  deleteLink,
  getAllLinks,
  linkStats,
  recentLinks,
  redirectToURL,
  toggleStatus,
} from "../controllers/linkController.js";
import { tokenOptional } from "../middleware/tokenOptional.js";

export const linkRouter: Router = Router();

linkRouter.use(tokenOptional);

linkRouter.get("/", tokenRequired, getAllLinks);
linkRouter.post("/", createLink);
linkRouter.get("/stats", tokenRequired, linkStats);
linkRouter.get("/recents", tokenRequired, recentLinks);
linkRouter.get("/:alias", redirectToURL);
linkRouter.delete("/:alias", tokenRequired, deleteLink);
linkRouter.get("/:alias/toggle-status", tokenRequired, toggleStatus);
