import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/user.entity.js';
import { Cart } from '../entity/cart.entity.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
// Загрузка переменных окружения из файла .env
config();

const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.userId;
    const user = await User.findOne({
      where: { user_id: userId },
      select: ['user_id', 'firstname', 'lastname', 'email', 'role_id'],
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json('Пользователя по данному id не существует');
    }
  } catch (error: any) {
    const errorMessage = (error as Error).message || 'Внутренняя ошибка сервера';
    res.status(500).json(`Ошибка при получении пользователя: ${errorMessage}`);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  try {
    const user = await User.findOne({
      where: { user_id: id },
      select: ['user_id', 'firstname', 'lastname', 'email', 'role_id'],
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json('Пользователя по данному id не существует');
    }
  } catch (error: any) {
    const errorMessage = (error as Error).message || 'Внутренняя ошибка сервера';
    res.status(500).json(`Ошибка при получении пользователя: ${errorMessage}`);
  }
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstname, lastname, email } = req.body;
    const users = await User.find({
      where: {
        firstname,
        lastname,
        email,
      },
      order: { user_id: 'ASC' },
      select: ['user_id', 'firstname', 'lastname', 'email', 'role_id'],
    });

    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json('Пользователей с указанными данными не найдено');
    }
  } catch (error: any) {
    const errorMessage = (error as Error).message || 'Внутренняя ошибка сервера';
    res.status(500).json(`Ошибка при поиске пользователей: ${errorMessage}`);
  }
};

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstname, lastname, email, password, role_id } = req.body;

    if (!firstname || !lastname || !email || !password || !role_id) {
      res.status(400).json({ message: 'Не все обязательные поля были предоставлены.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const user = await User.create({
      firstname,
      lastname,
      email,
      password_hash: hashedPassword,
      role_id,
    });

    await User.save(user);

    const existingCart = await Cart.findOneBy({ user_id: user.user_id });

    if (!existingCart) {
      const cart = await Cart.create({
        user_id: user.user_id,
      });

      await Cart.save(cart);
    } else {
      res.status(409).json({ message: 'Корзина для данного пользователя уже существует.' });
      return;
    }

    res.status(200).send('Пользователь и корзина для него успешно созданы');
  } catch (error) {
    res.status(500).json('Ошибка при создании пользователя: данный email уже существует');
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Не все обязательные поля были предоставлены.' });
      return;
    }

    const user = await User.findOneBy({ email: email });

    if (!user) {
      res.status(401).json({ message: 'Неправильный email или пароль.' });
      return;
    }

    const passwordsMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordsMatch) {
      res.status(401).json({ message: 'Неправильный email или пароль.' });
      return;
    }

    const token = jwt.sign({ userId: user.user_id }, String(process.env.SECRET_KEY), {
      expiresIn: '1h',
    });
    res.status(200).json({ message: 'Вход успешно выполнен', token });
  } catch (error: any) {
    const errorMessage = (error as Error).message || 'Внутренняя ошибка сервера';
    res.status(500).json(`Ошибка при входе пользователя: ${errorMessage}`);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const { firstname, lastname } = req.body;
    const user = await User.findOneBy({
      user_id: id,
    });

    if (!user) {
      res.status(404).json('Пользователя по данному id не существует');
      return;
    }

    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;

    await User.save(user);

    const response = {
      message: 'Данные пользователя успешно изменены:',
      firstname: user.firstname,
      lastname: user.lastname,
    };

    res.status(200).json(response);
  } catch (error: any) {
    const errorMessage = (error as Error).message || 'Внутренняя ошибка сервера';
    res.status(500).json(`Ошибка при обновлении пользователя: ${errorMessage}`);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const user = await User.findOneBy({
      user_id: id,
    });

    if (!user) {
      res.status(404).json('Пользователя по данному id не существует');
      return;
    }

    await User.remove(user);

    res.status(200).send('Пользователь успешно удален');
  } catch (error: any) {
    const errorMessage = (error as Error).message || 'Внутренняя ошибка сервера';
    res.status(500).json(`Ошибка при удалении пользователя: ${errorMessage}`);
  }
};

export { getCurrentUser, getUserById, getUsers, registerUser, loginUser, updateUser, deleteUser };
