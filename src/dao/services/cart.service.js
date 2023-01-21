import { CartModel } from "../models/cart.model.js";

export async function getCart(cid) {
  try {
    const cart = await CartModel.find({cid : Number(cid)});
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createCart(data) {
  try {
    let new_cid = await CartModel.find({}, {"_id" : 0}).sort({cid:-1}).limit(1)
    let cart = {}
    cart.cid = new_cid[0].cid + 1
    cart.products = data
    const new_cart = await CartModel.create(cart);
    return new_cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateCart(cid, pid) {
  try {
    const updatedCart = await CartModel.find({cid : cid});
    let products = updatedCart[0].products
    let control = false
    products.map(product => {
      if (product.id == pid) {
        product.quantity += 1
        control = true
      }
    })
    if (!control) {
      products.push({id: Number(pid), quantity: 1})
    }
    const redyUpdatedCart = await CartModel.findOneAndUpdate({cid : cid}, {products : products});
    return redyUpdatedCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteCart(cid) {
  try {
    const deleted = await CartModel.deleteOne({ cid: cid });
    return deleted
  } catch (error) {
    throw new Error(error.message);
  }
}