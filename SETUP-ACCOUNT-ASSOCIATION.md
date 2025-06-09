# 🧚‍♀️ Настройка Account Association для Winx Analyzer

## Шаг 1: Подготовка

1. Убедитесь, что ваше приложение задеплоено на Vercel
2. URL приложения: `https://v0-powerpuff-girls-brown.vercel.app`
3. У вас должен быть custody кошелек в Warpcast

## Шаг 2: Создание Account Association

1. Перейдите на: https://farcaster.xyz/~/developers/mini-apps/manifest
2. Подключите ваш custody кошелек
3. Заполните форму:
   - **Domain**: `v0-powerpuff-girls-brown.vercel.app`
   - **App Name**: `Winx Analyzer`
   - **Description**: `Discover your magical essence! Find out which Winx fairy you are.`

## Шаг 3: Получение данных

После создания ассоциации вы получите 3 значения:
- `FARCASTER_HEADER`
- `FARCASTER_PAYLOAD` 
- `FARCASTER_SIGNATURE`

## Шаг 4: Добавление в Vercel

1. Откройте ваш проект в Vercel
2. Перейдите в Settings → Environment Variables
3. Добавьте полученные переменные:
   \`\`\`
   FARCASTER_HEADER=полученное_значение
   FARCASTER_PAYLOAD=полученное_значение
   FARCASTER_SIGNATURE=полученное_значение
   \`\`\`

## Шаг 5: Обновление манифеста

После добавления переменных, раскомментируйте секцию accountAssociation в файле:
`app/.well-known/farcaster.json/route.ts`

\`\`\`typescript
accountAssociation: {
  header: process.env.FARCASTER_HEADER,
  payload: process.env.FARCASTER_PAYLOAD,
  signature: process.env.FARCASTER_SIGNATURE,
},
\`\`\`

## Шаг 6: Проверка

1. Перезапустите деплой в Vercel
2. Проверьте манифест: `https://v0-powerpuff-girls-brown.vercel.app/.well-known/farcaster.json`
3. Убедитесь, что секция `accountAssociation` присутствует

## Важно! 

Без account association ваше приложение:
- ✅ Будет работать как Mini App
- ✅ Будет отображаться в Farcaster
- ❌ Не будет верифицировано как официальное
- ❌ Может не отображаться в некоторых списках приложений

Но для тестирования это не критично!
