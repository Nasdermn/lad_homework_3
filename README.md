# Clotheshop

Данный проект - доработка второго домашнего задания, но с использованием более продвинутого стека технологий: TypeScript и TypeORM.

В ЗАПРОСАХ НИЖЕ БУДУТ ВСТРЕЧАТЬСЯ MIDDLEWARE checkAdminAccess И checkUserAccess. ЕСЛИ MIDDLEWARE === checkAdminAccess, значит доступ к выполнению запроса разрешен только пользователям, роль которых - администратор. Если MIDDLEWARE === checkUserAccess, значит доступ разрешен администраторам, а также тем пользователям, id которых совпадает с id, переданным в строке запроса.

## ОПИСАНИЕ РОУТОВ (лучше прочитать, чтобы до конца понять логику базы данных):

- router.post('/signup', userControllers.registerUser);
  По данному роуту создается новый пользователь и корзина для него, пароль хэшируется при записи в БД вместе с остальными данными

- router.post('/signin', userControllers.loginUser);
  По данному роуту пользователь получает токен для дальнейших запросов. signin и signup - единственные запросы, не требующие токена

- router.get('/users/me', userControllers.getCurrentUser);
  Данный роут позволяет получить информацию о себе без проверки прав

- router.get('/users', checkAdminAccess, userControllers.getUsers);
  Достаточно гибкий запрос. По данному роуту можно получать список всех пользователей, где будут представлены все поля за исключением password_hash. Если передать в теле запроса firstname, lastname или email (или какие-то/все из этих полей), поиск будет выполнен по ним

- router.get('/users/:id', checkAdminAccess, userControllers.getUserById);
  Тот же функционал, но для конкретного пользователя таблицы users, по айди, переданному в строке запроса

- router.patch('/users/:id', checkUserAccess, userControllers.updateUser);
  Можно обновить firstname и lastname пользователя, передав их (или 1 из полей) в теле запроса

- router.delete('/users/:id', checkAdminAccess, userControllers.deleteUser);
  Удаление пользователя по айди. благодаря ON DELETE CASCADE, автоматически удаляются все связанные с данным пользователем записи в других таблицах (carts, orders, cart_items, order_details)

- router.get('/products', productControllers.getProducts);
  Получение списка всех товаров

- router.get('/products/:id', productControllers.getProductById);
  Получение конкретного товара по айди в строке запроса

- router.post('/products', checkAdminAccess, productControllers.addProduct);
  Добавление нового товара. В теле нужно передать title, type, price и description, иначе товар не создастся

- router.patch('/products/:id', checkAdminAccess, productControllers.changeProduct);
  Изменение полей price, description или одного из них. Нужно передать их в теле запроса.

- router.delete('/products/:id', checkAdminAccess, productControllers.deleteProduct);
  Удаление продукта

- router.get('/carts', checkAdminAccess, cartControllers.getCarts);
  Получить список всех корзин

- router.get('/carts/:id', checkUserAccess, cartControllers.getCartContentById);
  Получение конкретной корзины по айди, где будут указаны товары в корзине из таблицы cart_items. Если передан id несуществующего пользователя или если его корзина пуста, будут получены соответствующие сообщения

- router.post('/carts/:id', checkAdminAccess, cartControllers.createCart);
  Создание корзины для пользователя, айди которого передан в строке запроса. Если пользователя не существует, или у пользователя уже есть корзина, будут получены соответствующие сообщения. Так как корзина у каждого пользователя одна и создаётся при регистрации, данный запрос вряд ли когда-либо пригодится

- router.patch('/carts/:id', checkUserAccess, cartControllers.updateCart);
  Обновляет таблицу cart_items. Добавляет одну единицу товара с переданным айди в теле запроса в таблицу cart_items. Если такой товар там уже есть, его поле quantity(кол-во) увеличится на 1, а если ещё нет, то в таблицу будет добавлена новая запись с кол-вом 1

- router.delete('/carts/:id', checkUserAccess, cartControllers.clearCart);
  По данному запросу корзина пользователя, айди которого передан в строке запроса, очищается (не удаляется)

- router.get('/orders', checkAdminAccess, orderControllers.getOrders);
  Просмотр всех заказов (только таблица orders, без деталей)

- router.get('/orders/:id', checkUserAccess, orderControllers.getOrderById);
  Просмотр всех товаров из order_details из всех заказов orders по айди пользователя из строки запроса

- router.post('/orders/:id', checkUserAccess, orderControllers.createOrder);
  При выполнении запроса по данному роуту корзина пользователя, айди которого передан в строке запроса, очищается, но не удаляется, и товары из данной корзины добавляются в заказ. Создается заказ в таблице orders, а товары идут в order_details

- router.patch('/orders/:id', checkAdminAccess, orderControllers.changeOrder);
  По данному роуту можно изменить дату заказа, передав в теле запроса новую дату в формате TIMESTAMP (не добавил возможность удаления/добавления товаров, так как это не логично. такая возможность есть лишь в корзине. А заказ или отменяешь полностью, или не отменяешь)

- router.delete('/orders/:id', checkAdminAccess, orderControllers.deleteOrder);
  Удаление заказа по айди заказа (а не пользователя, тк у пользователя может быть много заказов)
