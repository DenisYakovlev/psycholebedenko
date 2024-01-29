# Psycholebedenko

Webapp and telegram bot for consulting and psychological help.  
Developed for psychologist Andriy Lyanniy.  

## Technologies used

Django Rest Framework, Telebot, Celery, React, Bootstrap, PostgreSQL, Redis, AWS(EC2, S3, Route 53, CodePipeline, CodeDeploy, CloudWatch), Docker;

## Installation
Before you begin, ensure you have the following installed:  

* **Docker**  
* **Docker Compose**  

### Setting Up the Application  
Clone the Repository  

```
git clone https://github.com/DenisYakovlev/psycholebedenko.git  
```

### Enviroment variables

In root directory of project create .env.db, .env.dev, .env.prod files and put your values  

**.env.db**
* POSTGRES_DB - name of the default database to be created when the PostgreSQL server first starts
* POSTGRES_USER - default database user when the PostgreSQL server starts
* POSTGRES_PASSWORD - password for the PostgreSQL user

**.env.prod** or **.env.dev**
* DEBUG - set debug mode for django app with values of 1 or 0
* BOT_DEBUG - set debug mode for telebot server with values of 1 or 0
* BOT_WEB_APP_URL - url for [telegram webapp](https://core.telegram.org/bots/webapps)
* TELEGRAM_BOT_API_KEY - api key of your telegram bot
* ZOOM_ACCOUNT_ID - Zoom api var for creating meetings. [Docs](https://developers.zoom.us/docs/api/)
* ZOOM_CLIENT_ID - Zoom api client id value
* ZOOM_CLIENT_SECRET - Zoom api client secret
* POSTGRES_DB - name of the default database to be created when the PostgreSQL server first starts
* POSTGRES_USER - default database user when the PostgreSQL server starts
* POSTGRES_PASSWORD - password for the PostgreSQL user
* POSTGRES_HOST - host for PostgreSQL
* SSL_HEADER - use http if you don't have ssl sertificate for app and https in you have.
* ADMIN_ID - telegram admin id. This user will get all notifications about appointments and events.

### Choose the Environment
Depending on your needs, you can set up the application for development or production.  

**For development**
```
docker-compose -f docker-compose.dev up
```
**For production**
```
docker-compose -f docker-compose.prod up
```
