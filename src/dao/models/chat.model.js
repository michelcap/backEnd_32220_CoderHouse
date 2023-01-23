import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const schema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        }
    }
);

schema.plugin(mongooseDelete, { deletedAt: true });

export const ChatModel = mongoose.model("messages", schema);