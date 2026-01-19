import { Request, Response } from "express";
import { asyncHandler } from "../lib/asyncHandler.js";
import z from "zod";
import {
  BadRequest,
  NotFound,
  Unauthorized,
} from "../middleware/errorHandler.js";
import { Link } from "../models/Link.js";
import { createAlias } from "../lib/aliasHandler.js";
import mongoose from "mongoose";

const DOMAIN = process.env.DOMAIN ?? "http://localhost:3001";

const linkSchema = z.object({
  originalURL: z.url("Url must be provided."),
});

export const getAllLinks = asyncHandler(async (req: Request, res: Response) => {
  console.log("BACKEND: getAllLinks called!");
  const userID = req.user?._id ?? "";
  console.log("BACKEND: UserID:", userID);

  const links = await Link.find({ user: userID }, { user: 0 });
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
      { $inc: { clickCount: 1 } },
    );
    if (!link) {
      throw NotFound("Link does not exist.");
    }

    if (!link.active) {
      throw NotFound("Link does no exist.");
    }

    res.redirect(link.originalURL);
  },
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
  },
);

export const deleteLink = asyncHandler(async (req: Request, res: Response) => {
  const alias = req.params.alias;

  if (!alias) {
    throw BadRequest("Alias must be prvided.");
  }

  const link = await Link.findOneAndDelete({ alias });
  if (!link) {
    throw NotFound("Link not found.");
  }

  res.json({ success: "Link deleted succesfully." });
});

export const linkStats = asyncHandler(async (req: Request, res: Response) => {
  const userID = req.user?._id ?? "";
  const userObjectId = new mongoose.Types.ObjectId(userID);

  const totalLinksPromise = Link.countDocuments({ user: userObjectId });
  const totalActiveLinksPromise = Link.countDocuments({
    user: userObjectId,
    active: true,
  });
  const totalClicksPromise = Link.aggregate([
    {
      $match: { user: userObjectId },
    },
    {
      $group: {
        _id: null,
        totalClicks: { $sum: "$clickCount" },
      },
    },
  ]);

  const [totalLinks, totalActiveLinks, totalClicks] = await Promise.all([
    totalLinksPromise,
    totalActiveLinksPromise,
    totalClicksPromise,
  ]);

  res.json({
    totalLinks,
    totalActiveLinks,
    totalClicks: totalClicks[0]?.totalClicks ?? 0,
  });
});

export const recentLinks = asyncHandler(async (req: Request, res: Response) => {
  const userID = req.user?._id ?? "";

  const recentLinksArray = await Link.find({ user: userID })
    .sort({ createdAt: -1 })
    .limit(5);
  res.json({ recentLinks: recentLinksArray });
});
