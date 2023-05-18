import express from "express"
import { ProductManager } from "../productManager.js"
import {uploader} from "../utils.js"
export const realTimeProductsRouter = express.Router() 

//INICIO ENDPOINT PRODUCTS

realTimeProductsRouter.get('/', (req,res)=>{
    try{
        const title = "Lista de BICI"   
        return res
        .status(200)
        .render('realTimeProducts', {title})
    }
    catch (error) {
        return res.status(500).json({ status: "error", msg: "Error al obtener los productos" })
    }
    
})