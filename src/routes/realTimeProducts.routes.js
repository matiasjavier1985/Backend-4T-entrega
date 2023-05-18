import express from "express"
import { ProductManager } from "../productManager.js"
import {uploader} from "../utils.js"
export const realTimeProductsRouter = express.Router() 
const productManager = new ProductManager('./src/data/data.json')
//INICIO ENDPOINT PRODUCTS

realTimeProductsRouter.get('/', (req,res)=>{
    try{
        let allProducts = productManager.getProducts()
        const title = "Lista de BICI"   
        return res
        .status(200)
        .render('realTimeProducts', {title, allProducts})
    }
    catch (error) {
        return res.status(500).json({ status: "error", msg: "Error al obtener los productos" })
    }
    
})