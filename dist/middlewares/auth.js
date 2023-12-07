import jwt from 'jsonwebtoken';
import { User } from '../entity/user.entity.js';
import { config } from 'dotenv';
// Загрузка переменных окружения из файла .env
config();
const authMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer')) {
            const error = new Error('Пользователь не авторизован');
            error.status = 401;
            throw error;
        }
        const token = authorization.replace('Bearer ', '');
        let payload;
        try {
            payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY || '' : 'dev-secret');
            // Получение роли пользователя из базы данных
            const user = await User.findOneBy({ user_id: payload.userId });
            if (user) {
                payload.role = user.role_id;
            }
        }
        catch (err) {
            const error = new Error('Пользователь не авторизован');
            error.status = 401;
            throw error;
        }
        req.user = payload;
        next();
    }
    catch (error) {
        next(error);
    }
};
export { authMiddleware };
