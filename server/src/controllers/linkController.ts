import { Request, Response } from "express";
import { asyncHandler } from "../lib/asyncHandler.js";
import z from "zod";
import {
  BadRequest,
  NotFound,
  Unauthorized,
} from "../middleware/errorHandler.js";
import { Link } from "../models/ILink.js";
import { createAlias } from "../lib/aliasHandler.js";

const DOMAIN = process.env.DOMAIN ?? "http://localhost:3001";

const linkSchema = z.object({
  originalURL: z.url("Url must be provided."),
});

export const getAllLinks = asyncHandler(async (req: Request, res: Response) => {
  const userID = req.user?._id ?? "";

  const links = await Link.find({ user: userID });
  res.json({ links: links });
});

export const createLink = asyncHandler(async (req: Request, res: Response) => {
  const result = linkSchema.safeParse(req.body);
  if (!result.success) {
    throw BadRequest(result.error.issues[0]?.message ?? "Invalid data.");
  }

  const userID = req.user?._id;

  let alias: string;
  while (true) {
    alias = createAlias();
    let existingAlias = await Link.exists({ alias: alias });
    if (!existingAlias) {
      break;
    }
  }

  const { originalURL } = result.data;
  const newLink = await Link.create({
    originalURL,
    alias: alias,
    ...(userID ? { user: userID } : {}),
  });

  res.json({
    shortenLink: `${DOMAIN}/${newLink.alias}`,
    originalURL: originalURL,
  });
});

export const redirectToURL = asyncHandler(
  async (req: Request, res: Response) => {
    const alias = req.params.alias;
    if (!alias) {
      throw BadRequest("Link not valid or not provided.");
    }

    const link = await Link.findOneAndUpdate(
      { alias: alias },
      { $inc: { clickCount: 1 } }
    );
    if (!link) {
      throw NotFound("Link does not exist.");
    }

    if (!link.active) {
      throw NotFound("Link does no exist.");
    }

    res.redirect(link.originalURL);
  }
);

export const toggleStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const userID = req.user?._id;
    const alias = req.params.alias;
    if (!alias) {
      throw BadRequest("Link invalid or not provided.");
    }

    const link = await Link.findOne({ alias: alias });
    if (!link) {
      throw NotFound("Link does not exist.");
    }

    if (userID && link.user.toString() != userID) {
      throw Unauthorized("Your cannot modifies this link.");
    }

    link.active = !link.active;
    await link.save();

    res.json({
      link: link.originalURL,
      success: true,
    });
  }
);
