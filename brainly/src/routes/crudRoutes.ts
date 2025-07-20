import { Router, Request, Response } from "express";
import { ContentModel, LinkModel, TagModel, UserModel, contentTypes } from "../db";
import { UserMiddleware } from "../middleware";
import { rand } from "../utils";
import { BACKEND_URL } from "../config";
import { Types } from "mongoose";
import cors from "cors"

const router = Router();
router.use(UserMiddleware);
router.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

// POST /content — Save content
router.post("/api/v1/content", async (req: Request, res: Response) => {
  const { link, type, title, tags } = req.body;
  const userId = req.userId;

  if (!link || !type || !title|| !userId) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!contentTypes.includes(type)) {
    return res.status(400).json({ message: "Invalid content type" });
  }

  try {
    for (const title of tags) {
      let tagDoc = await TagModel.findOne({ title });
      if (!tagDoc) {
        tagDoc = await TagModel.create({ title }); 
      }                    
    }

    await ContentModel.create({ link, type, title, tags, userId });

    return res.status(201).json({ message: "Content saved successfully" });
  } catch (err: any) {
    console.error("Err(catch):", err);
    return res.status(500).json({ message: "Server error" });
  }
});


// GET /content — Get user content
router.get("/api/v1/content", async (req: Request, res: Response) => {
    const userId = req.userId;

    try {
        const data = await ContentModel.find({ userId });
        return res.status(200).json({
            message: "User data fetched successfully",
            data,
        });
    } catch (err: any) {
        console.error("Err(catch):", err);
        return res.status(500).json({ message: "Server error" });
    }
});

// DELETE /content — Delete by contentId
router.delete("/api/v1/content", async (req: Request, res: Response) => {
    const userId = req.userId;
    const { contentId } = req.body;

    if (!userId || !contentId || !Types.ObjectId.isValid(contentId)) {
        return res.status(400).json({ message: "Invalid content ID" });
    }

    try {
        const result = await ContentModel.deleteOne({ _id: contentId, userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Content not found or unauthorized" });
        }
        return res.status(200).json({ message: "Deleted successfully" });
    } catch (err: any) {
        console.error("Err(catch):", err);
        return res.status(500).json({ message: "Server error" });
    }
});


// // POST /brain/share — Create or remove share link
// router.post("/api/v1/brain/share", async (req: Request, res: Response) => {
//   const { share } = req.body;
//   console.log(share)
//   const userId = req.userId;

//   try {
//     if (share) {
//       const hash = rand(10);
//       await LinkModel.updateOne(
//         { userId },
//         { userId, hash },
//         { upsert: true }
//       );

//       return res.json({
//         msg: "Share link created",
//         url: `${BACKEND_URL}/api/v1/brain/${hash}`,
//       });
//     } else {
//       await LinkModel.deleteOne({ userId });
//       return res.json({ msg: "Share link removed" });
//     }
//   } catch (err: any) {
//     console.error("Err(catch):", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });


// // GET /brain/:shareLink — Get shared content
// router.get("/api/v1/brain/:shareLink", async (req: Request, res: Response) => {
//     const hash = req.params.shareLink;

//     try {
//         const link = await LinkModel.findOne({ hash });
//         if (!link) {
//             return res.status(404).json({ message: "Invalid or expired link" });
//         }

//         const brain = await ContentModel.find({ userId: link.userId });
//         const user = await UserModel.findById(link.userId, "username");

//         return res.status(200).json({
//             username: user?.username,
//             content: brain,
//         });
//     } catch (err: any) {
//         console.error("Err(catch):", err);
//         return res.status(500).json({ message: "Server error" });
//     }
// });

export default router;
