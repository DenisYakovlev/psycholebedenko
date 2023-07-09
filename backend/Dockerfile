FROM python:alpine3.18

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

RUN pip install --upgrade pip