import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const schema = new mongoose.Schema(
  {
    cid: {
        type: Number,
        required: false,
    },
    products: {
        type: Array,
        required: true,
    }
  },
  {
    timestamps: true,
  },
);

schema.plugin(mongooseDelete, { deletedAt: true });

export const CartModel = mongoose.model("carts", schema);