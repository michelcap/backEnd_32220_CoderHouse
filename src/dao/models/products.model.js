import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const schema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: false,
    },
    pid: {
        type: Number,
        required: false,
    }
  },
  {
    timestamps: true,
  },
);

schema.plugin(mongooseDelete, { deletedAt: true });

export const ProductModel = mongoose.model("products", schema);