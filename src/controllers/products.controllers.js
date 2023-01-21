import * as ProductsService from "../dao/services/product.service.js";
import { STATUS } from "../constants/constants.js";

export async function getProducts(req, res) {
  try {
    const response = await ProductsService.getProducts();
    res.json({
      products: response,
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

export async function getProduct(req, res) {
  try {
    const { pid } = req.params;
    const response = await ProductsService.getProduct(pid);
    res.json({
      products: response,
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

export async function createProducts(req, res) {
  try {
    const { body } = req;
    const response = await ProductsService.createProducts(body);
    res.status(201).json({
      products: response,
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

export async function updateProduct(req, res) {
  try {
    const { pid } = req.params;
    const { body } = req;
    const response = await ProductsService.updateProduct(pid, body);
    res.status(201).json({
      products: response,
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

export async function deleteProduct(req, res) {
  try {
    const { pid } = req.params;
    await ProductsService.deleteProduct(pid);
    res.status(201).json({
      message: "Producto borrado correctamente",
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}
