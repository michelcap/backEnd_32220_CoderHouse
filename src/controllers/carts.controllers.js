import * as CartsService from "../dao/services/cart.service.js";
import { STATUS } from "../constants/constants.js";

export async function getCart(req, res) {
  try {
    const { cid } = req.params;
    const response = await CartsService.getCart(cid);
    let resp = response[0].products
    res.json({
      products: resp,
    });
    return response
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}

export async function createCart(req, res) {
  try {
    const { body } = req;
    const response = await CartsService.createCart(body);
    res.status(201).json({
      carts: response,
      status: STATUS.SUCCESS,
    });
    return response
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}

export async function updateCart(req, res) {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const response = await CartsService.updateCart(cid, pid);
    res.status(201).json({
      carts: response,
      status: STATUS.SUCCESS,
    });
    return response
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}

export async function deleteCart(req, res) {
  try {
    const { cid } = req.params;
    await CartsService.deleteCart(cid);
    res.status(201).json({
      message: "Carto borrado correctamente",
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}
