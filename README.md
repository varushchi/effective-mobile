# Тестовое задание node для Effective Mobile

## Настройка

### 1. Копирование переменных окружения
Скопируйте `.env.example` в `.env`:

```bash
cp .env.example .env
```

### 2. Запуск сервисов
Запустите Docker Compose:

```bash
docker compose up -d
```

### 3. Инициализация Prisma
Если Prisma ещё не инициализирована:

```bash
npx prisma init
```

### 4. Применение миграций
Примените миграции к базе данных:

```bash
npx prisma migrate deploy
```

### 5. Запуск сервера разработки
Для запуска dev-сервера:

```bash
npm run dev
```

### 6. Запуск в продакшн
Для запуска продакшн-сервера:

```bash
npm start
```
