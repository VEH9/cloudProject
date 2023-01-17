# cloudProject
(много чего делал через консоль управление, поэтому инструкция детская( )
# Деплой
1) подготовить профиль Яндекс.Облако
# Backend
2) подготовить авторизованный ключ https://cloud.yandex.ru/docs/iam/operations/authorized-key/create
3) создать файл "creds.json" в папке /backend/avatariki/ . и подставить данные ключа из шага 2
    {
  "id": "key_id",
  "service_account_id": "service_account_id",
  "private_key": "-----PRIVATE KEY----"
    }
4) указать ссылку на YDB в файле /backend/avatariki/Extensions/ISCExtension.cs в 21 строке
5) создать реестр и репозиторий докер образов
6) добавить докер образ бекенда в реестр
7) создать serverless container, он будет запускаться из созданного образа
# Frontend
8) заменить ссылки в запросах (App.tsx и createReview.tsx) на 
    "https://{serverless_container_id}.containers.yandexcloud.net/api..."
9) npm run build
10) создать Object Storage и загрузить в него файлы из папки frontend/build
