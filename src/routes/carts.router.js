import { Router } from "express"
import { __dirname } from "../utils.js"
import CartManager from "../dao/mongoDB/mongomanagers/cartManagerMongo.js"
import ProductManager from "../dao/mongoDB/mongomanagers/productManagerMongo.js"


const cm = new CartManager()
const pm = new ProductManager()


const router = Router()

router.get("/carts", async (req, res) => {
    const carrito = await cm.getCarts()
    res.json({ carrito })
})

router.get("/carts/:cid", async (req, res) => {
    const { cid } = req.params
    const carritofound = await cm.getCartById(cid)
    res.json({ status: "success", carritofound })
})



router.post('/carts', async (req, res) => {
    try {
        const { obj } = req.body;

        if (!Array.isArray(obj)) {
            return res.status(400).send('Invalid request: products must be an array');
        }

        const validProducts = [];

        for (const product of obj) {
            const checkId = await pm.getProductById(product._id);
            if (checkId === null) {
                return res.status(404).send(`Product with id ${product._id} not found`);
            }
            validProducts.push(checkId);
        }

        const cart = await cm.addCart(validProducts);
        res.status(200).send(cart);

    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});






export default router