import mongoose, { model, Schema } from "mongoose";
import { connectionString } from "./config";

export const contentTypes = ["image", "video", "article", "audio"] as const;

export const defaultTagSuggestions = [
  "Productivity",
  "Tech & Tools",
  "Mindset",
  "Learning & Skills",
  "Workflows",
  "Inspiration",
] as const;

async function connect() {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB");
  } catch (e: any) {
    console.error("MongoDB connection error:", e);
  }
}
connect();

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const TagSchema = new Schema({
  title: { type: String, required: true, unique: true },
});

const ContentSchema = new Schema({
  link:  { type: String, required: true },
  type:  { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags:  [{ type: String, ref: "Tag" }],   
  userId:{ type: Schema.Types.ObjectId, ref: "User", required: true },
});

const LinkSchema = new Schema({
  hash:   { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
});

const UserModel    = model("User",    UserSchema);
const TagModel     = model("Tag",     TagSchema);
const ContentModel = model("Content", ContentSchema);
const LinkModel    = model("Link",    LinkSchema);

export { UserModel, TagModel, ContentModel, LinkModel };
