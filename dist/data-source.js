import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Role } from './entity/role.entity.js';
import { User } from './entity/user.entity.js';
import { Product } from './entity/product.entity.js';
import { Cart } from './entity/cart.entity.js';
import { CartItem } from './entity/cartItem.entity.js';
import { Order } from './entity/order.entity.js';
import { OrderDetails } from './entity/orderDetails.entity.js';
import { config } from 'dotenv';
// Загрузка переменных окружения из файла .env
config();
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    logging: false,
    entities: [Role, User, Product, Cart, CartItem, Order, OrderDetails],
    migrations: ['./dist/migrations/*.js'],
    subscribers: [],
});
