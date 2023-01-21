import { ProductModel } from "../models/products.model.js";

export async function getProducts() {
  try {
    const products = await ProductModel.find({ deletedAt: { $exists: false } });
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getProduct(pid) {
  try {
    const product = await ProductModel.find({pid : Number(pid)});
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createProducts(data) {
  try {
    let new_pid = await ProductModel.find({}, {"_id" : 0}).sort({pid:-1}).limit(1)
    data.pid = new_pid[0].pid + 1
    const product = await ProductModel.create(data);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateProduct(pid, data) {
  try {
    const updatedProduct = await ProductModel.findOneAndUpdate({pid : pid}, data, { new: true });
    return updatedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteProduct(pid) {
  try {
    const deleted = await ProductModel.deleteOne({ pid: pid });
    return deleted
  } catch (error) {
    throw new Error(error.message);
  }
}