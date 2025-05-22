import productModel from "../model/product.Model.js"


const getProducts = async (req, res) => {
    const product = await productModel.find()
    res.json(product)
}
const postProducts = async (req, res) => {
    const { name, price, image } = req.body
    const product = { name, price, image }
    const newProduct = await productModel.create(product)
    res.json(newProduct)
}
const deleteProducts = async (req, res) => {
    const { id } = req.params
    await productModel.findByIdAndDelete(id)
    res.json(`${id}-li mehsul silindi`)
}

export { getProducts, postProducts, deleteProducts }