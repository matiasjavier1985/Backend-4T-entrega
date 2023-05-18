import express from "express"
import { cartsRouter } from "./routes/carts.routes.js"
import { productsRouter } from "./routes/products.routes.js"
import { __dirname } from "./utils.js"
import {homeRouter} from "./routes/home.routes.js"
import handlebars from "express-handlebars"
import {Server} from 'socket.io'
import { testSocketRouter } from "./routes/test-socket.routes.js"
import { realTimeProductsRouter } from "./routes/realTimeProducts.routes.js"

const app = express()
const PORT = 8080

const httpServer = app.listen(PORT,()=>{
    console.log(`escuchando en el servidor puerto http://localhost:${PORT}`);
})

const socketServer = new Server(httpServer)

socketServer.on('connection',(socket)=>{
    socket.on('msg_front_back',(msg)=>{
        console.log(msg);
        socketServer.emit('msg_back_front', msg)
    })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)


app.use(express.static("public"))
//app.use('/static', express.static('public'))
app.engine("handlebars",handlebars.engine())
app.set("views",__dirname + "/views")
app.set("view engine", "handlebars")

app.use("/home",homeRouter)
app.use("/realtimeproducts",realTimeProductsRouter)
app.use("test-socket",testSocketRouter)

app.get('*', (req,res)=>{
    return res
    .status(404)
    .json({status:"ERROR", msg:'No se encuentra la RUTA especificada',data:{}})
})
