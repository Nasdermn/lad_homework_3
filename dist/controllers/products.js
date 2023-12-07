import { Product } from '../entity/product.entity.js';
const getProductById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const product = await Product.findOne({ where: { product_id: id } });
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json('Товара по данному id не существует');
        }
    }
    catch (error) {
        const errorMessage = error.message || 'Внутренняя ошибка сервера';
        res.status(500).json(`Ошибка при получении пользователя: ${errorMessage}`);
    }
};
const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ order: { product_id: 'ASC' } });
        if (products.length > 0) {
            res.status(200).json(products);
        }
        else {
            res.status(404).json('Товаров не найдено');
        }
    }
    catch (error) {
        const errorMessage = error.message || 'Внутренняя ошибка сервера';
        res.status(500).json(`Ошибка при получении товаров: ${errorMessage}`);
    }
};
const addProduct = async (req, res, next) => {
    try {
        const { title, type, price, description } = req.body;
        if (!title || !type || !price || !description) {
            res.status(400).json({ message: 'Не все обязательные поля были предоставлены.' });
            return;
        }
        const product = Product.create({
            title,
            type,
            price,
            description,
        });
        await Product.save(product);
        res.status(200).send('Новый товар успешно создан и добавлен в базу');
    }
    catch (error) {
        const errorMessage = error.message || 'Внутренняя ошибка сервера';
        res.status(500).json(`Ошибка при добавлении товара: ${errorMessage}`);
    }
};
const changeProduct = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { price, description } = req.body;
        if (!price && !description) {
            res.status(400).json({ message: 'Введите новую цену или новое описание.' });
            return;
        }
        const product = await Product.findOne({ where: { product_id: id } });
        if (!product) {
            res.status(404).json('Товара по данному id не существует');
            return;
        }
        if (price !== undefined) {
            product.price = price;
        }
        if (description !== undefined) {
            product.description = description;
        }
        await Product.save(product);
        res.status(200).send('Данные товара успешно изменены');
    }
    catch (error) {
        const errorMessage = error.message || 'Внутренняя ошибка сервера';
        res.status(500).json(`Ошибка при изменении товара: ${errorMessage}`);
    }
};
const deleteProduct = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const product = await Product.findOne({ where: { product_id: id } });
        if (!product) {
            res.status(404).json('Товара по данному id не существует');
            return;
        }
        await Product.remove(product);
        res.status(200).send('Товар успешно удален');
    }
    catch (error) {
        const errorMessage = error.message || 'Внутренняя ошибка сервера';
        res.status(500).json(`Ошибка при удалении товара: ${errorMessage}`);
    }
};
export { getProductById, getProducts, addProduct, changeProduct, deleteProduct };
