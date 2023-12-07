import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/user.entity.js';
import { Cart } from '../entity/cart.entity.js';
import { CartItem } from '../entity/cartItem.entity.js';
import { AppDataSource } from '../data-source.js';

const getCartContentById = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  let errorMessage = '';

  try {
    const user = await User.findOneBy({ user_id: id });

    if (!user) {
      throw new Error('Данного пользователя не существует.');
    }

    const cartResult = await AppDataSource.query(
      'SELECT user_id, cart_id, product_id, title, price, quantity FROM carts JOIN cart_items USING(cart_id) JOIN products USING(product_id) WHERE user_id = $1',
      [id],
    );

    if (cartResult.length !== 0) {
      res.status(200).json(cartResult);
    } else {
      errorMessage = 'Корзина данного пользователя пустая';
      res.status(404).json(errorMessage);
    }
  } catch (error) {
    errorMessage = (error as Error).message || 'Внутренняя ошибка сервера';
    res.status(500).json(`Ошибка при получении корзины: ${errorMessage}`);
  }
};

const getCarts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const carts = await Cart.find({ order: { user_id: 'ASC' } });
    res.status(200).json(carts);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Внутренняя ошибка сервера';
    res.status(500).json(`Ошибка при получении списка: ${errorMessage}`);
  }
};

const createCart = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  try {
    const user = await User.findBy({ user_id: id });

    if (!user) {
      res.status(409).json({ message: 'Пользователя по указанному id не существует.' });
      return;
    }

    const existingCart = await Cart.findBy({ user_id: id });

    if (!existingCart) {
      const newCart = await Cart.create({ user_id: id });
      await Cart.save(newCart);
      res.status(200).json(newCart);
    } else {
      res.status(409).json({ message: 'Корзина для данного пользователя уже существует.' });
    }
  } catch (error) {
    const errorMessage = (error as Error).message || 'Внутренняя ошибка сервера';
    res.status(500).json(`Ошибка при создании корзины: ${errorMessage}`);
  }
};

const updateCart = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const { product_id } = req.body;

  try {
    const cartResult = await Cart.findOneBy({ user_id: id });

    if (!product_id || !cartResult) {
      res
        .status(400)
        .json({ message: 'Данный пользователь не имеет корзины или не передан id продукта' });
      return;
    }

    const cartItem = await CartItem.findOneBy({
      cart_id: cartResult.cart_id,
      product_id: product_id,
    });

    let result;

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
      result = {
        message: 'Товар успешно добавлен в корзину:',
        data: cartItem,
      };
    } else {
      const newCartItem = await CartItem.create({
        cart_id: cartResult.cart_id,
        product_id: product_id,
        quantity: 1,
      });
      await CartItem.save(newCartItem);
      result = {
        message: 'Товар успешно добавлен в корзину:',
        data: newCartItem,
      };
    }

    res.status(200).json(result);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Внутренняя ошибка сервера';
    res.status(500).json(`Ошибка при обновлении корзины: ${errorMessage}`);
  }
};

const clearCart = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  try {
    const user = await User.findOneBy({ user_id: id });

    if (!user) {
      res.status(404).json({ message: 'Пользователь не найден' });
      return;
    }

    const cart = await Cart.findOneBy({ user_id: id });
    if (cart) {
      await CartItem.delete({ cart_id: cart.user_id });
      res.status(200).send('Корзина успешно очищена');
    } else {
      res.status(404).json({ message: 'Корзина не найдена' });
    }
  } catch (error) {
    const errorMessage = (error as Error).message || 'Внутренняя ошибка сервера';
    res.status(500).json(`Ошибка при очистке корзины: ${errorMessage}`);
  }
};

export { getCartContentById, getCarts, createCart, updateCart, clearCart };
