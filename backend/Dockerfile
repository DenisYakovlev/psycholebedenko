FROM python:3.10.13-alpine3.18

WORKDIR /app

COPY requirements.txt requirements.txt

RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev libffi-dev openssl-dev

RUN pip install -r requirements.txt

COPY . .

RUN pip install --upgrade pip