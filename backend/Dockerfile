FROM python:alpine3.18

WORKDIR /app

COPY requirements.txt requirements.txt

RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

RUN pip install -r requirements.txt

COPY . .

RUN pip install --upgrade pip