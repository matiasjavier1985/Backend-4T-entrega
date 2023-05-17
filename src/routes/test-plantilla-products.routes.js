import express from "express"
import { ProductManager } from "../productManager.js"
import {uploader} from "../utils.js"
export const testPlantillaProducts = express.Router() 
const productManager = new ProductManager('./src/data/data.json')
//INICIO ENDPOINT PRODUCTS
const users = [
    {
      id: 1,
      name: 'John Doe',
      age: 25,
      email: 'johndoe@example.com',
      address: '123 Street, City',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 30,
      email: 'janesmith@example.com',
      address: '456 Avenue, Town',
      role:"admin"
    },
    {
      id: 3,
      name: 'David Johnson',
      age: 40,
      email: 'davidjohnson@example.com',
      address: '789 Road, Village',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      age: 35,
      email: 'sarahwilliams@example.com',
      address: '321 Lane, County',
      role:"admin"
    },
    {
      id: 5,
      name: 'Michael Brown',
      age: 28,
      email: 'michaelbrown@example.com',
      address: '654 Boulevard, Country',
    },
  ];
const food = [
{ name: 'Pizza', price: 10.99 },
{ name: 'Hamburguesa', price: 8.99 },
{ name: 'Ensalada', price: 5.99 },
{ name: 'Sushi', price: 12.99 },
{ name: 'Pastel', price: 6.99 }
];

testPlantillaProducts.get('/', (req,res)=>{
    try{
        let allProducts = productManager.getProducts()
        const title = "Lista de ropa para probar"
    
        const randomIndex = Math.floor(Math.random() * users.length)
        const randomUser = users[randomIndex]
        console.log(randomUser);
        return res
        .status(200)
        .render('test-plantilla-products', {title, allProducts, isAdmin:randomUser.role, randomUser, food})
    }
    catch (error) {
        return res.status(500).json({ status: "error", msg: "Error al obtener los productos" })
    }
    
})
