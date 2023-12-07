import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/user.entity.js';
import { Order } from '../entity/order.entity.js';
import { AppDataSource } from '../data-source.js';
import { OrderDetails } from '../entity/orderDetails.entity.js';
import { Cart } from '../entity/cart.entity.js';
import { CartItem } from '../entity/cartItem.entity.js';

const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  try {
    const user = await User.findOneBy({ user_id: id });

    if (!user) {
      throw new Error('Данного пользователя не существует.');
    }

    const orders = await AppDataSource.query(
      'SELECT orders.order_id, orders.order_date, order_details.product_id, products.title, order_details.quantity FROM orders JOIN order_details USING(order_id) JOIN products USING(product_id) WHERE orders.user_id = $1 ORDER BY orders.order_id, order_details.product_id',
      [id],
    );

    if (orders.length > 0) {
      res.status(200).json(orders);
    } else {
      res.status(404).json('У данного пользователя нет заказов');
    }
  } catch (error) {
    const errorMessage = (error as Error).message || 'Внутренняя ошибка сервера';
    res.status(500).json(`Ошибка при получении заказов: ${errorMessage}`);
  }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.find({ order: { order_id: 'ASC' } });
    res.status(200).json(orders);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Внутренняя ошибка сервера';
    res.status(500).json(`Ошибка при получении заказов: ${errorMessage}`);
  }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const userId = Number(req.params.id);

  try {
    const cart = await Cart.findOneBy({ user_id: userId });

    if (!cart) {
      throw new Error('У пользователя нет корзины.');
    }

    const order = Order.create({
      user_id: userId,
      order_date: new Date(),
    });

    await Order.save(order);

    const orderId = order.order_id;

    const cartItems = await AppDataSource.query(
      'SELECT c.product_id, c.quantity, p.price FROM cart_items c JOIN products p USING(product_id) WHERE c.cart_id = $1',
      [cart.cart_id],
    );

    if (cartItems.rowCount === 0) {
      throw new Error('Корзина пользователя пуста.');
    }

    const orderDetails = cartItems.map(
      (item: { product_id: number; quantity: number; price: string }) => {
        const orderDetail = OrderDetails.create({
          order_id: orderId,
          product_id: item.product_id,
          quantity: item.quantity,
        });

        return OrderDetails.save(orderDetail);
      },
    );

    await Promise.all(orderDetails);

    await CartItem.delete({ cart_id: cart.cart_id });

    res.status(200).send('Заказ успешно создан');
  } catch (error) {
    const errorMessage = (error as Error).message || 'Внутренняя ошибка сервера';
    res.status(500).json(`Ошибка при создании заказа: ${errorMessage}`);
  }
};

const changeOrder = async (req: Request, res: Response, next: NextFunction) => {
  const orderId = Number(req.params.id);
  const { order_date } = req.body;

  try {
    const order = await Order.findOneBy({ order_id: orderId });

    if (!order) {
      res.status(404).send('Заказ с указанным ID не найден');
      return;
    }

    order.order_date = order_date;

    await Order.save(order);

    res.status(200).json(order);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Внутренняя ошибка сервера';
    res.status(500).json(`Ошибка при изменении заказа: ${errorMessage}`);
  }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  const orderId = Number(req.params.id);

  try {
    const order = await Order.findOneBy({ order_id: orderId });

    if (!order) {
      res.status(404).send('Заказ с указанным ID не найден');
      return;
    }

    await OrderDetails.delete({ order_id: orderId });
    await Order.delete(orderId);

    res.status(200).send('Заказ успешно удален');
  } catch (error) {
    const errorMessage = (error as Error).message || 'Внутренняя ошибка сервера';
    res.status(500).json(`Ошибка при удалении заказа: ${errorMessage}`);
  }
};

export { getOrderById, getOrders, createOrder, changeOrder, deleteOrder };
