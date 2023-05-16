import express from "express"
import { cartsRouter } from "./routes/carts.routes.js"
import { productsRouter } from "./routes/products.routes.js"
import { __dirname } from "./utils.js"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)
app.use(express.static("public"))
//app.use('/static', express.static('public'))

app.get('*', (req,res)=>{
    return res
    .status(404)
    .json({status:"ERROR", msg:'No se encuentra la Ruta especificada',data:{}})
})


app.listen(PORT,()=>{
    console.log(`escuchando en el servidor puerto http://localhost:${PORT}`);
})