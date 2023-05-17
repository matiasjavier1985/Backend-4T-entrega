import express from "express"
import { ProductManager } from "../productManager.js"
export const cartsRouter = express.Router()
const cartsManager = new ProductManager('./src/data/carts.json')
const productManager = new ProductManager('./src/data/data.json')
//INICIO ENDPOINT PRODUCTS
cartsRouter.get('/', (req, res) => {
    try {
        const query = req.query
        const limit = query.limit
        let allProducts = cartsManager.getProducts()

        if (limit <= allProducts.length) {
            allProducts = allProducts.slice(0, limit);
            return res
                .status(200).
                json({ status: "success", msg: 'cantidad de productos limitada', data: allProducts })
        }
        else if (limit >= allProducts.length) {
            return res
                .status(400).
                json({ status: "error", msg: 'la cantidad solicitada es mayor a los productos disponibles' })
        }
        else {
            return res
                .status(200).
                json({ status: "success", msg: 'todos los productos', data: allProducts })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", msg: "Error al obtener los productos" })
    }

})
cartsRouter.get('/:cid', (req, res) => {
    const cid = req.params.cid
    const productoEncontrado = cartsManager.getProductById(cid)
    return res
        .status(200)
        .json({ status: "success", msg: 'Producto encontrado', data: productoEncontrado })
})
//BORRAR UN PRODUCTO (NECEISTO PASAR ID)
cartsRouter.delete('/:cid', async (req, res) => {
    const cid = req.params.cid
    const deletedProduct = await cartsManager.deleteProduct(cid)
    return res
        .status(200).
        json({ status: "success", msg: 'producto eliminado', data: deletedProduct })
})
//CREAR UN PRODUCTO (NO NECESiTO PASAR ID)
cartsRouter.post('/', async (req, res) => {
    try {
        const producto = req.body
        const createdProduct = await cartsManager.addCart(producto)
        if (createdProduct) {
            return res
                .status(201).
                json({ status: "success", msg: 'producto creado' })
        }
        else {
            return res
                .status(400).
                json({ status: "error", msg: 'no se creo el producto porque no cumple las condiciones' })
        }

    }
    catch (error) {
        return res.status(500).json({ status: 'error', msg: 'no se pudo crear el producto', error: error.message });
    }
})
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const getProduct = await productManager.getProductById(pid)
        if (getProduct) {
            const addProduct = await cartsManager.addProdCart(cid, getProduct)
            if (addProduct) {
                return res.status(201).json({ status: 'success', data: addProduct })
            }else{
                return res
                .status(400).
                json({ status: "error", msg: 'El ID de carrito no existe' })
            }
            
        }else{
            return res
                .status(400).
                json({ status: "error", msg: 'El ID del producto no existe' })
        }

    }
    catch (error) {
        return res.status(500).json({ status: 'error', msg: 'no se pudo crear el producto', error: error.message });
    }
})
//FIN ENDPOINT PRODUCTS
