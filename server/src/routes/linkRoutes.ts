import { Router } from "express";
import { tokenRequired } from "../middleware/tokenRequired.js";
import {
  createLink,
  getAllLinks,
  redirectToURL,
  toggleStatus,
} from "../controllers/linkController.js";

export const linkRouter: Router = Router();

linkRouter.use(tokenRequired);

linkRouter.post("/", createLink);
linkRouter.get("/", getAllLinks);
linkRouter.get("/:alias", redirectToURL);
linkRouter.get("/:alias/toggle-status", toggleStatus);
