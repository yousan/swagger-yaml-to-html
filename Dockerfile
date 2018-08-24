FROM python:3.7.0-alpine3.7

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "python", "./swagger-yaml-to-html.py" ]