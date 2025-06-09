# Настройка Winx Analyzer

## 1. Переменные окружения в Vercel

Скопируйте содержимое файла `.env.vercel` и добавьте переменные в настройки вашего проекта в Vercel:

1. Перейдите в ваш проект на vercel.com
2. Откройте Settings → Environment Variables
3. Добавьте каждую переменную из файла `.env.vercel`

## 2. Получение недостающих ключей

### OnchainKit API Key
1. Перейдите на https://portal.cdp.coinbase.com/
2. Создайте аккаунт или войдите
3. Создайте новый проект
4. Скопируйте API ключ и добавьте как `NEXT_PUBLIC_ONCHAINKIT_API_KEY`

### Upstash Redis (для уведомлений)
1. Перейдите на https://upstash.com/
2. Создайте аккаунт
3. Создайте новую Redis базу данных
4. Скопируйте `UPSTASH_REDIS_REST_URL` как `REDIS_URL`
5. Скопируйте `UPSTASH_REDIS_REST_TOKEN` как `REDIS_TOKEN`

### Farcaster Манифест
1. Перейдите на https://farcaster.xyz/~/developers/mini-apps/manifest
2. Подключите ваш custody кошелек
3. Заполните информацию о приложении:
   - Name: Winx Analyzer
   - URL: https://v0-powerpuff-girls-brown.vercel.app
   - Description: Discover your magical essence
4. Скопируйте полученные значения:
   - `FARCASTER_HEADER`
   - `FARCASTER_PAYLOAD` 
   - `FARCASTER_SIGNATURE`

## 3. После настройки

1. Перезапустите деплой в Vercel
2. Протестируйте приложение
3. Поделитесь в Farcaster!

## 4. Проверка работы

- Откройте https://v0-powerpuff-girls-brown.vercel.app/
- Подключите кошелек
- Нажмите "Discover Your Magic"
- Проверьте, что анализ работает
- Попробуйте поделиться результатом
