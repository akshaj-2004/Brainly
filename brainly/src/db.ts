import mongoose, { model, Schema, Types } from 'mongoose';
import { connectionString } from "./config"

const contentTypes = ['image', 'video', 'article', 'audio'];

async function connect() {
    try {
        await mongoose.connect(connectionString);
        console.log("Connected to MongoDB");
    } catch (e: any) {
        console.log("MongoDB connection error:", e);
    }
}

connect();

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const TagSchema = new Schema({
    title: {type: String, required: true}
})

const ContentSchema = new Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true }, 
    title: { type: String, required: true },
    tags: [{ type: Types.ObjectId, ref: 'Tag' }],
    userId: {type: Types.ObjectId, ref: 'User', required: true}
});

const LinkSchema = new Schema({
  hash: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: 'User', required: true },
});

const UserModel = model("User", UserSchema);
const TagModel = model("Tag", TagSchema);
const ContentModel = model("Content", ContentSchema);
const LinkModel = model('Link', LinkSchema); 

export { UserModel, TagModel, ContentModel, LinkModel };
