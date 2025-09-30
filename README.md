# Тестовое задание node для Effective Mobile

## Настройка

#### Клонируем репозиторий
```bash
git clone https://github.com/varushchi/effective-mobile.git
cd effective-mobile
```

#### Устанавливаем зависимости
```bash
npm install
```

#### Копируем переменные окружения
```bash
cp .env.example .env
```

#### Запускаем сервисы через Docker Compose
```bash
docker-compose up -d
```

#### Генерируем Prisma Client
```bash
npx prisma generate
```

#### Применяем миграции к базе данных
```bash
npx prisma migrate dev
```

#### Запускаем сервер разработки
```bash
npm run dev
```

#### Необязательно: запускаем в продакшн
```bash
npm start
```

#### Необязательно: открываем Prisma Studio для просмотра базы данных
```bash
npx prisma studio
```

## Работа с API
Сервер будет запущен на http://localhost:3000

### Эндпоинты

#### Регистрация (POST http://localhost:3000/api/signup)
Пример body: 

```json
{
  "name": "vadimaty",
  "email": "vadimaty@email.com",
  "password": "vadimatypass",
}
```

#### Авторизация (POST http://localhost:3000/api/login)
Пример body:  

```json
{
  "email": "vadimaty@email.com",
  "password": "vadimatypass",
}
```
Пример ответа:
```json
{
  "token": "eyJh..."
}
```

#### Получение пользователя по ID (GET http://localhost:3000/api/users/:id)
Пример headers:  

```json
{
  "Authorization": "Bearer eyJh...",
}

```

#### Получение списка пользователей (GET http://localhost:3000/api/users)
Пример headers:  

```json
{
  "Authorization": "Bearer eyJh...",
}

```

#### Блокировка пользователя (PUT http://localhost:3000/api/users/block/:id)
Пример headers:  

```json
{
  "Authorization": "Bearer eyJh...",
}

```

